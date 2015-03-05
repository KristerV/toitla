Template.postNew.events({
	'change #fileselect': function(e, tmpl) {
		var file = e.target.files[0]
		console.log(file)
		var reader  = new FileReader();

		reader.onloadend = function () {
			// Session.set('photo', reader.result)
			$('label.full-photo')
				.css('background-image', 'url('+reader.result+')')
				.css('color', 'rgba(0,0,0,0)') // hide text
		}

		if (file) {
			reader.readAsDataURL(file);
		}
	},
	'click button.submit': function(e, tmpl) {
		console.log($('label.full-photo'))
	}
})