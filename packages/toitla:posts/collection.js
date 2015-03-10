PostsCollection = new Meteor.Collection('posts')

if (Meteor.isClient)
{
	Meteor.subscribe('posts')
}
else if (Meteor.isServer)
{
	Meteor.publish("posts", function () {
		return PostsCollection.find({
			$or: [
				{imageId: {$exists: 1}},
				{description: {$exists: 1}}
			]
		});
	})
}
