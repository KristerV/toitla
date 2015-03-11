Client = {

	// some elements are sized accoring to menubar width
	getMenubarWidth: function() {
		var width = $('.menu-bar').width()
		Session.set('menubar-width', width+'px')
	},
	getMinithumbWidth: function() {
		var width = $('img.mini-thumb').width()
		Session.set('mini-thumb-width', width+'px')
	}
}