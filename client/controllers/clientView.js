var tallinn = new google.maps.LatLng(59.437222, 24.745278);
var map = null;

Template.clientView.helpers({
	offersForClient: function() {
		var offers = Offer.getOrderOffersForClient(Session.get("orderId"), {sort: {createdAt: 1}})

		if (!offers)
			return false
		return offers
	},
	getOrder: function() {
		var order = OrderCollection.findOne(Session.get("orderId"))

		if (_.isUndefined(order))
			return {}
		else
			return order
	},
	orderData: function() {
		var order = OrderCollection.findOne(Session.get("orderId"))
		if (_.isUndefined(order))
			return {}
		else {
			order.info['timestamp'] = moment(order.info.timestamp).format('DD.MM.YYYY HH:mm')
			return order
		}
	},
	chatActive: function() {
		return Session.get('chatActive')
	}
})

Template.clientView.rendered = function() {
	Meteor.setTimeout(function(){
		var order = OrderCollection.findOne(Session.get('orderId'))
		if (!Meteor.user() && !order.instructionsShown)
			Global.setOverlay('clientInstructionsOverlay')
	}, 1000)
  var mapOptions = {
    //TODO: center should be order location
    center: tallinn,
    zoom: 12
  };
  map = new google.maps.Map(document.getElementById('offer-map'), mapOptions);
}