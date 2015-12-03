
Meteor.methods({
    'menuitemInOrder--refreshOrder': function(orderId) {
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer) {
                var manager = new MenuGenerator(orderId)
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
                var manager = new MenuGenerator(order._id)
                return manager.switchItem(menuitemId)
            }
        } else {
            throw new Meteor.Error("Not authorized to update MenuItems.")
        }
    },
    'menuitemInOrder--removeItem': function(menuitemId) {
        check(menuitemId, String)
        if (Roles.userIsInRole(this.userId, 'manager')) {
            var orderId = MenuItemsInOrder.findOne(menuitemId).orderId
            MenuItemsInOrder.remove(menuitemId)
            Meteor.call('menuitemInOrder--calculateTotals', orderId)
        }
    },
    'menuitemInOrder--addArray': function(orderId, newItems) {
        check(orderId, String)
        check(newItems, [String])
        if (Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer){
                var templates = MenuItemTemplates.find({_id: {$in: newItems}})
                var manager = new MenuGenerator(orderId)
                templates.forEach(template => {
                        manager.insertTemplate(template)
                })
                Meteor.call('menuitemInOrder--calculateTotals', orderId)
            }
        }
    },
    'menuitemInOrder--calculateTotals': function(orderId) {
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer) {
                var manager = new MenuGenerator(orderId)
                return manager.calculateTotals()
            }
        } else {
            throw new Meteor.Error("Not authorized to update MenuItems.")
        }
    },
    'menuitemInOrder--updateField': function(menuitemId, fieldName, fieldValue) {
        check(menuitemId, String)
        check(fieldName, String)
        check(fieldValue, Match.OneOf(String, null))
        check(this.userId, String)
        var menuitem = MenuItemsInOrder.findOne(menuitemId)
        if (menuitem && (menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) ) {
            var data = {}
            data[fieldName] = Number(fieldValue) || fieldValue // convert to number if possible
            MenuItemsInOrder.update(menuitemId, {$set: data})
        }
        menuitem.validateDetails(fieldName, fieldName)
        Meteor.call('menuitemInOrder--calculateTotals', menuitem.orderId)
    }
});
