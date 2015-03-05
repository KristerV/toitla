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

Meteor.Spinner.options = {
	// This is just so position:absolute would work
    top: '1', // Top position relative to parent in px
    left: '1' // Left position relative to parent in px
};