Meteor.methods({
    "NewOrderSections.nextSection": function(orderId, currentIndex) {
        check(orderId, String);
        check(currentIndex, Number);
        var order = Orders.findOne(orderId);
        if (!order) {
            return;
        }

        var formErrors = {};
        var field;
        if (currentIndex == 0) {
            field = "contact";
            formErrors = order.checkRequiredFields(field, ["name", "number", "email"])
        } else if (currentIndex == 1) {
            field = "event";
            formErrors = order.checkRequiredFields(field, ["peopleCount", "location", "fromDate", "fromTime"])
        } else if (currentIndex == 3) {
            field = "payment";
            formErrors = order.checkRequiredFields(field, ["name"]);
        }

        Orders.update(orderId, {$set: {errors: formErrors}});

        return !!(_.isEmpty(formErrors) || (field && _.isEmpty(formErrors[field])));
    },

    "NewOrderSections.validate": function(orderId) {
        check(orderId, String);
        var order = Orders.findOne(orderId);

        if (!order) {
            return;
        }

        var formErrors = {};

        var contactErrors = order.checkRequiredFields("contact", ["name", "number", "email"]);
        if (!_.isEmpty(contactErrors["contact"])) {
            formErrors["contact"] = contactErrors["contact"];
        }

        var eventErrors = order.checkRequiredFields("event", ["peopleCount", "location", "fromDate", "fromTime", "duration"]);
        if (!_.isEmpty(eventErrors["event"])) {
            formErrors["event"] = eventErrors["event"];
        }

        var paymentErrors = order.checkRequiredFields("payment", ["name"]);
        if (!_.isEmpty(paymentErrors["payment"])) {
            formErrors["payment"] = paymentErrors["payment"];
        }

        Orders.update(orderId, {$set: {errors: formErrors}});

        return _.isEmpty(formErrors);
    }
});
