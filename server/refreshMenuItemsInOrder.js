// NOTE: in case of switch
// NOTE: et toit ei korduks
// NOTE: kokal max 90 suupistet

MenuItemsInOrderManager = {
    orderId: null,
    order: null,
    allTemplateIdsInOrder: null,
    settings: Settings.menuConstructor,
    refresh: function(orderId) {
        console.log("=============== refresh ===============");
        console.log("orderId",orderId);
        this.orderId = orderId
        this.calcMenuDetails()
        this.findChefs()
        this.getNextFood()
        this.cropTotalPrice()
        this.insertFoods()
    },
    calcMenuDetails() {
        // var meals = 2/3soolast( 1/3 vege + 2/3 soolast ) + 1/3magus
        console.log("=========== calcMenuDetails ===========");
        this.order = Orders.findOne(this.orderId)
        if (!this.order) throw new Meteor.Error("MenuItemsInOrderManager.calcMenuDetails(): no such order exists.")
        var people = Number(this.order.details.peopleCount)
        console.log("people",people);
        var mealCount = Math.round( people / 5 )
        console.log("mealCount",mealCount);
        var snacksCount = mealCount * people
        console.log("snacksCount",snacksCount);
        var snacksPerMeal = snacksCount / mealCount
        console.log("snacksPerMeal",snacksPerMeal);
        var mealPlan = []
        var dishVeg = mealCount * 0.15
        console.log("dishVeg", dishVeg);
        var dishDessert = mealCount * 0.33 + dishVeg
        console.log("dishDessert", dishDessert);
        for (var i = 0; i < mealCount; i++) {
            if (i < dishVeg) {
                mealPlan.push({tags: ['meatfree'], type: 'main'})
            }
            else if (i < dishDessert) {
                mealPlan.push({type: 'dessert'})
                }
            else {
                mealPlan.push({type: 'main'})
            }
        }
        console.log("mealPlan", mealPlan);
        this.mealPlan = mealPlan
    },
    findChefs() {
        // chefs.find(vet, firmanimi, firmakood, kokanimi).sort(manualRating, acceptanceScore)
        console.log("============== findChefs ==============");
    },
    getNextFood() {
        // meals.forEach{ menu.push( firstChef.getFood( weightLeft / mealsLeft.length, specs ) ) }
        // totalWeight = people * 250
        console.log("============= getNextFood =============");
    },
    cropTotalPrice() {
        // menu.forEach{ if (maxPrice > currentPrice) { replace most expensive piece  } catch { ERROR } }
        console.log("============ cropTotalPrice ===========");
        var maxFoodPrice = this.order.details.currentPrice * 0.5
        while (maxFoodPrice < this.currentFoodPrice) {
            this.replaceHighPrice()
        }
    },
    replaceHighPrice() {
        console.log("========== replaceHighPrice ===========");
    },
    insertFoods() {
        console.log("============ insertFoods ==============");
    },
}

MenuItemsInOrderManager.refresh('AebtsdtGzwjpaBfnm')

/*
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
*/
