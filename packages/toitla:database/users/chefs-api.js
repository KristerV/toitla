Chefs = {
	getAll : function() {
		return Meteor.users.find().fetch();
	}
};