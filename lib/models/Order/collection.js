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
                fields['details'] = 1
                fields['contact'] = 1
                find = {
                    _id: orderId,
                    submitted: false
                }
            }

            if (Roles.userIsInRole(this.userId, ['manager'])) {
                fields['details'] = 1
                fields['contact'] = 1
                fields['suborders'] = 1
                find = {}
            }
            if (Roles.userIsInRole(this.userId, ['chef'])) {
                var suborders = Suborders.find({currentChefId: this.userId}).fetch()
                var suborderIds = _.map(suborders, function(suborder){
                    return suborder.orderId
                })
                find = {_id: {$in: suborderIds}}
            }
            return Orders.find(find, {fields: fields})
        });
    }
});
