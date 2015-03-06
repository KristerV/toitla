Meteor.publish("images", function () {
	return ImagesCollection.find();
})

Meteor.publish("posts", function () {
	return PostsCollection.find();
})