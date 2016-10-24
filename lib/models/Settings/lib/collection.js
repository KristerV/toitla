Settings = new Mongo.Collection('settings', {transform: function(doc){
    doc.__proto__ = Setting; // so single doc has helpers attached with form.js helpers extended
    return doc;
}});

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("settings", function() {
            return Settings.find();
        });

        insertDriverSettings();

        clearPreviousChecklists();

        insertPhasesChecklist();
        insertOtherChecklists();
    }

    function insertDriverSettings() {
        if (!Settings.findOne('driver')) {
            Settings.insert({_id: 'driver'});
        }
    }

    function clearPreviousChecklists() {
        if (Settings.findOne('checklists')) {
            Settings.remove('checklists');
        }
    }

    function insertPhasesChecklist() {
        var status = [];
        for (var key in Settings.phases) {
            if (!_.contains(['unsubmitted', 'lost', 'done', 'silent'], key)) {
                status.push({text: Settings.phases[key].label, color: Settings.phases[key].color, checked: true, _id: Random.id()});
            }
        }
        Settings.insert({_id: 'checklists', status: status});
    }

    function insertOtherChecklists() {
        var set = Settings.findOne('checklists');
        var update = {};

        Settings.checklists.forEach(function (checklist) {
            if (!set[checklist.name]) {
                update[checklist.name] = [];
            }
        });

        if (!_.isEmpty(update)) {
            Settings.update('checklists', {$set: update});
        }
    }
});
