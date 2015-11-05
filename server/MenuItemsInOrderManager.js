// FIXME: kokal max 90 suupistet või 3 snäkki
// FIXME: 2 kokka, 5:1 toitude arv
// FIXME: meatfree doesn't always happen
// TODO: schedule instead of refresh, so less CPU wasted
// FIXME: kuidas saab menuitem undefined tulla?
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
        this.currentPrice = null
        this.maxPrice = null
        this.snacksPerMeal = null
        this.totalWeight = null
    }

    switchItem(itemId) {
        this.log("========================================= switchItem =========================================");
        check(itemId, String)
        this.reset()
        var oldItem = MenuItemsInOrder.findOne(itemId)
        MenuItemsInOrder.update(itemId, {$set: {rejected: true}})
        var rejectedTemplates = MenuItemsInOrder.find({orderId: oldItem.orderId, rejected: true}).fetch()
        this.rejectedTemplates = _.pluck(rejectedTemplates, 'templateId')
        this.findChefs()
        oldItem.originalSpecifications.priceClass = oldItem.priceClass
        this.addMeal(oldItem.originalSpecifications)
        this.insertFoods()
    }

    refreshOrder() {
        this.log("============ refreshOrder ============");
        check(this.orderId, String)
        this.reset()
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
        this.getRequirements()
        this.findChefs()
        this.constructMenu()
        this.cropTotalPrice()
        MenuItemsInOrder.remove({orderId: this.orderId})
        this.insertFoods()
    }
    getRequirements() {
        // var meals = 2/3soolast( 1/3 vege + 2/3 soolast ) + 1/3magus
        this.log("=========== getRequirements ===========");

        this.order = Orders.findOne(this.orderId)
        if (!this.order) throw new Meteor.Error("MenuItemsInOrderManager.getRequirements(): no such order exists.")

        var people = Number(this.order.details.peopleCount)
        this.log("people",people);

        var mealCount = Math.round( people / 5 )
        this.log("mealCount",mealCount);

        var snacksCount = mealCount * people
        this.log("snacksCount",snacksCount);

        this.snacksPerMeal = snacksCount / mealCount
        this.log("snacksPerMeal",this.snacksPerMeal);

        var mealPlan = []
        var dishVeg = mealCount * 0.15
        this.log("dishVeg", dishVeg);

        var dishDessert = mealCount * 0.33 + dishVeg
        this.log("dishDessert", dishDessert);

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
        this.log("mealPlan", mealPlan);

        this.totalWeight = people * this.settings.gramsPerPerson
        this.log("totalWeight",this.totalWeight);
    }
    findChefs() {
        // chefs.find(vet, firmanimi, firmakood, kokanimi).sort(manualRating, acceptanceScore)
        this.log("============== findChefs ==============");
        var chefs = Meteor.users.find({eligible: true}, {sort: {manualRating: -1, acceptanceScore: -1}, limit: 20}).fetch()
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
        while (!_.isEmpty(mealsLeft)) {
            var mealSpecs = mealsLeft.shift()
            mealSpecs.minWeight = weightLeft / mealsLeft.length / this.snacksPerMeal || 0
            mealSpecs.snacksPerMeal = this.snacksPerMeal
            var item = this.addMeal(mealSpecs)
            weightLeft = weightLeft - ( item.weight * this.snacksPerMeal )
            if (0 > weightLeft) weightLeft = 0
            this.log("");
        }
        this.printMeals()
    }
    addMeal(mealSpecs, ignoreUnwanted) {
        this.log("================ addMeal ================");
        this.log("MEAL", mealSpecs);
        var item = null
        var find = {
            weight: {$gt: mealSpecs.minWeight},
            published: true,
            foodType: mealSpecs.foodType,
        }
        if (!ignoreUnwanted) {
            var unwanted = _.union(_.pluck(this.meals, '_id'), this.rejectedTemplates)
            find._id = {$nin: unwanted}
        }
        if (mealSpecs.priceClass) find.priceClass = mealSpecs.priceClass
        if (mealSpecs.tags) find.tags = mealSpecs.tag
        this.log("FIND", find.weight['$gt']+"g", find.foodType);
        this.log(find);

        var chefIndex = 0
        while (!item && chefIndex < this.chefIdList.length) {
            // TODO: rand not implemented
            var rand = Math.random()
            find.chefId = this.chefIdList[chefIndex],
            this.log("CHEF", find.chefId);
            item = MenuItemTemplates.findOne(find)
            chefIndex++
        }

        if (item) {
            item.originalSpecifications = mealSpecs
            this.meals.push(item)
            this.log("ITEM", item._id, item.weight+"g", _.pluck(item.tags, 'name'));
            return item
        } else if (ignoreUnwanted) {
            throw new Meteor.Error("STILL NO MENUITEM")
        } else {
            this.addMeal(mealSpecs, true)
        }
    }
    cropTotalPrice() {
        // menu.forEach{ if (maxPrice > currentPrice) { replace most expensive piece  } catch { ERROR } }
        this.log("=======================================");
        this.log("============ cropTotalPrice ===========");
        this.calculateMaxPrice()
        var count = 0
        while (this.maxPrice < this.currentPrice && count < 100) {
            this.replaceHighestPrice()
            this.calculateCurrentPrice()
            this.log("COUNT", count);
            count++
        }
        this.printMeals()
        this.log("^^^^^^^^^^^^ cropTotalPrice ^^^^^^^^^^^");
        this.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    }
    calculateCurrentPrice(){
        this.log("======== calculateCurrentPrice ========");
        var currentPrice = 0
        for (var i = 0; i < this.meals.length; i++) {
            var mealPrice = Settings.priceClasses[this.meals[i].priceClass] * this.snacksPerMeal
            currentPrice = currentPrice + mealPrice
        }
        this.currentPrice = currentPrice
        this.log("CURRENT", this.currentPrice);
    }
    calculateMaxPrice() {
        this.log("========== calculateMaxPrice ==========");
        var orderTotal = this.order.details.currentPrice || this.order.details.calculatedPrice
        this.maxPrice = orderTotal * this.settings.foodMaxPercentFromTotal
        this.log("MAX", this.maxPrice);
        this.calculateCurrentPrice()
    }
    replaceHighestPrice() {
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
