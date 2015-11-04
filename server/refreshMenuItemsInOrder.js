// var peoplePerMeal = people < 60 ? 5 : 10
// var snacks = people / peoplePerMeal
// var mealsCount = parseInt( snacks / 30 )
// var meals = 2/3soolast( 1/3 vege + 2/3 soolast ) + 1/3magus
// totalWeight = people * 250
// chefs.find(vet, firmanimi, firmakood, kokanimi).sort(manualRating, acceptanceScore)
// meals.forEach{ menu.push( firstChef.getFood( weightLeft / mealsLeft.length ) ) }
// menu.forEach{ if (maxPrice > currentPrice) { replace most expensive piece  } catch { ERROR } }
// NOTE: et toit ei korduks
// NOTE: kokal max 90 suupistet

MenuItemsInOrderManager = {
    orderId: null,
    allTemplateIdsInOrder: null,
    refresh: function(orderId) {
        this.orderId = orderId
        var order = Orders.findOne(this.orderId)
        var menuItemsInOrder = MenuItemsInOrder.find({orderId: this.orderId, rejected: {$ne: true}}).fetch()
        var allMenuitemsInOrder = MenuItemsInOrder.find({orderId: this.orderId}).fetch()
        this.allTemplateIdsInOrder = _.pluck(allMenuitemsInOrder, 'templateId')
        var peopleCount = parseInt(order.details.peopleCount)
        var itemsNeededTotal = peopleCount / 10
        var newItemsRequired = itemsNeededTotal - menuItemsInOrder.length

        if (newItemsRequired < 0) {
            MenuItemsInOrder.remove({orderId: this.orderId})
            MenuItemsInOrderManager.refresh(this.orderId)
        } else {
            for (var i = 0; i < newItemsRequired; i++) {
                this.insertNewItem()
            }
        }
    },
    insertNewItem: function() {
        var newItem = MenuItemTemplates.find(
            {
                _id: {$nin: this.allTemplateIdsInOrder},
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
        newItem.orderId = this.orderId
        newItem.inorder = true
        newItem.chefName = Meteor.users.findOne(newItem.chefId).profile.name
        MenuItemsInOrder.insert(newItem)
    }

}
