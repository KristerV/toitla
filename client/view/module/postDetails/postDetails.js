Template.postDetails.helpers({
	post: function() {
		return Posts.getOne(Session.get('panel-right-post'))
	},
	image: function() {
		return Images.getUrl(this.imageId)
	},
	author: function() {
		return User.getProfile(this.author).name
	},
	created: function() {
		return moment(this.created).format('HH:mm, D MMMM')
	}
})