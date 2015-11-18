
Meteor.methods({
    'menuitemInOrder--refreshOrder': function(orderId) {
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer) {
                var manager = new MenuItemsInOrderManager(orderId)
                return manager.refreshOrder()
            }
        } else {
            throw new Meteor.Error("Not authorized to update MenuItems.")
        }
    },
    'menuitemInOrder--switchItem': function(menuitemId) {
        check(menuitemId, String)
        var menuitem = MenuItemsInOrder.findOne(menuitemId)
        var order = Orders.findOne(menuitem.orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer) {
                var manager = new MenuItemsInOrderManager(order._id)
                return manager.switchItem(menuitemId)
            }
        } else {
            throw new Meteor.Error("Not authorized to update MenuItems.")
        }
    },
    'menuitemInOrder--calculatePrice': function(orderId) {
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer) {
                var manager = new MenuItemsInOrderManager(orderId)
                return manager.calculatePrice()
            }
        } else {
            throw new Meteor.Error("Not authorized to update MenuItems.")
        }
    },
});
