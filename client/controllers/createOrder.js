Template.createOrder.helpers({
	initialDate: function(){
		return moment().add(2, 'days').format('DD.MM.YYYY')
	}
})
Template.createOrder.events({
	'submit form[name="createOrder"]': function(e, tmpl) {
		e.preventDefault()
		Global.setOverlay('orderEmail')
	}
})