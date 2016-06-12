Analytics = new Mongo.Collection('analytics');

Meteor.startup(function(){
    if (Meteor.isServer){
        Meteor.publish("analytics", function() {

            if (!Roles.isManager(this.userId))
                throw new Meteor.Error("Only managers can see Analytics")

            var timeAgo = moment().subtract(2, 'days').toDate()
            return Analytics.find({date: {$gt: timeAgo}},{sort: { date: 1}})
        });
    }
});
