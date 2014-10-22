Template.orderEmail.events({
	'submit form[name="orderEmailForm"]': function(e, tmpl) {
		e.preventDefault()
		var values = Global.getFormValues('orderEmailForm')
		if (!values.email || !Functions.validateEmail(values.email)) {
			Global.addError($('#email'), 'Please provide an email address')
			return
		}
		OrderCollection.update(this._id, {$set: {email: values.email}})
	}
})

Template.orderEmail.rendered = function(){
	$('.overlay-content').addClass('no-box')
	$('#email').focus();
}