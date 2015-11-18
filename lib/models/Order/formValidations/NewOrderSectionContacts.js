Meteor.methods({
    "NewOrderSections.nextSection": function(orderId, currentIndex, nextFlowSection) {
        check(orderId, String)
        check(currentIndex, Number)
        check(nextFlowSection, String)
        var order = Orders.findOne(orderId)
        if (!order) return
        var currentForm = order.flow[currentIndex]

        var formErrors = {}
        if (currentForm == "NewOrderSectionContacts") {
            formErrors = order.checkRequiredFields("contact", ["name", "number", "email"])
        } else if (currentForm == "NewOrderSectionEvent") {
            formErrors = order.checkRequiredFields("event", ["peopleCount", "location", "fromDate", "fromTime"])
        }

        if (_.isEmpty(formErrors)) {
            var newFlow = order.flow.slice(0, currentIndex+1)
            newFlow.push(nextFlowSection)
            Orders.update(orderId, {$set: {flow: newFlow}})
        } else {
            Orders.update(orderId, {$set: {errors: formErrors}})
        }

    },
    "NewOrderSectionContacts.validate": function(orderId){
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order) return
        var errors = {}
        var validated = true

        if (!order.contact.name || order.contact.name instanceof String) {
            errors['name'] = T("global", "please_fill")
            validated = false
        } else {
            errors['name'] = null
        }

        if (!order.contact.number) {
            errors['number'] = T("global", "please_fill")
            validated = false
        } else {
            errors['number'] = null
        }

        if (!order.contact.email || !Security.isEmail(order.contact.email)) {
            errors['email'] = T("global", "please_fill")
            validated = false
        } else {
            errors['email'] = null
        }

        Orders.update(orderId, {$set: {"errors.contact": errors, 'validated.contact': validated}})
        return validated
    }
});
