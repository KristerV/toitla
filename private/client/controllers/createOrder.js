Template.createOrder.helpers({
	initialDate: function(){
		return moment().add(2, 'days').format('DD.MM.YYYY')
	}
})
Template.createOrder.events({
	'submit form[name="createOrder"]': function(e, tmpl) {
		e.preventDefault()
		var allGood = true
		$('input').each(function(index){
			if (($(this).val() == '' || _.isUndefined($(this).val())) && allGood) {
				Global.addError('form[name="createOrder"]', "Please fill out all fields")
				allGood = false
			}
		})

		if (allGood)
			Global.setOverlay('orderEmail')
	}
})