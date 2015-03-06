Images = {
	getOne: function(id) {
		return ImagesCollection.findOne(id)
	},
	getUrl: function(id) {
		var imgObj = this.getOne(id)
		return imgObj ? imgObj.url() : null
	}
}