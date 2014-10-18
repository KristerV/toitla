Template.demo.helpers({
	content: function() {
		return DemoCollection.find();
	}
});

Template.demo.events({
	'submit form[name="demo"]': function(event, template) {
		event.preventDefault();
		var title = $('.title').val();
		$('.title').val("");
		var paragraph = $('.paragraph').val();
		$('.paragraph').val("");
		DemoCollection.insert({title: title, paragraph: paragraph});
	}
});