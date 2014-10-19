Meteor.publish("order", function() {
  return OrderCollection.find();
});
Meteor.publish("offer", function() {
  return OfferCollection.find();
});
Meteor.publish("users", function() {
  return Meteor.users.find();
});