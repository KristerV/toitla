PostsCollection.allow({
	insert: function (userId, doc) {
		return !!userId
	},
	update: function (userId, doc, fields, modifier) {

		// Only logged in users
		if (!userId)
			return false

		// If setting the first like
		if (!doc.likes
		    && modifier 
		    && modifier.$set
		    && modifier.$set.likes
		    && modifier.$set.likes.length == 1)
		    return true

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