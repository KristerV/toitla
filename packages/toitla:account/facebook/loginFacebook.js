Template.loginFacebook.events({
	'click #login-facebook': function(e, tmpl) {
		Meteor.loginWithFacebook({}, function(err){
			if (err) {
				throw new Meteor.Error(err);
			} else {
				Panel.left('userProfileEdit')
			}
		})
	}
})