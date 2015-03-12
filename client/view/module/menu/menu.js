Template.mainMenu.rendered = function() {
	Client.getMenubarWidth()
}

Template.mainMenu.helpers({
	menubarWidth: function(){
		return Session.get('menubar-width')
	},
	profileImage: function() {
		return Meteor.user().profile.picture
	}
})


Template.sideMenu.helpers({
	menubarWidth: function(){
		return Session.get('menubar-width')
	},
	chefImage: function() {
		var postId = Session.get('panel-right-post')
		var post = Posts.getOne(postId)
		if (!post || !post.author)
			return false
		var user = User.getProfile(post.author)
		if (!user)
			return false
		return user.picture
	}
})

Template.mainMenu.events({
	'touchstart .menu, click .menu': function(e, tmpl) {
		Panel.center()
	}
})

Template.sideMenu.events({
	'touchstart .menu, click .menu': function(e, tmpl) {
		Panel.center()
	}
})