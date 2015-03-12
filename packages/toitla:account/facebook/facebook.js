Facebook = {
	share: function(postId) {
		var post = Posts.getOne(postId)
		var imageUrl = Images.getUrlByPost(postId, true)
		var description = Global.shortenString(post.description, 999)
		var link = Global.getUrl() + 'post/' + postId
		FB.ui({
			method: 'feed',
			link: link,
			caption: T('facebook_caption'),
			picture: imageUrl,
			description: description
		}, function(response){
			console.log("Sharing complete")
			console.log(response)
		})
	},
	login: function() {
		Meteor.loginWithFacebook({}, function(err){
			if (err) {
				throw new Meteor.Error(err);
			} else {
				Panel.left('userProfileEdit')
			}
		})
	}
}