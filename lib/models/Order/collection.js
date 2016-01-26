Orders = new Mongo.Collection('orders', {transform: function(doc){
    doc.__proto__ = Order;
    return doc;
}});

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("orders", function(orderId){
            var find = {dontFindAny: true}
            var fields = {showNoFields: 1}

            if (!this.userId) {
                find = {
                    submitted: {$exists: 1, $ne: true},
                    _id: orderId
                }
                fields = {}

            } else if (Roles.userIsInRole(this.userId, 'manager')) {
                find = {}
                fields = {
                    status: 1,
                    extraInfo: 1,
                    price: 1,
                    allergies: 1,
                    event: 1,
                    contact: 1,
                    errors: 1,
                }

            } else if (Roles.userIsInRole(this.userId, 'chef')) {
                if (orderId) { // so the chef could also place an order
                    find = {_id: orderId}
                    fields = {}
                } else {
                    find = {
                        $or: [
                            {
                                'status.phase': {$in: ['new', 'getDetails', 'makeMenu', 'makeOffer', 'clientConfirm', 'chefConfirm']},
                                'event.fromDate': {$exists: 1}
                            },
                            {chefsInOrder: this.userId}
                        ]
                    }
                    fields = {
                        'event.fromDate': 1,
                        'event.fromTime': 1,
                        'status.phase': 1,
                        'allergies': 1,
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
