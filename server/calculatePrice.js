// lõuna - pidu - catering
//   8      11     4.75/paus   näkku


/*
kohvi kasumi kordaja 3.5
kohvi näkku 0.5
toidu kasumi kordaja 1.5
toit kokale 2
teenindaja tunnihind 12

inimeste arv
pauside arv
*/

Meteor.methods({
    calculatePrice:function(orderId) {

        var order = Orders.findOne(orderId);
        var details = order.details

        // Settings - võid neid numbreid muuta, aga ainult numbreid!
        var maxPeoplePerServant = 60
        var maxPieceOfFoodPerChef = 60
        var extraHoursToClean = 1
        var min_peopleCount = Settings.minimum_people_count
        var extra_costUnderMin = 2

        var cost_ServantHour = 5
        var cost_AdminFee = 20
        var cost_Delivery = 5
        var cost_tableSetAtStart = cost_ServantHour * 1

        var cost_PerFace_dessertAtEnd = 1
        var cost_PerFace_extraLunchSize = 0.3

        var cost_PerMeal_PerFace_Food = 4
        var cost_PerMeal_PerFace_CoffeeAndTea = 0.1

        var cost_ToitlaProfitPercent = 0.3

        ///////////////////////////////////////////////////
        ////// DEVELOPERS ONLY BELOW THIS LINE ////////////
        ///////////////////////////////////////////////////

        var price = 0

        // Get order details

        var peopleCount = details.peopleCount
        var mealCount = details.mealCount
        var fromDate = details.fromDate
        var fromTime = details.fromTime
        var toDate = details.toDate || details.fromDate
        var toTime = details.toTime

        var catering = details.catering
        var tableSetAtStart = details.tableSetAtStart
        var heavyLunch = details.heavyLunch
        var dessertAtEnd = details.dessertAtEnd

        // Manipulate data
        var fromDateTime = moment(fromDate).add(fromTime)
        var toDateTime = moment(toDate).add(toTime)
        var diffDateTime = toDateTime.diff(fromDateTime)
        var duration = moment.duration(diffDateTime)
        var durationAsDays = Math.ceil(duration.asDays())
        var durationAsHours = duration.asHours()

        // Food
        price += mealCount * peopleCount * cost_PerMeal_PerFace_Food
        if (dessertAtEnd)
            price += peopleCount * cost_PerFace_dessertAtEnd * durationAsDays
        if (heavyLunch)
            price += peopleCount * cost_PerFace_extraLunchSize * durationAsDays

        // Delivery
        var piecesOfFood = peopleCount * mealCount
        var numberOfChefs = Math.ceil(piecesOfFood / maxPieceOfFoodPerChef)
        price += cost_Delivery * numberOfChefs * durationAsDays
        if (tableSetAtStart)
            price += cost_tableSetAtStart

        // Catering
        if (catering) {
            var serversCount = Math.ceil(peopleCount / maxPeoplePerServant)
            price += serversCount * (durationAsHours + extraHoursToClean) * cost_ServantHour
            price += peopleCount * cost_PerMeal_PerFace_CoffeeAndTea * mealCount
        }

        // Admin
        price += cost_AdminFee

        // Toitla
        price = price + (price * cost_ToitlaProfitPercent)

        // Under minimum number of people
        if (peopleCount < min_peopleCount)
            price = price * extra_costUnderMin

        // Math
        price = Math.ceil(price)

        // just in case
        price = price ? price : 0

        // Save price
        Orders.update(orderId, {$set: {'details.calculatedPrice': price}})
    }
});
