Template.body.helpers({
	isPopup: function() {
		return Session.get('popup')
	},
	sexysecrets: function() {
		return Session.get('sexysecrets')
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

Template.gallery.helpers({
	events: function() {
		return Events
	},
})

Template.popup.helpers({
	chef: function() {
		return Session.equals('popup', 'chef')
	}
})

Template.popup.events({
	'submit form': function(e) {
		e.preventDefault()
		var role = Session.get('popup')
		var email = $('input[name="email"]').val()
		var phone = $('input[name="phone"]').val()
		var details = $('textarea[name="details"]').val()
		Toitla4.insert({role: role, email: email, phone: phone, details: details})
		Session.set('popup', null)
		var body = "Kontakt: " + email  + ", " +  phone + "<br><br>" + Global.safeString(details).toString()
		var subject = role == 'chef' ? "New chef registered" : "New order"
		subject = subject
		Tmail.sendBulk(['conv.1190dj6xuz7oly@fleep.io'], subject, body)
		Meteor.setTimeout(function(){
			alert("Täname tellimuse eest! Vastame hiljemalt kahe päeva jooksul. Vajadusel saad meiega kontakti: appi@toitla.com või 5385 2331.")
		},500)
	}
})

Template.secrets.helpers({
	secretinfo: function() {
		return Toitla4.find()
	}
})