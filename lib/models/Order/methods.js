Meteor.methods({
    createOrder: function() {
        return Orders.insert({
            createdAt: new Date,
            submitted: false,
            status: {
                phase: Object.keys(Settings.phases)[0],
            },
            details: {
                calculatedPrice: 0,
                mealCount: 2,
            },
            contact: {},
            suborders: []
        })
    },
    deleteOrder: function(orderId) {
        if (Roles.userIsInRole(this.userId, 'manager'))
            Orders.remove(orderId)
    },
});
