Meteor.methods({
    calculatePrice:function(orderId) {

        var pieceLight = 8
        var pieceHeavy = 11
        var pieceCatering = 4.75

        var pieceCoffee = 0.5 * 3.5
        var servantHour = 12

        var coffeeBreakDurationHours = 2

        // Fetch data
        var order = Orders.findOne(orderId);
        var details = order.details
        var peopleCount = details.peopleCount
        var mealCount = details.mealCount
        var serviceType = details.serviceType || 'heavy'

        // Calculate
        var price = 0
        if (serviceType === 'light')
            price = pieceLight * peopleCount
        else if (serviceType === 'heavy')
            price = pieceHeavy * peopleCount
        else if (serviceType === 'catering') {
            price = pieceCatering * peopleCount * mealCount
            price += pieceCoffee * peopleCount * mealCount
            price += coffeeBreakDurationHours * servantHour
        } else
            throw new Meteor.Error("Calculator does not know of this service")

        // Update price
        Orders.update(orderId, {$set: {'details.calculatedPrice': Math.ceil(price)}})

    }
});
