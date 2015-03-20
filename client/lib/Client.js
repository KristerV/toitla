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
	},
	setLoginForm: function(form) {
		if (Session.get('login-form') == form)
			return false
		else {
			Session.set('login-form', form)
			return true
		}
	},
	error: function(afterElement, message) {

		// Render error template
		var id = this.hash()
		Blaze.renderWithData(
				Template.error, 
				{message: message, _id: id}, 
				$(afterElement).get(0))

		// Fade the error out
		Meteor.setTimeout(function(){
			$('#'+id).velocity("fadeOut", {duration: 1500})
		}, 5000)
	},
	hash: function() {
		return Math.random().toString(36).substr(2, 8);
	},
	getAvatar: function(userId) {
		var user = Meteor.users.findOne(userId)
		console.log(user)
		if (!user || !user.profile || !user.profile.picture)
			return '/icons/white-user.svg'

		return user.profile.picture
	}
}