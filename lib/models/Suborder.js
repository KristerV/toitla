
Suborders = new Mongo.Collection('suborders', {transform: function(doc){
    doc.__proto__ = Suborder;
    return doc;
}});

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("suborders", function(orderId){

            if (!this.userId)
                return false
            else if (Roles.userIsInRole(this.userId, ['manager'])) {
                return Suborders.find()
            }
            else if (Roles.userIsInRole(this.userId, ['chef'])) {
                return Suborders.find({currentChefId: this.userId})
            }
        });
    }
});


SuborderPermissionSchema = {
    roles: {
        edit: function(suborder){
            if (suborder.currentChefId)
                return false
            else
                return ['manager']
        },
        view: ['manager', 'chef'],
    },
    currentChefId: {
        roles: {
            edit: ['manager'],
            view: ['manager', 'chef'],
        },
    },
    chefs: {
        roles: {
            edit: ['manager'],
            view: ['manager'],
        },
        ":_id": {
            roles: {
                edit: ['chef'],
                view: ['manager', 'chef'],
            },
        }
    }
}

Suborder = {
    schema: SuborderPermissionSchema,
    collectionName: 'suborders',

    create: function(orderId, callback) {
        Meteor.call('createSuborder', orderId, callback)
    },

    remove: function(id, callback) {
        Meteor.call('removeSuborder', id, callback)
    },

    addUserToSuborder: function(chefId, callback) {
        Meteor.call('addUserToSuborder', this._id, chefId, callback)
        Push.send({
			from: 'Toitla',
			title: 'Toitla',
			text: 'Uus tellimus: '+this.price+"€, "+this.peopleCount+"in. "+this.dueDate,
			query: {
				userId: chefId
			}
		});
    }
}

Meteor.methods({
    createSuborder: function(orderId) {
        if (!Roles.userIsInRole(this.userId, 'manager')) return;
        var order = Orders.findOne(orderId)
        var data = {
            _id: Random.id(),
            createdAt: new Date(),
            // price: order.details.customPrice, // better not allow accidental submission
            dueDate: moment(order.details.fromDate).add(order.details.fromTime).format("D. MMM HH:mm"),
            peopleCount: order.details.peopleCount,
            allergies: order.details.allergies,
            orderId: orderId,
            phase: order.status.phase,
        }
        var subId = Suborders.insert(data)
        Orders.update(orderId, {$push: {suborders: subId}})
    },
    removeSuborder: function(suborderId) {
        if (!Roles.userIsInRole(this.userId, 'manager')) return;
        if (!suborderId)
            throw new Meteor.Error("Need to specify a suborder id.")
        var suborder = Suborders.findOne(suborderId)
        var order = Orders.findOne(suborder.orderId)
        Suborders.remove(suborderId)
        Orders.update(order._id, {$pull: {suborders: suborderId}})
    },
    addUserToSuborder: function(subId, chefId) {
        check(subId, String);
        check(chefId, String);
        if (!Roles.userIsInRole(this.userId, 'manager')) return;

        var chef = Meteor.users.findOne(chefId)
        var data = {
            currentChefId: chefId
        }
        data['chefs.'+chefId] = {
            name: chef.profile.name,
            sentAt: new Date()
        }
        Suborders.update(subId, {$set: data})

        var suborder = Suborders.findOne(subId)
        Orders.update(suborder.orderId, {$set: {'status.phase': 'chefsOffering'}})
        Meteor.call('sendEmail', 'teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Teavitus tellimusest', emailHTML)
    }
});
