
var scheduledOrderRefreshes = []
MenuItemsInOrderManager = class {

    constructor(orderId, verbose) {
        check(orderId, String)
        this.verbose = verbose
        this.orderId = orderId
        this.order = Orders.findOne(orderId)
        this.settings = Settings.menuConstructor
        this.reset()
    }
    reset() {
        this.meals = []
        this.mealPlan = []
        this.chefIdList = []
        this.rejectedTemplates = []
        this.priceClasses = []
        this.priceToClient = null
        this.snacksPerMeal = null
        this.totalWeight = null
        this.snacksCount = null
        this.peopleCount = null
        this.varietyCount = null
    }
    switchItem(itemId) {
        this.log("============ switchItem ============");
        check(itemId, String)
        if (scheduledOrderRefreshes.indexOf(this.orderId) == -1) {
            this.log("Schedule successful");
            scheduledOrderRefreshes.push(this.orderId)
            Meteor.setTimeout(function(){
                 scheduledOrderRefreshes.splice(scheduledOrderRefreshes.indexOf(this.orderId), 1)
                 this.runSwitchItem(itemId)
            }.bind(this), 1000);
        } else {
            this.log("Schedule FAILED");
        }
    }
    runSwitchItem(itemId) {
        this.log("========================================= switchItem =========================================");
        check(itemId, String)
        this.reset()
        var oldItem = MenuItemsInOrder.findOne(itemId)
        MenuItemsInOrder.update(itemId, {$set: {rejected: true}})
        var rejectedTemplates = MenuItemsInOrder.find({orderId: oldItem.orderId, rejected: true}).fetch()
        this.rejectedTemplates = _.pluck(rejectedTemplates, 'templateId')
        this.rejectedTemplates.push(itemId)
        this.findChefs()
        oldItem.originalSpecifications.priceClass = oldItem.priceClass
        this.addMeal(oldItem.originalSpecifications)
        this.insertFoods()
    }
    refreshOrder() {
        this.log("============ refreshOrder ============");
        check(this.orderId, String)
        if (scheduledOrderRefreshes.indexOf(this.orderId) == -1) {
            this.log("Schedule successful");
            scheduledOrderRefreshes.push(this.orderId)
            Meteor.setTimeout(function(){
                 scheduledOrderRefreshes.splice(scheduledOrderRefreshes.indexOf(this.orderId), 1)
                 this.runRefreshOrder()
            }.bind(this), 2000);
        } else {
            this.log("Schedule FAILED");
        }
    }
    runRefreshOrder() {
        this.log("========================================= runRefreshOrder =========================================");
        this.reset()
        this.getRequirements()
        this.findChefs()
        this.constructMenu()
        MenuItemsInOrder.remove({orderId: this.orderId})
        this.insertFoods()
        this.runCalculatePrice()
    }
    calculatePrice() {
        this.getRequirements()
        this.meals = MenuItemsInOrder.find({orderId: this.orderId, rejected: {$ne: true}}).fetch()
        this.runCalculatePrice()
    }
    getRequirements() {
        // var meals = 2/3soolast( 1/3 vege + 2/3 soolast ) + 1/3magus
        this.log("=========== getRequirements ===========");

        this.order = Orders.findOne(this.orderId)
        if (!this.order) throw new Meteor.Error("MenuItemsInOrderManager.getRequirements(): no such order exists.")

        this.peopleCount = Number(this.order.event.peopleCount)
        this.log("peopleCount",this.peopleCount);

        var coffeeBreakMultiplier = Math.max(1, this.order.price.coffeeBreaks * 0.8)
        this.varietyCount = Math.round( this.peopleCount / 5 * coffeeBreakMultiplier)
        this.log("varietyCount",this.varietyCount);

        this.snacksCount = this.varietyCount * this.peopleCount
        this.log("snacksCount",this.snacksCount);

        this.snacksPerMeal = this.snacksCount / this.varietyCount
        this.log("snacksPerMeal",this.snacksPerMeal);

        var mealPlan = []
        var dishVeg = this.varietyCount * 0.15
        this.log("dishVeg", dishVeg);

        var dishDessert = this.varietyCount * 0.33 + dishVeg
        this.log("dishDessert", dishDessert);

        for (var i = 0; i < this.varietyCount; i++) {
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
        this.log("mealPlan", mealPlan);

        var selectedPriceClass = this.order.price.class
        this.priceClasses = []
        var availablePriceClasses = Settings.getKeys("priceClasses")
        for (var i = 0; i < mealPlan.length; i++) {
            if (selectedPriceClass == 0) {
                this.priceClasses.push(availablePriceClasses[0])
            } else if (selectedPriceClass == 2) {
                this.priceClasses.push(availablePriceClasses[2])
            } else {
                this.priceClasses.push(null)
            }
        }
        this.log("priceClasses",this.priceClasses)

        this.totalWeight = this.peopleCount * this.settings.gramsPerPerson
        this.log("totalWeight",this.totalWeight);
    }
    findChefs() {
        // chefs.find(vet, firmanimi, firmakood, kokanimi).sort(manualRating, acceptanceScore)
        this.log("============== findChefs ==============");
        var chefs = Meteor.users.find({eligible: true}, {sort: {manualRating: -1, acceptanceScore: -1}, limit: 10}).fetch()
        this.chefIdList = _.pluck(chefs, '_id')
        for (var i = 0; i < chefs.length; i++) {
            this.log(chefs[i]._id, chefs[i].manualRating, chefs[i].profile.name);
        }
    }
    constructMenu() {
        // meals.forEach{ menu.push( firstChef.getFood( weightLeft / mealsLeft.length, specs ) ) }
        // totalWeight = people * 250
        this.log("============= constructMenu =============");
        var weightLeft = this.totalWeight
        var mealsLeft = this.mealPlan.slice(0)
        var pricesLeft = this.priceClasses.slice(0)
        while (!_.isEmpty(mealsLeft)) {
            var mealsLeftCount = mealsLeft.length
            this.log("weightLeft", weightLeft)
            this.log("mealsLeftCount", mealsLeftCount)
            var mealSpecs = mealsLeft.shift()
            mealSpecs.priceClass = pricesLeft.shift()
            mealSpecs.minWeight = weightLeft / mealsLeftCount / this.snacksPerMeal || 0
            this.log("minWeight", mealSpecs.minWeight)
            mealSpecs.snacksPerMeal = this.snacksPerMeal
            var item = this.addMeal(mealSpecs)
            weightLeft = weightLeft - ( item.weight * this.snacksPerMeal )
            if (0 > weightLeft) weightLeft = 0
            this.log("");
        }
        this.printMeals()
    }
    addMeal(mealSpecs, lessStrictSpecs) {
        this.log("")
        this.log("================ addMeal ================");
        this.log("MEAL", mealSpecs);
        var item = null
        var find = {
            weight: {$gt: mealSpecs.minWeight},
            published: true,
            foodType: mealSpecs.foodType,
        }
        if (!lessStrictSpecs) {
            var unwanted = _.union(_.pluck(this.meals, '_id'), this.rejectedTemplates)
            find._id = {$nin: unwanted}
            if (mealSpecs.priceClass) find.priceClass = mealSpecs.priceClass
        }
        if (mealSpecs.tags) find.tags = mealSpecs.tag
        this.log("FIND", find.weight['$gt']+"g", find.foodType);

        var chefIndex = 0
        while (!item && chefIndex < this.chefIdList.length) {
            var rand = Math.random()
            find.chefId = this.chefIdList[chefIndex],
            this.log("CHEF", find.chefId);
            var items = MenuItemTemplates.find(find).fetch()
            item = items[parseInt(Math.random() * items.length)]
            chefIndex++
        }

        if (item) {
            item.originalSpecifications = mealSpecs
            this.meals.push(item)
            this.log("ITEM", item._id, item.weight+"g", _.pluck(item.tags, 'name'));
            return item
        } else if (lessStrictSpecs) {
            console.error('none of the chefs have what is needed:', find)
            throw new Meteor.Error("STILL NO MENUITEM")
        } else {
            this.log("RESET REJECTED AND RUN AGAIN WITH LESS SPECS");
            MenuItemsInOrder.remove({orderId: this.orderId, rejected: true})
            return this.addMeal(mealSpecs, true)
        }
    }
    runCalculatePrice(){
        this.log("======== runCalculatePrice ========");
        var priceToClient = 0
        for (var i = 0; i < this.meals.length; i++) {
            var mealPrice = Settings.priceClasses[this.meals[i].priceClass] * this.snacksPerMeal
            priceToClient = priceToClient + mealPrice
        }

        // Margin
        priceToClient = priceToClient * 1.8

        if (this.order.price.serveDrinks) priceToClient += this.peopleCount * 2.85
        if (this.order.price.serveCoffee) priceToClient += this.peopleCount * 1.75 * this.order.price.coffeeBreaks

        this.priceToClient = parseInt(priceToClient)
        this.log("PRICE", this.priceToClient)
        this.updatePrice()
        return this.priceToClient
    }
    updatePrice() {
        Orders.update(this.orderId, {$set: {'price.calculated': this.priceToClient}})
    }
    replaceHighestPrice() {
        // This method is deprecated, but too good to just throw away
        this.log("========== replaceHighestPrice ===========");
        this.log("------------- removeOneItem --------------");
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
        this.log("HIGHEST PRICE", highestPrice);
        var pickOne = responsible[parseInt(Math.random() * responsible.length)]
        this.log("REMOVE", pickOne._id);
        var index = _.indexOf(this.meals, pickOne)
        this.meals.splice(index, 1)
        this.log("--------------- addNewItem ---------------");
        this.log(pickOne);
        if (pickOne.priceClass == 'class1') {
            console.error("Already at cheapest class")
        } else {
            var classNr = parseInt(pickOne.priceClass.slice(-1)) - 1
            pickOne.originalSpecifications.priceClass = pickOne.priceClass.slice(0,-1) + classNr
            this.log("NEW PRICECLASS", pickOne.originalSpecifications.priceClass);
            this.addMeal(pickOne.originalSpecifications)
        }
    }
    insertFoods() {
        this.log("============ insertFoods ==============");
        var results = []
        _.each(this.meals, function(newItem, i){
            newItem.templateId = newItem._id
            delete newItem._id
            newItem.orderId = this.orderId
            newItem.inorder = true
            newItem.chefName = Meteor.users.findOne(newItem.chefId).profile.name
            newItem.amount = this.snacksPerMeal
            var result = MenuItemsInOrder.insert(newItem)
            results.push(result)
        }.bind(this))
        this.log("RESULTS", results);
        this.log("ITEMS IN ORDER", MenuItemsInOrder.find({orderId: this.orderId, rejected: {$ne: true}}).fetch().length);
    }
    printMeals(fromDB) {
        this.log("");
        this.log("           CHEFID           ITEMID");
        var grossWeight = 0
        var grossPrice = 0
        var meals
        if (fromDB)
            meals = MenuItemsInOrder.find({orderId: this.orderId, rejected: {$ne: true}}).fetch()
        else
            meals = this.meals

        for (var i = 0; i < meals.length; i++) {
            var item = meals[i]
            grossWeight = grossWeight + item.weight
            var snacksPerMeal = this.snacksPerMeal || meals[i].originalSpecifications.snacksPerMeal
            var mealPrice = Settings.priceClasses[meals[i].priceClass] * snacksPerMeal
            grossPrice = grossPrice + mealPrice
            this.log("ITEM", item.chefId, item._id, G.strlen(item.foodType, 7), G.strlen(item.weight+"g", 5), _.pluck(item.tags, 'name'));
        }
        this.log("");
        this.log("TOTAL MEALS", meals.length, grossWeight+"g", grossPrice+"€");
        this.log("");
    }

    log(){
        if (this.verbose) {
            console.log.apply(this, arguments)
        }
    }
}
