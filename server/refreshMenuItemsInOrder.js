// NOTE: in case of switch
// NOTE: et toit ei korduks
// NOTE: kokal max 90 suupistet

MenuItemsInOrderManager = {
    orderId: null,
    order: null,
    allTemplateIdsInOrder: null,
    settings: Settings.menuConstructor,
    mealPlan: null,
    meals: [],
    chefIdList: null,
    totalWeight: null,
    snacksPerMeal: null,
    refresh: function(orderId) {
        console.log("=============== refresh ===============");
        console.log("orderId",orderId);
        this.orderId = orderId
        this.calcMenuDetails()
        this.findChefs()
        this.constructMenu()
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
        this.snacksPerMeal = snacksCount / mealCount
        console.log("snacksPerMeal",this.snacksPerMeal);
        var mealPlan = []
        var dishVeg = mealCount * 0.15
        console.log("dishVeg", dishVeg);
        var dishDessert = mealCount * 0.33 + dishVeg
        console.log("dishDessert", dishDessert);
        for (var i = 0; i < mealCount; i++) {
            if (i < dishVeg) {
                mealPlan.push({tag: 'meatfree', foodType: 'main'})
            }
            else if (i < dishDessert) {
                mealPlan.push({foodType: 'dessert'})
                }
            else {
                mealPlan.push({foodType: 'main'})
            }
        }
        console.log("mealPlan", mealPlan);
        this.mealPlan = mealPlan
        this.totalWeight = people * this.settings.gramsPerPerson
        console.log("totalWeight",this.totalWeight);
    },
    findChefs() {
        // chefs.find(vet, firmanimi, firmakood, kokanimi).sort(manualRating, acceptanceScore)
        console.log("============== findChefs ==============");
        var chefs = Meteor.users.find({eligible: true}, {sort: {manualRating: -1, acceptanceScore: -1}}).fetch()
        this.chefIdList = _.pluck(chefs, '_id')
        for (var i = 0; i < chefs.length; i++) {
            console.log(chefs[i]._id, chefs[i].manualRating, chefs[i].profile.name);
        }
    },
    constructMenu() {
        // meals.forEach{ menu.push( firstChef.getFood( weightLeft / mealsLeft.length, specs ) ) }
        // totalWeight = people * 250
        console.log("============= constructMenu =============");
        var weightLeft = this.totalWeight
        var mealsLeft = this.mealPlan.slice(0)
        var lastWeight
        while (!_.isEmpty(mealsLeft)) {
            var inMenu = _.pluck(this.meals, '_id')
            var meal = mealsLeft.shift()
            console.log("MEAL", meal);
            var minWeight = weightLeft / mealsLeft.length / this.snacksPerMeal
            var item = null
            var chefIndex = 0
            var find = {
                _id: {$nin: inMenu},
                weight: {$gt: minWeight},
                published: true,
                foodType: meal.foodType,
            }
            if (meal.tags) find.tags = meal.tag
            console.log("FIND", find.weight, find.foodType);
            while (!item && chefIndex < this.chefIdList.length) {
                var rand = Math.random()
                find.chefId = this.chefIdList[chefIndex],
                console.log("CHEF", find.chefId);
                item = MenuItemTemplates.findOne(find)
                chefIndex++
            }
            if (item) {
                this.meals.push(item)
                console.log("ITEM", item._id, item.weight+"g", _.pluck(item.tags, 'name'));
                weightLeft = weightLeft - ( item.weight * this.snacksPerMeal )
                if (0 > weightLeft) weightLeft = 0
            } else
                console.log("NO MENUITEM FOUND");
            console.log("");
        }
        var grossWeight = 0
        for (var i = 0; i < this.meals.length; i++) {
            var item = this.meals[i]
            grossWeight = grossWeight + item.weight
            console.log("ITEM", item.chefId, item._id, item.foodType, item.weight+"g");
        }
        console.log("mealsTotal", this.meals.length, grossWeight+"g");

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
