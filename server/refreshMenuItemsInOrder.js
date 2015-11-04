// TODO: ainult need kokad kel nimi ja vet amet
// TODO: arvestaks min kokkasid ja et hind tuleks sobilik

RefreshMenuItemsInOrder = function(orderId){
    check(orderId, String);
    var order = Orders.findOne(orderId)
    var menuItemsInOrder = MenuItemsInOrder.find({orderId: orderId, rejected: {$ne: true}}).fetch()
    var rejectedMenuitems = MenuItemsInOrder.find({orderId: orderId, rejected: true}).fetch()
    var rejectedTemplateIds = _.pluck(rejectedMenuitems, 'templateId')
    var peopleCount = parseInt(order.details.peopleCount)
    var itemsNeededTotal = peopleCount / 10
    var newItemsRequired = itemsNeededTotal - menuItemsInOrder.length

    if (newItemsRequired < 0) {
        MenuItemsInOrder.remove({orderId: orderId})
        RefreshMenuItemsInOrder(orderId)
    } else {
        for (var i = 0; i < newItemsRequired; i++) {
            var newItem = MenuItemTemplates.find(
                {
                    _id: {$nin: rejectedTemplateIds},
                    rand: {$gte: Math.random()}
                },
                {sort: {rand: 1}, limit: 1}).fetch()[0]
            if (!newItem)
                var newItem = MenuItemTemplates.find(
                    {
                        rand: {$gte: Math.random()}
                    }, {sort: {rand: 1}, limit: 1}).fetch()[0]
            newItem.templateId = newItem._id
            delete newItem._id
            newItem.orderId = orderId
            newItem.inorder = true
            newItem.chefName = Meteor.users.findOne(newItem.chefId).profile.name
            MenuItemsInOrder.insert(newItem)
        }
    }
}
