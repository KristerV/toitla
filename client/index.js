Template.main.helpers({
	isPopup: function() {
		return Session.get('popup')
	},
})

Template.main.events({
	'click form': function(e) {
		e.stopPropagation()
	},
	'click .btn.chef': function(e) {
		Session.set("popup", "chef")
	},
	'click .btn.order': function(e) {
		Session.set("popup", "order")
	},
	'click .popupBack': function(e) {
		Session.set('popup', null)
	}
})

Template.popup.helpers({
	chef: function() {
		return Session.equals('popup', 'chef')
	}
})

Template.popup.events({
	'submit form': function(e) {
		e.preventDefault()
		var email = $('input[name="email"]').val()
		var phone = $('input[name="phone"]').val()
		var details = $('textarea[name="details"]').val()
		Toitla4.insert({email: email, phone: phone, details: details})
	}
})

Meteor.startup(function(){
	Meteor.subscribe('toitla4')
})