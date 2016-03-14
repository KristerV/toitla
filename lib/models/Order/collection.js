Orders = new Mongo.Collection('orders', {transform: function(doc){
    doc.__proto__ = Order;
    return doc;
}});

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("orders", function(orderId, driver){
            var find = {dontFindAny: true}
            var fields = {showNoFields: 1}

            if (driver) {
                find = {_id: orderId}
                fields = {driver: 1}
            } else if (!this.userId) {
                find = {
                    status: {$exists: 0},
                    _id: orderId
                }
                fields = {}

            } else if (Roles.userIsInRole(this.userId, 'manager')) {
                find = {}
                fields = {}

            } else if (Roles.userIsInRole(this.userId, 'chef')) {
                var order = Orders.findOne(orderId)
                if (orderId && order && order.createdBy === this.userId) { // so the chef could also place an order
                    find = {_id: orderId}
                    fields = {}
                } else {
                    find = {
                        $or: [
                            // Either too early to respond, just for info
                            {
                                'status': {$elemMatch: {text: Settings.checklistReserved.openChefConfirmations, checked: false}},
                                'result.result': {$exists: 0},
                                'event.fromDate': {$exists: 1},
                            },
                            // Or chef is in order
                            {
                                'chefs._id': this.userId,
                                $or: [
                                    {'status': {$elemMatch: {text: Settings.checklistReserved.openChefConfirmations, checked: true}}},
                                    {'result.result': 'done'}
                                ]
                            }
                        ]
                    }
                    fields = {
                        'event.fromDate': 1,
                        'event.fromTime': 1,
                        'event.eventType': 1,
                        'status': 1,
                        'result': 1,
                        'allergies': 1,
                        chefs: {$elemMatch: {_id: this.userId}}
                    }
                }
            }

            options = _.isEmpty(fields) ? {} : {fields: fields}
            return Orders.find(find, options)
        });
        Meteor.publish("guest_allergy_order", function(allergyId){
            return Orders.find({"allergies._id": allergyId}, {fields: {allergies: 1, "event.eventName": 1}})
        });
    }
});
