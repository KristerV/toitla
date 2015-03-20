Template.mainMenu.rendered = function() {
	Client.getMenubarWidth()
}

Template.mainMenu.helpers({
	menubarWidth: function(){
		return Session.get('menubar-width')
	},
	profileImage: function() {
		return Client.getAvatar(Meteor.userId())
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
		return Client.getAvatar(post.author)
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