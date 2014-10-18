Meteor.publish("demo", function() {
  return DemoCollection.find();
});