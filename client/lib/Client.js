Client = {

	// some elements are sized accoring to menubar width
	getMenubarWidth: function() {
		var width = $('.menuItem').width()
		Session.set('menubar-width', width+'px')
	},
	toggleTitlePage: function() {
		var scroll = $('.layout-center .content-bar').scrollTop()
		Session.set('panel-center-scroll', scroll)
	}
}