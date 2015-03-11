Template.userProfileEdit.events({
	'click .logout': function(e) {
		Meteor.logout(function(err){
			if (err)
				throw new Meteor.Error(err)
			else
				Panel.left('login')
		})
	}
})