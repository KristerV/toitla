Meteor.methods({
    createOrder: function() {
        return Orders.insert({
            createdAt: new Date,
            createdBy: this.userId,
            submitted: false,
            status: {
                phase: Object.keys(Settings.phases)[0],
            },
            allergies: {
                _id: Random.id(),
                host: "",
                guests: [],
            },
            errors: {},
            contact: {},
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
            throw new Meteor.Error("Submitted orders can't be resubmitted.")
        var price = order.price ? order.price.calculated : null;
        var data = {
            'price.originalPrice': price,
            'price.customPrice': price,
            'submitted': true,
        }

        order.updatePhase('new')
        Orders.update(orderId, {$set: data})

        // EMAIL

        var html = (order.status.phase === 'lost' ? "TELLIMUS KAOTATUD" : "UUS TELLIMUS")

        order.event = order.event || {}
        html += "<br/>eventName: " + (order.event.eventName)
        html += "<br/>eventType: " + (order.event.eventType)
        html += "<br/>peopleCount: " + (order.event.peopleCount)
        html += "<br/>location: " + (order.event.location)
        if (order.event.fromDate)
            html += "<br/>fromDate: " + moment(order.event.fromDate).tz("Europe/Tallinn").format("dd D. MMM")
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

        if(Meteor.isServer) {
            Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Uus tellimus', html)
        }
    },
    'Order--sendConfirmationEmails': function(orderId) {
        check(orderId, String)
        check(this.userId, String)
        if (Roles.userIsInRole(this.userId, 'manager') && Meteor.isServer) {
            var order = Orders.findOne(orderId)
            var menuitems = MenuitemsInOrder.find({orderId: orderId}).fetch()

            var chefsNotConfirmed = []
            menuitems.forEach(item => {
                if (!item.chefConfirmed && !_.contains(chefsNotConfirmed, item.chefId))
                    chefsNotConfirmed.push(item.chefId)
            })

            var link = G.getFullUrl('/order/'+orderId)
            chefsNotConfirmed.forEach(chefId => {
                var user = Meteor.users.findOne(chefId)
                var html = ""
                html += "Hey " + user.profile.name + ","
                html += "<p>You've got a new order. Please tick the confirmation checkboxes to let us know if you accept to cooking each dish:</p>"
                html += "<p><a href='"+link+"'></a>"+link+"</p>"
                html += "<p>All the best,<br/>Toitla's messenger pigeon</p>"
                Email.send('teavitus@toitla.com', user.getEmail(), 'Order is waiting for confirmation', html)
                Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Order is waiting for confirmation', html)
            })
        }
    }
});
