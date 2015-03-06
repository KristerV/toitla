Images = {
	getOne: function(id) {
		return ImagesCollection.findOne(id)
	},
	getUrl: function(id) {
		var imgObj = this.getOne(id)
		if (!imgObj)
			return null

		url = imgObj.url()

		// Remove token, it for some reason creates confusion
		// Token format: image/link.png?token=xxxx
		var cleanUrl = url.split('?')[0]
		return cleanUrl
	}
}