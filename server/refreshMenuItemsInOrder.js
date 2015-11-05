// NOTE: in case of switch
// FIXME: kokal max 90 suupistet või 3 snäkki
// FIXME: 2 kokka, 5:1 toitude arv

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
    maxPrice: null,
    currentPrice: null,
    priceExcess: null,
    tooExpensiveIds: [],
    rejectedTemplates: [],
    switchItem: function(itemId) {
        // FIXME: what values in Insert are needed from refreshOrder?
        var oldItem = MenuItemsInOrder.findOne(itemId)
        this.orderId = oldItem.orderId
        MenuItemsInOrder.update(itemId, {$set: {rejected: true}})
        var rejectedTemplates = MenuItemsInOrder.find({orderId: oldItem.orderId, rejected: true}).fetch()
        this.rejectedTemplates = _.pluck(rejectedTemplates, 'templateId')
        this.addMeal(oldItem.originalSpecifications)
        this.insertFoods()
    },
    refreshOrder: function(orderId) {
        console.log("=============== refreshOrder ===============");
        console.log("orderId",orderId);
        this.orderId = orderId
        this.getRequirements()
        this.findChefs()
        this.constructMenu()
        this.cropTotalPrice()
        this.insertFoods()
    },
    getRequirements() {
        // var meals = 2/3soolast( 1/3 vege + 2/3 soolast ) + 1/3magus
        console.log("=========== getRequirements ===========");

        this.order = Orders.findOne(this.orderId)
        if (!this.order) throw new Meteor.Error("MenuItemsInOrderManager.getRequirements(): no such order exists.")

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
        this.mealPlan = mealPlan
        console.log("mealPlan", mealPlan);

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
        while (!_.isEmpty(mealsLeft)) {
            var mealSpecs = mealsLeft.shift()
            mealSpecs.minWeight = weightLeft / mealsLeft.length / this.snacksPerMeal
            var item = this.addMeal(mealSpecs)
            weightLeft = weightLeft - ( item.weight * this.snacksPerMeal )
            if (0 > weightLeft) weightLeft = 0
            console.log("");
        }
        this.printMeals()
    },
    addMeal(mealSpecs) {
        console.log("================ addMeal ================");
        console.log("MEAL", mealSpecs);
        var unwanted = _.union(_.pluck(this.meals, '_id'), this.tooExpensiveIds, this.rejectedTemplates)
        var item = null
        var chefIndex = 0
        var find = {
            _id: {$nin: unwanted},
            weight: {$gt: mealSpecs.minWeight},
            published: true,
            foodType: mealSpecs.foodType,
        }
        if (mealSpecs.tags) find.tags = mealSpecs.tag
        console.log("FIND", find.weight['$gt']+"g", find.foodType);
        while (!item && chefIndex < this.chefIdList.length) {
            var rand = Math.random()
            find.chefId = this.chefIdList[chefIndex],
            console.log("CHEF", find.chefId);
            item = MenuItemTemplates.findOne(find)
            chefIndex++
        }
        if (item) {
            item.originalSpecifications = mealSpecs
            this.meals.push(item)
            console.log("ITEM", item._id, item.weight+"g", _.pluck(item.tags, 'name'));
            return item
        } else
            throw new Meteor.Error("NO MENUITEM FOUND")
    },
    cropTotalPrice() {
        // menu.forEach{ if (maxPrice > currentPrice) { replace most expensive piece  } catch { ERROR } }
        console.log("=======================================");
        console.log("============ cropTotalPrice ===========");
        this.calculateMaxPrice()
        var count = 0
        while (this.maxPrice < this.currentPrice && count < 100) {
            this.replaceHighestPrice()
            this.calculateCurrentPrice()
            console.log("COUNT", count);
            count++
        }
        this.printMeals()
        console.log("^^^^^^^^^^^^ cropTotalPrice ^^^^^^^^^^^");
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    },
    calculateCurrentPrice(){
        console.log("======== calculateCurrentPrice ========");
        var currentPrice = 0
        for (var i = 0; i < this.meals.length; i++) {
            var mealPrice = Settings.priceClasses[this.meals[i].priceClass] * this.snacksPerMeal
            currentPrice = currentPrice + mealPrice
        }
        this.currentPrice = currentPrice
        console.log("CURRENT", this.currentPrice);
        this.priceExcess = this.currentPrice - this.maxPrice
        console.log("EXCESS", this.priceExcess);
    },
    calculateMaxPrice() {
        console.log("========== calculateMaxPrice ==========");
        var orderTotal = this.order.details.currentPrice || this.order.details.calculatedPrice
        this.maxPrice = orderTotal * this.settings.foodMaxPercentFromTotal
        console.log("MAX", this.maxPrice);
        this.calculateCurrentPrice()
    },
    replaceHighestPrice() {
        console.log("========== replaceHighestPrice ===========");
        console.log("------------- removeOneItem --------------");
        var highestPrice = 0
        var responsible = []
        for (var i = 0; i < this.meals.length; i++) {
            var meal = this.meals[i]
            var price = Settings.priceClasses[meal.priceClass]
            if (price > highestPrice) {
                highestPrice = price
                responsible = [meal]
            } else if (price == highestPrice) {
                responsible.push(meal)
            }
        }
        console.log("HIGHEST PRICE", highestPrice);
        var pickOne = responsible[parseInt(Math.random() * responsible.length)]
        console.log("REMOVE", pickOne._id);
        this.tooExpensiveIds.push(pickOne._id)
        var index = _.indexOf(this.meals, pickOne)
        this.meals.splice(index, 1)
        console.log("--------------- addNewItem ---------------");
        this.addMeal(pickOne.originalSpecifications)
    },
    insertFoods() {
        console.log("============ insertFoods ==============");
        var results = []
        _.each(this.meals, function(newItem, i){
            newItem.templateId = newItem._id
            delete newItem._id
            newItem.orderId = this.orderId
            newItem.inorder = true
            newItem.chefName = Meteor.users.findOne(newItem.chefId).profile.name
            var result = MenuItemsInOrder.insert(newItem)
            results.push(result)
        }.bind(this))
        console.log("RESULTS", results);
        console.log("ITEMS IN ORDER", MenuItemsInOrder.find({orderId: this.orderId}).fetch().length);
    },
    printMeals() {
        console.log("");
        console.log("           CHEFID           ITEMID");
        var grossWeight = 0
        var grossPrice = 0
        for (var i = 0; i < this.meals.length; i++) {
            var item = this.meals[i]
            grossWeight = grossWeight + item.weight
            var mealPrice = Settings.priceClasses[this.meals[i].priceClass] * this.snacksPerMeal
            grossPrice = grossPrice + mealPrice
            console.log("ITEM", item.chefId, item._id, G.strlen(item.foodType, 7), G.strlen(item.weight+"g", 5), _.pluck(item.tags, 'name'));
        }
        console.log("");
        console.log("TOTAL MEALS", this.meals.length, grossWeight+"g", grossPrice+"€");
        console.log("");
    },
}

MenuItemsInOrderManager.refreshOrder('AebtsdtGzwjpaBfnm')

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
