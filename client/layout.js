window.Scroller = {
	parentSelector: 'body',
	panelSelector: '.panel',
	scrollHistory: [],
	scrollTimer: null,
	scrollPanels: [],
	scrollingInAction: false,
	findPanels: function() {
		Scroller.scrollPanels = []
		$(Scroller.panelSelector).each(function(i){
			Scroller.scrollPanels.push($(this).offset().left)
		})
	},
	scrollUp: function() {},
	findNextPanel: function(currentScroll, direction) {
		var destination = 0
		currentScroll = currentScroll ? currentScroll : $(Scroller.parentSelector).scrollLeft()

		if (direction === 0) {
			var shortest = 0
			var distance = Scroller.scrollPanels[Scroller.scrollPanels.length-1]
			for (var i = 0; i < Scroller.scrollPanels.length; i++) {
				var val = Scroller.scrollPanels[i]
				var abs = Math.abs(currentScroll - val)
				if (distance > abs) {
					shortest = i
					distance = abs
				}
			}
			destination = Scroller.scrollPanels[shortest]
		} else {
			for (var i = 0; i < Scroller.scrollPanels.length; i++) {
				var val = Scroller.scrollPanels[i]
				if (currentScroll < val) {
					if (direction < 0 && i > 0) {
						destination = Scroller.scrollPanels[i-1]
						break
					} else {
						destination = Scroller.scrollPanels[i]
						break
					}
				}
			}
		}

		return destination
	},
	doScroll: function() {

		if (Scroller.scrollingInAction !== false)
			return false

		var length = Scroller.scrollHistory.length
		var currentScroll = Scroller.scrollHistory.pop()
		if (length > 4) {
			var history = Scroller.scrollHistory.slice(-11, -2) // drop useless

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
			destination = Scroller.findNextPanel(currentScroll, direction)
			Scroller.animateScroll(destination)
		} else {
			// Find closest
			destination = Scroller.findNextPanel(currentScroll, 0)
			Scroller.animateScroll(destination)
		}
		Scroller.scrollHistory = []
	},
	animateScroll: function(destination){
		Scroller.scrollingInAction = true
		$('body').animate({scrollLeft: destination}, function(){
			Meteor.setTimeout(function(){
				Scroller.scrollingInAction = false
			},300)
		})
	},
	saveScroll: function(){
		if (Scroller.scrollingInAction === false) {
			Scroller.scrollHistory.push($(Scroller.parentSelector).scrollLeft())
			if (Scroller.scrollHistory.length > 30)
				Scroller.scrollHistory.shift()
		}
	},
}

Template.layout.rendered = function() {
	Scroller.findPanels()
	Scroller.animateScroll(Scroller.scrollPanels[1])
}
$(window)
	.scroll(function(){
		Scroller.saveScroll()
	})
	.on("scrollstop", function() {
		Scroller.doScroll()
	})
	.resize(function(){
		console.log("resize")
		Scroller.findPanels()
		Scroller.doScroll()
	})