Meteor.publish("images", function () {
	return ImagesCollection.find();
})