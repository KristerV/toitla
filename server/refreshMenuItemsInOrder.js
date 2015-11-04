RefreshMenuItemsInOrder = function(orderId){
    check(orderId, String);
    var order = Orders.findOne(orderId)
    var menuItemsInOrder = MenuItemsInOrder.find({orderId: orderId, rejected: {$ne: true}}).fetch()
    var peopleCount = parseInt(order.details.peopleCount)
    var itemsNeededTotal = peopleCount / 10
    var newItemsRequired = itemsNeededTotal - menuItemsInOrder.length

    if (newItemsRequired < 0) {
        MenuItemsInOrder.remove({orderId: orderId})
        RefreshMenuItemsInOrder(orderId)
    } else {
        for (var i = 0; i < newItemsRequired; i++) {
            var newItem = MenuItemTemplates.find({rand: {$gte: Math.random()}}, {sort: {rand: 1}, limit: 1}).fetch()[0]
            delete newItem._id
            newItem.orderId = orderId
            newItem.inorder = true
            MenuItemsInOrder.insert(newItem)
        }
    }
}
