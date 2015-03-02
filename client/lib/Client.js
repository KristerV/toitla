Client = {

	// some elements are sized accoring to menubar width
	getMenubarWidth: function() {
		Session.set('menubar-width', $('.menubar-col').width()+'px')
	},
}