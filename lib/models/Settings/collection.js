Settings = new Mongo.Collection('settings');

Meteor.startup(function(){
    if (Meteor.isServer) {

        // Publish
        Meteor.publish("settings", function(){
            return Settings.find()
        });

        // Make checklists settings available
        if (!Settings.findOne('checklists')) {
            var status = _.map(Settings.phases, (obj, key) => {
                if (key !== 'unsubmitted')
                    return {text: obj.label, checked: true, _id: Random.id()}
            })
            console.log("STATUS", status)
            Settings.insert({_id: 'checklists', status: status })
        }

        // Insert available checklists
        var set = Settings.findOne('checklists')
        var update = {}
        Settings.checklists.forEach(function(checklist){
            if (!set[checklist.name])
                update[checklist.name] = []
        })
        if (!_.isEmpty(update))
            Settings.update('checklists', {$set: update})
    }
});
