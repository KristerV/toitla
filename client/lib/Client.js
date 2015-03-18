Client = {

	// some elements are sized accoring to menubar width
	getMenubarWidth: function() {
		var width = $('.menuItem').width()
		Session.set('menubar-width', width+'px')
	},
	getPostThumbWidth: function() {
		var width = $('.post').width()
		Session.set('minithumb-width', width*0.2+'px') // 0.2 tied to post.less .mini-thumb {width: 20%}
	},
	toggleTitlePage: function() {
		var scroll = $('.layout-center .content-bar').scrollTop()
		Session.set('panel-center-scroll', scroll)
	},
	titlepageVisible: function() {
		var scroll = Session.get('panel-center-scroll')
		var hideHeight = $(window).height() * 0.5
		return scroll < hideHeight
	}
}