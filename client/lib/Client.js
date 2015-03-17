Client = {

	// some elements are sized accoring to menubar width
	getMenubarWidth: function() {
		var width = $('.menuItem').width()
		Session.set('menubar-width', width+'px')
	},
	toggleTitlePage: function() {
		var scroll = $('.layout-center .content-bar').scrollTop()
		Session.set('panel-center-scroll', scroll)
	},
	titlepageVisible: function() {
		var scroll = Session.get('panel-center-scroll')
		var hideHeight = $(window).height() * 0.2
		return scroll < hideHeight
	}
}