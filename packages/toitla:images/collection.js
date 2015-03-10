var create500 = function(fileObj, readStream, writeStream) {
  // Transform the image into a 500x500px thumbnail
  gm(readStream, fileObj.name()).resize('500', '500').autoOrient().stream().pipe(writeStream);
}
var autoOrient = function(fileObj, readStream, writeStream) {
  // Transform the image into a 500x500px thumbnail
  gm(readStream, fileObj.name()).autoOrient().stream().pipe(writeStream);
}

ImagesCollection = new FS.Collection("images", {
	stores: [
		new FS.Store.GridFS("500", {transformWrite: create500 }),
		new FS.Store.GridFS("original", {transformWrite: autoOrient }),
	],
	filter: {
		allow: {
			contentTypes: ['image/*'] //allow only images in this FS.Collection
		}
	}
});

FS.HTTP.setBaseUrl('uploads');
FS.debug = false;


if (Meteor.isClient) {
	Meteor.subscribe('images')
} else if (Meteor.isServer) {
	Meteor.publish("images", function () {
		return ImagesCollection.find();
	})
}