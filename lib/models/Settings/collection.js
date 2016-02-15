Settings = new Mongo.Collection('settings');

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("settings", function(){
            return Settings.find()
        });
    }
});
