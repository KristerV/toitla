Orders = new Mongo.Collection('orders', {transform: function(doc){
    doc.__proto__ = Order;
    return doc;
}});

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("orders", function(orderId){

            var fields = {submitted: 1, 'status': 1}
            var find = {dontFindAny: true}
            if (!this.userId) {
                fields['extraInfo'] = 1
                fields['price'] = 1
                fields['allergies'] = 1
                fields['event'] = 1
                fields['contact'] = 1
                fields['flow'] = 1
                fields['errors'] = 1
                find = {
                    _id: orderId,
                    // submitted: false // thanks form needs submitted order
                }
            }

            if (Roles.userIsInRole(this.userId, ['manager'])) {
                fields['extraInfo'] = 1
                fields['price'] = 1
                fields['allergies'] = 1
                fields['event'] = 1
                fields['contact'] = 1
                fields['suborders'] = 1
                fields['errors'] = 1
                fields['flow'] = 1
                find = {}
            }
            return Orders.find(find, {fields: fields})
        });
        Meteor.publish("guest_allergy_order", function(allergyId){
            return Orders.find({"allergies._id": allergyId}, {fields: {allergies: 1, "event.eventName": 1}})
        });
    }
});
