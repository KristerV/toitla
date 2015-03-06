Images = {
	getOne: function(id) {
		return ImagesCollection.findOne(id)
	},
	getUrl: function(id) {
		var imgObj = this.getOne(id)
		url = imgObj ? imgObj.url() : null

		// Remove token, it for some reason creates confusion
		var cleanUrl = url.split('?')[0]
		return cleanUrl
	}
}