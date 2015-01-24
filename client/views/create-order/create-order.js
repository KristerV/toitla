Template.index.events({
	'submit form' : function(e, template) {
		e.preventDefault();
		var fields = ClientHelper.getFormValues(e.target);
	}
})