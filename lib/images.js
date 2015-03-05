Images = new FS.Collection("images", {
	stores: [new FS.Store.GridFS("original")]
});

FS.HTTP.setBaseUrl('uploads');
FS.debug = false;