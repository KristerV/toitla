Meteor.methods({
    'Settings--startChecklist': function(collectionName, docId, checklistName) {
        if (Meteor.isClient) return // Client DB not ready yet
        check(collectionName, String);
        check(docId, String);
        var collection = Mongo.Collection.get(collectionName)
        var doc = collection.findOne(docId)
        if (!doc)
            throw new Meteor.Error(401, "Document does not exist: "+docId+". Collection: "+collectionName);
        if (!doc[checklistName]) {
            var settings = Settings.findOne('checklists')
            if (!settings) throw new Meteor.Error(501, 'No checklists document')
            if (!settings[checklistName]) throw new Meteor.Error(501, "Checklist name not implemented");
            var checklist = []
            if (settings[checklistName]) {
                settings[checklistName].forEach(c => {
                    c.checked = false
                    checklist.push(c)
                })
            }
            collection.update(docId, {$set: {[checklistName]: checklist}})
        }
    },
    'Settings--resetChecklist': function(collectionName, docId, checklistName) {
        if (collectionName === 'settings')
            throw new Meteor.Error(401, "Don't delete the settings please");
        var collection = Mongo.Collection.get(collectionName)
        collection.update(docId, {$unset: {[checklistName]: 1}})
        Meteor.call('Settings--startChecklist', collectionName, docId, checklistName)
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
        var item = collection.findOne(docId)
        if (item.locked) throw new Meteor.Error(401, "Item is locked");
        var set = {[checklistName+'.$.'+field]: value}
        if (collectionName === 'settings' && docId === 'checklists') {
            if (_.contains(Settings.checklists[0].reserved, item.text))
                set[checklistName+'.$.locked'] = true

        }
        collection.update({_id: docId, [checklistName+'._id']: itemId}, {$set: set})
    },
    'Settings--updateCounts': () => {
        var excludeOrders = ['4a8o2Pn4GzdqMash9']
        if (Roles.isManager(this.userId)) {
            var orders = Orders.find({'result.result': 'done'}).fetch()
            var mostPeople = 160 // 160 happened before toitla.com management
            var ordersCount = 40 // 40 happened before toitla.com management
            orders.forEach(order => {
                if (_.contains(excludeOrders, order._id)) return
                if (order.event && order.event.peopleCount > mostPeople)
                    mostPeople = order.event.peopleCount
                ordersCount++
            })
            Settings.update('landing', {$set: {ordersCount: ordersCount, mostPeople: mostPeople}})
        }
    }
})
