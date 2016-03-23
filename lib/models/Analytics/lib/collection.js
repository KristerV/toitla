Analytics = new Mongo.Collection('analytics');

Meteor.startup(function(){
    if (Meteor.isServer){
        Meteor.publish("analytics", function() {

            if (!Roles.isManager(this.userId))
                throw new Meteor.Error("Only managers can see Analytics")

            return Analytics.find()
        });
    }
});
