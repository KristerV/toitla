PostsCollection = new Meteor.Collection('posts')

var create500 = function(fileObj, readStream, writeStream) {
  // Transform the image into a 500x500px thumbnail
  gm(readStream, fileObj.name()).resize('500', '500').stream().pipe(writeStream);
}

ImagesCollection = new FS.Collection("images", {
	stores: [
		new FS.Store.GridFS("original"),
		new FS.Store.GridFS("500", {transformWrite: create500 })
	],
	filter: {
		allow: {
			contentTypes: ['image/*'] //allow only images in this FS.Collection
		}
	}
});

FS.HTTP.setBaseUrl('uploads');
FS.debug = false;