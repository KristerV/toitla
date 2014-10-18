Template.createOrder.events({
	'submit form[name="createOrder"]': function(e, tmpl) {
		e.preventDefault()
		var form = $('form[name="createOrder"]')
		var description = form.find('input[name="description"]').val()
		var date = form.find('input[name="date"]').val()
		var time = form.find('input[name="time"]').val()
		var location = form.find('input[name="location"]').val()

		var data = {
			info: {
				description: description,
				date: date,
				time: time,
				location: location,
			},
			offers: [],
			chefsNotified: [],
		}

		OrderCollection.insert(data)
	}
})