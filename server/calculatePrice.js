Meteor.methods({
    calculatePrice:function(orderId) {

        var pieceLight = 8
        var pieceHeavy = 11
        var delivery = 5

        var pieceCoffee = 0.5 * 3.5             // omahind * kasum
        var pieceFood = 3 * 1.5                 // kokale * kasum
        var servantHour = 5 * 1.9 * 1.3 * 1.2   // neto * maksud * kasum * km
        var coffeeBreakDurationHours = 2.5

        // Fetch data
        var order = Orders.findOne(orderId);
        var details = order.details
        var peopleCount = details.peopleCount
        var mealCount = details.mealCount
        var serviceType = details.serviceType || 'heavy'

        // Calculate
        var price = 0
        if (serviceType === 'light')
            price = pieceLight * peopleCount + delivery
        else if (serviceType === 'heavy')
            price = pieceHeavy * peopleCount + delivery
        else if (serviceType === 'catering') {
            price = pieceFood * peopleCount * mealCount
            price += pieceCoffee * peopleCount * mealCount
            price += coffeeBreakDurationHours * servantHour * mealCount
            price += delivery
        } else
            throw new Meteor.Error("Calculator does not know of this service")

        // Update price
        Orders.update(orderId, {$set: {'details.calculatedPrice': Math.ceil(price)}})

    }
});
