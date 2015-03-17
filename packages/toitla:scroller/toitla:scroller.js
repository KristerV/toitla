/*

The Scroller package depends on scrollStop.js - it is not found on atmosphere.

*/

Scroller = {

	// Settings
	minScroll: 3,

	// Variables
	parentSelector: 'body',
	panelSelector: '.panel',
	scrollHistory: [],
	scrollTimer: null,
	scrollPanels: [],
	scrollingInAction: false,

	// Methods
	findPanels: function() {
		this.scrollPanels = []
		var _this = this
		$(this.panelSelector).each(function(i){
			_this.scrollPanels.push($(this).offset().left)
		})
	},
	findNextPanel: function(currentScroll, direction) {
		var destination = 0
		currentScroll = currentScroll ? currentScroll : $(this.parentSelector).scrollLeft()

		if (direction === 0) {
			var shortest = 0
			var distance = this.scrollPanels[this.scrollPanels.length-1]
			for (var i = 0; i < this.scrollPanels.length; i++) {
				var val = this.scrollPanels[i]
				var abs = Math.abs(currentScroll - val)
				if (distance > abs) {
					shortest = i
					distance = abs
				}
			}
			destination = this.scrollPanels[shortest]
		} else {
			for (var i = 0; i < this.scrollPanels.length; i++) {
				var val = this.scrollPanels[i]
				if (currentScroll < val) {
					if (direction < 0 && i > 0) {
						destination = this.scrollPanels[i-1]
						break
					} else {
						destination = this.scrollPanels[i]
						break
					}
				}
			}
		}

		return destination
	},
	doScroll: function() {

		if (this.scrollingInAction === true)
			return false

		var length = this.scrollHistory.length
		var currentScroll = this.scrollHistory.pop()
		if (true || length > this.minScroll) {

			var history = this.scrollHistory
			if (this.scrollHistory.length > 6)
				history = history.slice(-11, -2) // drop useless

			// find speed
			var direction = 0
			var average = 0
			var count = 0
			_.each(history, function(item){
				average += item
				count += 1
			})
			average = average / count
			direction = currentScroll - average

			// find next panel
			destination = this.findNextPanel(currentScroll, direction)
			this.animateScroll(destination)
		} else {
			// Find closest
			destination = this.findNextPanel(currentScroll, 0)
			this.animateScroll(destination)
		}
		this.scrollHistory = []
	},
	scrollTop: function(selector) {

		// Couldn't get fucking velocity to do it
		$(selector).animate({'scrollTop': 0}, 400)
	},
	animateScroll: function(destination){
		this.scrollingInAction = true
		$('body').velocity("scroll", {
			axis: "x",
			offset: destination,
			complete: function (elem) {
				Meteor.setTimeout(function(){
					this.scrollingInAction = false
				}.bind(this),300)
			}.bind(this),
		})
	},
	scrollSuddenly: function(destination) {
		window.scrollTo(destination, 0)
	},
	saveScroll: function(){
		if (this.scrollingInAction === false) {
			this.scrollHistory.push($(this.parentSelector).scrollLeft())
			if (this.scrollHistory.length > 30)
				this.scrollHistory.shift()
		}
	},
	goToPanel: function(nr, options) {
		// Don't use this, otherwise clicking too fast causes transparent feed but no scroll
		/*if (this.scrollingInAction === true && options && options.override !== true) {
			return false
		}*/

		var coordinates

		// PC layout: this.scrollPanels[2] can't be reached. In this
		// case just scroll as far as possible. It keeps the scroll smooth.
		if (nr == 2 && $('.panel.layout-right').width() != $(window).width())
			coordinates = $(document).width() - $(window).width()

		// Mobile layout: panel is window size, this.scrollPanels[2] is correct
		else
			coordinates = this.scrollPanels[nr]

		if (options && options.sudden)
			this.scrollSuddenly(coordinates)
		else
			this.animateScroll(coordinates)
	}
}