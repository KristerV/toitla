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
        check(orderId, String);
        var order = Orders.findOne(orderId)
        if (order.submitted)
            throw new Meteor.Error("Submitted order prices can't be resubmitted.")
        var price = order.price ? order.price.calculated : null;
        var data = {
            'price.originalPrice': price,
            'price.customPrice': price,
            'submitted': true,
        }

        var html = (order.status.phase === 'lost' ? "TELLIMUS KAOTATUD" : "UUS TELLIMUS")

        order.event = order.event || {}
        html += "<br/>eventName: " + (order.event.eventName)
        html += "<br/>eventType: " + (order.event.eventType)
        html += "<br/>peopleCount: " + (order.event.peopleCount)
        html += "<br/>location: " + (order.event.location)
        if (order.event.fromDate)
            html += "<br/>fromDate: " + moment(order.event.fromDate).tz("Europe/Tallinn").format("D. MMM")
        else
            html += "<br/>fromDate: undefined"


        order.contact = order.contact || {}
        html += "<br/><br/>organization: " + (order.contact.organization)
        html += "<br/>name: " + (order.contact.name)
        html += "<br/>number: " + (order.contact.number)
        html += "<br/>email: " + (order.contact.email)

        order.allergies = order.event || {}
        html += "<br/><br/>Allergiad: " + (order.allergies.host || "-") + " (külalised sisestavad eraldi)"
        html += "<br/>Lisainfo: " + (order.extraInfo || "-")


        Orders.update(orderId, {$set: data})
        if (!order.status.phase !== 'lost')
          order.updatePhase('new')

        if(Meteor.isServer) {
          Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Uus tellimus', html)
        }
    }
});
