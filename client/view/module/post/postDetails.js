Template.postDetails.helpers({
	post: function() {
		return Posts.getOne(Session.get('panel-right-post'))
	},
	image: function() {
		return Images.getUrl(this.imageId)
	}
})