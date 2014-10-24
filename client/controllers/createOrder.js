Template.createOrder.helpers({
	tomorrow: function(){
		return moment().add('1 day').format('DD.MM.YYYY')
	}
})
Template.createOrder.events({
	'submit form[name="createOrder"]': function(e, tmpl) {
		e.preventDefault()
		Global.setOverlay('orderEmail')
	}
})