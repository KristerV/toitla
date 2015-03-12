Template.postDetails.helpers({
	post: function() {
		return Posts.getOne(Session.get('panel-right-post'))
	},
	image: function() {
		return Images.getUrl(this.imageId)
	},
	author: function() {
		if (!this || !this.author)
			return null
		var user = User.getProfile(this.author)
		if (!user)
			return null
		return user.name
	},
	description: function() {
		return Global.safeString(this.description)
	},
	created: function() {
		return moment(this.created).format('HH:mm, D MMMM')
	}
})