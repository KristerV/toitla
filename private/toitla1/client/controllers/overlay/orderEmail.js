Template.orderEmail.helpers({
	chefsInArea: function() {
		return !!Chef.getChefsInAreaCount($('input[name="location"]').val())
	},
	chefCountText: function() {
		if (!this)
			return false

		var location = $('input[name="location"]').val()
		var chefCount = Chef.getChefsInAreaCount(this._id)
		if (chefCount == 1) {
			return T("There is {chefCount} chef in {city} waiting to take your order.",
						{
							chefCount: {
								str: chefCount,
								cls: "color-green"
							},
							city: {
								str: location,
								cls: "color-green"
							},
						}
					)
		} else {
			return T("There are {chefCount} chefs in {city} waiting to take your order.",
						{
							chefCount: {
								str: chefCount,
								cls: "color-green"
							},
							city: {
								str: location,
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

		// Validate email
		var emailForm = Global.getFormValues('orderEmailForm')
		if (!emailForm.email || !Functions.validateEmail(emailForm.email)) {
			Global.addError($('#email'), 'Please provide an email address')
			return
		}

		// Gather order data
		var orderForm = $('form[name="createOrder"]')
		var date = orderForm.find('input[name="date"]').val()
		var time = orderForm.find('input[name="time"]').val()
		var order = {
			date: date,
			time: time,
			description: orderForm.find('input[name="description"]').val(),
			location: orderForm.find('input[name="location"]').val(),
			email: emailForm.email,
			createdAt: TimeSync.serverTime(),
			updatedAt: TimeSync.serverTime(),
		}

		// Save order and notify chefs
		Meteor.call('newOrder', order, function(err, orderId) {
			if (err)
				Global.addError('.messages', err)
			else
				document.location.href = '/order/' + orderId			
		})
	}
})

Template.orderEmail.rendered = function(){
	$('.overlay-content').addClass('no-box')
	$('#email').focus();
}