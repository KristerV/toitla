Meteor.publish("posts", function () {
	return PostsCollection.find({
		$or: [
			{imageId: {$exists: 1}},
			{description: {$exists: 1}}
		]
	});
})