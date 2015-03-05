Template.postNew.helpers({
	image: function() {
		var img = Images.findOne(Session.get('uploaded-image'))
		if (!img)
			return false
		return img
	},
})

Template.postNew.events({
	'change #fileselect': function(e, tmpl) {
		FS.Utility.eachFile(e, function(file) {
			Images.insert(file, function (err, fileObj) {
				console.log(err)
				Session.set('uploaded-image', fileObj._id)
			});
		});
	},
	'click button.submit': function(e, tmpl) {
	}
})

