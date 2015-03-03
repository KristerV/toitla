Client = {

	// some elements are sized accoring to menubar width
	getMenubarWidth: function() {
		var width = $('.menubar-col').width()
		Session.set('menubar-width', width+'px')
	},
}