Meteor.publish("images", function () {
	return Images.find();
})

Meteor.publish("posts", function () {
	return PostsCollection.find();
})