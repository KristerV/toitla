Meteor.methods({
    'Settings--startChecklist': function(collectionName, docId, checklistName) {
        if (Meteor.isClient) return // Client DB not ready yet
        check(collectionName, String);
        check(docId, String);
        check(this.userId, String);
        if (!Roles.userIsInRole(this.userId, 'manager'))
            throw new Meteor.Error(403, 'Only managers allowed')
        var collection = Mongo.Collection.get(collectionName)
        var doc = collection.findOne(docId)
        if (!doc[checklistName]) {
            var settings = Settings.findOne('checklists')
            if (!settings) throw new Meteor.Error(501, 'No checklists document')
            if (!settings[checklistName]) throw new Meteor.Error(501, "Checklist name not implemented");
            collection.update(docId, {$set: {[checklistName]: settings[checklistName]}})
        }
    },
    'Settings--addItemToChecklist': function(collectionName, docId, checklistName, position) {
        check(collectionName, String);
        check(docId, String);
        check(checklistName, String);
        check(position, Number);
        check(this.userId, String);
        if (!Roles.userIsInRole(this.userId, 'manager'))
            throw new Meteor.Error(403, 'Only managers allowed')

        var collection = Mongo.Collection.get(collectionName)
        collection.update(docId, {$push: {[checklistName]: {$each: [{_id: Random.id()}], $position: position}}})
    },
    'Settings--removeItemFromChecklist': function(collectionName, docId, checklistName, itemId) {
        check(collectionName, String);
        check(docId, String);
        check(checklistName, String);
        check(itemId, String);
        check(this.userId, String);
        if (!Roles.userIsInRole(this.userId, 'manager'))
            throw new Meteor.Error(403, 'Only managers allowed')

        var collection = Mongo.Collection.get(collectionName)
        collection.update(docId, {$pull: {[checklistName]: {_id: itemId}}})
    },
    'Settings--updateItemInChecklist': function(collectionName, docId, checklistName, itemId, field, value) {
        check(collectionName, String);
        check(docId, String);
        check(checklistName, String);
        check(itemId, String);
        check(field, String);
        check(value, Match.OneOf(String, Boolean));
        check(this.userId, String);
        if (!Roles.userIsInRole(this.userId, 'manager'))
            throw new Meteor.Error(403, 'Only managers allowed')

        var collection = Mongo.Collection.get(collectionName)
        collection.update({_id: docId, [checklistName+'._id']: itemId}, {$set: {[checklistName+'.$.'+field]: value}})
    },
})
