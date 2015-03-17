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
			if (err) {
				throw new Meteor.Error(err);
			} else {
				Panel.center()
			}
		})
	}
}