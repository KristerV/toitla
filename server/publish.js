Meteor.publish("order", function() {
  return OrderCollection.find();
});
Meteor.publish("chef", function() {
  return ChefCollection.find();
});