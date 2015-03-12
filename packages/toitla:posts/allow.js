PostsCollection.allow({
	insert: function (userId, doc) {
		return !!userId
	},
	update: function (userId, doc, fields, modifier) {

		// Only logged in users
		if (!userId)
			return false

		// If pulling her own 'like'
		if (modifier
				&& modifier.$pull 
				&& modifier.$pull.likes 
				&& modifier.$pull.likes == userId) {
			console.log("like 1")
			return true
		}

		// If pushing her own 'like'
		if (modifier
				&& modifier.$push 
				&& modifier.$push.likes 
				&& modifier.$push.likes == userId) {
			console.log("like 2")
			return true
		}

		// If owner
		if (userId == doc.author) {
			console.log("like 3")
			return true
		}

		return false
	},
	remove: function (userId, doc) {
		return false
	},
});