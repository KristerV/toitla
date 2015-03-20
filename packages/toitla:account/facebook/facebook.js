Facebook = {
	share: function(postId) {
		var post = Posts.getOne(postId)
		var imageUrl = Images.getUrlByPost(postId, true)
		var description = Global.shortenString(post.description, 999)
		var link = "http://toitla.com:4000/" + 'post/' + postId
		FB.ui({
			method: 'feed',
			link: link,
			caption: T('facebook_caption').toString(),
			picture: imageUrl,
			description: description
		}, function(response){
		})
	},
	login: function() {
		Meteor.loginWithFacebook({}, function(err){
			console.log(err)
			if (err && err.error != 100) {
				throw new Meteor.Error(err);
			} else if (err && err.error == 100) {
				// FB account probably got merged into existing account, try logging in again
				this.login()
			} else {
				Panel.center()
			}
		}.bind(this))
	},
	getAvatarLink: function(fbId) {
		return "http://graph.facebook.com/" + fbId + "/picture/?type=large"
	},
	getAvatarLinkFromUser: function(user) {
		var id = user.services.facebook.id
		return this.getAvatarLink(id)
	},
	mergePassIntoFace: function(existingUser, newUser) {
		// Import FB useful info
		if (!existingUser.profile)
			existingUser.profile = {}
		if (!existingUser.profile.picture)
			existingUser.profile.picture = Facebook.getAvatarLinkFromUser(newUser)
		if (!existingUser.profile.name)
			existingUser.profile.name = newUser.services.facebook.name

		// merge service info
		existingUser.services['facebook'] = newUser.services.facebook

		// Remove user
		Meteor.users.remove(existingUser._id)

		// And add it again (so the user gets logged in automatically)
		return existingUser
	}
}