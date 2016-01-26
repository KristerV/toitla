Meteor.methods({
    "NewOrderSections.nextSection": function(orderId, currentIndex) {
        check(orderId, String)
        check(currentIndex, Number)
        var order = Orders.findOne(orderId)
        if (!order) return

        var formErrors = {}
        var field
        if (currentIndex === 0) {
            field = "contact"
            formErrors = order.checkRequiredFields(field, ["name", "number", "email"])
        } else if (currentIndex === 1) {
            field = "event"
            formErrors = order.checkRequiredFields(field, ["peopleCount", "location", "fromDate", "fromTime"])
        }

        Orders.update(orderId, {$set: {errors: formErrors}})

        if (_.isEmpty(formErrors) || (field && _.isEmpty(formErrors[field]))) {
            return true
        } else {
            return false
        }

    },
});
