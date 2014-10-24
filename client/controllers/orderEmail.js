Template.orderEmail.helpers({
	chefCountText: function() {
		if (!this || !this.chefsNotified)
			return false

		if (this.chefsNotified.length == 1) {
			return T("There is {chefCount} chef in {city} waiting to take your order.",
						{
							chefCount: {
								str: this.chefsNotified.length,
								cls: "color-green"
							},
							city: {
								str: this.info.location,
								cls: "color-green"
							},
						}
					)
		} else {
			return T("There are {chefCount} chefs in {city} waiting to take your order.",
						{
							chefCount: {
								str: this.chefsNotified.length,
								cls: "color-green"
							},
							city: {
								str: this.info.location,
								cls: "color-green"
							},
						}
					)
		}

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
		OrderCollection.update(this._id, {$set: {email: values.email}})
	}
})

Template.orderEmail.rendered = function(){
	$('.overlay-content').addClass('no-box')
	$('#email').focus();
}