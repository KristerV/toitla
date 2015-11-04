
Meteor.methods({
    'menuitemInOrder--refreshOrder': function(orderId) {
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer)
                RefreshMenuItemsInOrder(orderId)
        } else {
            throw new Meteor.Error("Not authorized to update MenuItems.")
        }
    },
    'menuitemInOrder--switchItem': function(menuitemId) {
        check(menuitemId, String)
        var menuitem = MenuItemsInOrder.findOne(menuitemId)
        var order = Orders.findOne(menuitem.orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            MenuItemsInOrder.update(menuitemId, {$set: {rejected: true}})
            if(Meteor.isServer)
                RefreshMenuItemsInOrder(order._id)
        } else {
            throw new Meteor.Error("Not authorized to update MenuItems.")
        }
    },
});
