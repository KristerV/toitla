Meteor.methods({
    createOrder: function() {
        return Orders.insert({
            createdAt: new Date,
            submitted: false,
            status: {
                phase: Object.keys(Settings.phases)[0],
            },
            allergies: {
                _id: Random.id(),
                host: "",
                guests: [],
            },
            contact: {},
            flow: ['NewOrderSectionContacts']
        })
    },
    deleteOrder: function(orderId) {
        if (Roles.userIsInRole(this.userId, 'manager'))
            Orders.remove(orderId)
    },
    'NewOrder.submitForm': function(orderId) {
        var order = Orders.findOne(orderId)
        if (order.submitted)
            throw new Meteor.Error("Submitted order prices can't be resubmitted.")
        var price = order.price ? order.price.calculated : null;
        var data = {
            'price.originalPrice': price,
            'price.customPrice': price,
            'submitted': true,
        }

        var emailHTML = (order.status.phase === 'lost' ? " ------------------------------ Tellimus KAOTATUD ------------------------------ " : " ------------------------------ Uus tellimus toitlas ------------------------------ ") +


        "<br/>eventName: " + (order.event.eventName) +
        "<br/>eventType: " + (order.event.eventType) +
        "<br/>peopleCount: " + (order.event.peopleCount) +
        "<br/>location: " + (order.event.location) +
        "<br/>fromDate: " + moment(order.event.fromDate).format("D. MMM") +

        "<br/><br/>organization: " + (order.contact.organization) +
        "<br/>name: " + (order.contact.name) +
        "<br/>number: " + (order.contact.number) +
        "<br/>email: " + (order.contact.email) +

        "<br/>Hind: " + (price || "-") + "€" +

        "<br/><br/>Allergiad: " + (order.allergies.host || "-") + " (külalised sisestavad eraldi)" +
        "<br/>Lisainfo: " + (order.extraInfo || "-");


        Orders.update(orderId, {$set: data})
        if (!order.status.phase !== 'lost')
          order.updatePhase('new')

        if(Meteor.isServer) {
          Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Uus tellimus', emailHTML)
        }
    }
});
