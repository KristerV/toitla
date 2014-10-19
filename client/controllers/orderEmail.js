Template.orderEmail.helpers({
	order: function() {
		var order = OrderCollection.findOne(Session.get("createdOrderId"))

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
		var id = Session.get('createdOrderId');
		OrderCollection.update(id, {$set: {email: values.email}})
		Session.set('createdOrderId', null)

		Global.closeOverlay()
		document.location.href = '/order/' + id
	}
})