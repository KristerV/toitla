Scrapes = new Mongo.Collection('scrapes');

Scrapes.helpers({
})

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("scrapes", function(){
            return Scrapes.find()
        });
    }
});
