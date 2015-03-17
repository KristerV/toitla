Template.feed.helpers({
	posts: function() {
		return Posts.getFeed()
	},
	notCurrentUser: function() {
		return !Meteor.user()
	}
})