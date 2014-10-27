Template.confirmOffer.events({
	'submit form[name="confirmOffer"]': function(e, tmpl) {
		e.stopPropagation()
		e.preventDefault()
		var clientTelephone = $(e.currentTarget).find('input[name="telephone"]').val()
		var offer = Session.get('overlayOptions')

		var really = confirm(T("Are you sure you want to confirm this offer? You will be expected to pay for and collect this food from the chef, unless specified otherwise."))
		if (really) {

			// Confirm offer
			OfferCollection.update(offer._id, {
				$set: {
					editingOffer: false, 
				    offerWonBy: offer.chefId, 
				    clientTelephone: clientTelephone
				}
			})

			// Confirm order
			OrderCollection.update(offer.orderId, {$set: {offerWonBy: offer.chefId}})

			// Close overlay
			Global.closeOverlay()

			// Send emails
			Meteor.call('sendConfirmationEmails', offer._id)
		}


	}
})