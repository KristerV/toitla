Meteor.methods({
    "NewOrderSections.nextSection": function(orderId, currentIndex, nextFlowSection) {
        check(orderId, String)
        check(currentIndex, Number)
        check(nextFlowSection, String)
        console.log("NEXT SECTION");
        var order = Orders.findOne(orderId)
        if (!order) return
        var currentForm = order.flow[currentIndex]

        var formErrors = {}
        var field
        if (currentForm == "NewOrderSectionContacts") {
            field = "contact"
            formErrors = order.checkRequiredFields(field, ["name", "number", "email"])
            } else if (currentForm == "NewOrderSectionEvent") {
            field = "event"
            formErrors = order.checkRequiredFields(field, ["peopleCount", "location", "fromDate", "fromTime"])
        }

        if (_.isEmpty(formErrors) || (field && _.isEmpty(formErrors[field]))) {
            var newFlow = order.flow.slice(0, currentIndex+1)
            newFlow.push(nextFlowSection)
            Orders.update(orderId, {$set: {flow: newFlow, errors: formErrors}})
        } else {
            Orders.update(orderId, {$set: {errors: formErrors}})
        }

    },
});
