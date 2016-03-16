Settings = new Mongo.Collection('settings', {transform: function(doc){
    doc.__proto__ = Setting; // so single doc has helpers attached with form.js helpers extended
    return doc;
}});

Meteor.startup(function(){
    if (Meteor.isServer) {

        // Publish
        Meteor.publish("settings", function(){
            return Settings.find()
        })

        // Make checklists settings available
        if (!Settings.findOne('checklists')) {
            var status = []
            for (var key in Settings.phases) {
                if (!_.contains(['unsubmitted', 'lost', 'done', 'silent'], key))
                    status.push({text: Settings.phases[key].label, checked: true, _id: Random.id()})
            }
            console.info("COLLECTION",status);
            Settings.insert({_id: 'checklists', status: status })
        }

        if (!Settings.findOne('driver'))
            Settings.insert({_id: 'driver'})

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