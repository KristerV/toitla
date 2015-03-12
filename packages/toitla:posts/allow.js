PostsCollection.allow({
	insert: function (userId, doc) {
		return !!userId
	},
	update: function (userId, doc, fields, modifier) {
		console.log('------------------')
		console.log(userId)
		console.log('------------------')
		console.log(doc)
		console.log('------------------')
		console.log(fields)
		console.log('------------------')
		console.log(modifier)
		console.log('==================')

		// Only logged in users
		if (!userId)
			return false

		// If pulling her own 'like'
		if (modifier
				&& modifier.$pull 
				&& modifier.$pull.likes 
				&& modifier.$pull.likes == userId) {
			return true
		}

		// If pushing her own 'like'
		if (modifier
				&& modifier.$push 
				&& modifier.$push.likes 
				&& modifier.$push.likes == userId) {
			return true
		}

		// If owner
		if (userId == doc.author) {
			return true
		}

		return false
	},
	remove: function (userId, doc) {
		return false
	},
});