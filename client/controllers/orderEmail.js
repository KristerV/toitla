Template.orderEmail.helpers({
	order: function() {
		var order = OrderCollection.findOne(Session.get("orderId"))

		if (_.isUndefined(order))
			return {}
		else
			return order
	}
})

Template.orderEmail.events({
	'submit form[name="orderEmailForm"]': function(e, tmpl) {
		e.preventDefault()
		var values = Global.getFormValues('orderEmailForm')
		if (!values.email || !Functions.validateEmail(values.email)) {
			Global.addError($('#email'), 'Please provide an email address')
			return
		}
		var id = Session.get('orderId');
		OrderCollection.update(id, {$set: {email: values.email}})
		Global.closeOverlay()
	}
})

Template.orderEmail.rendered = function(){
	$('.overlay-content').addClass('no-box')
}