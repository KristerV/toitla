Template.clientInstructionsOverlay.events({
	'click input[name="clientInstructionsOverlay"]': function(e, tmpl) {
		OrderCollection.update(Session.get('orderId'), {$set: {instructionsShown: true}})
		Global.closeOverlay()
	}
})