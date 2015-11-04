
Meteor.methods({
    'menuitemInOrder--refreshOrder': function(orderId) {
        console.log('menuitemInOrder--refreshOrder');
        console.log(orderId);
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer)
                RefreshMenuItemsInOrder(orderId)
        } else {
            throw new Meteor.Error("Not authorized to update MenuItems.")
        }
    },
});
