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
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 5, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '30', // Top position relative to parent in px
    left: '30' // Left position relative to parent in px
};