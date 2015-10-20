Scrapes = new Mongo.Collection('scrapes');

Scrapes.helpers({
})

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("scrapes", function(){
            // if (!this.userId)
                // return false
            // else if (Roles.userIsInRole(this.userId, ['manager'])) {
                return Scrapes.find()
            // }
        });
    }
});
