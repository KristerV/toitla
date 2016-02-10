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
        if (Roles.userIsInRole(this.userId, 'manager')) {
            Orders.remove(orderId)
            MenuitemsInOrder.remove({orderId: orderId})
        }
    },
    'NewOrder.submitForm': function(orderId) {
        check(orderId, String);
        var order = Orders.findOne(orderId)
        if (order.isSubmitted())
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
            order.chefs = order.chefs || []

            // All chefs are in chefsInOrder
            // Only chefs with replies are in chefs
            // Chef with no response does not have confirm nor declined set.
            var chefsNotConfirmed = order.chefsInOrder
            order.chefs.forEach(chef => {
                if (chef.confirmed || chef.declined)
                    var index = chefsNotConfirmed.indexOf(chef._id);
                    if (index > -1) {
                        chefsNotConfirmed.splice(index, 1);
                    }
            })

            var link = G.getFullUrl('/order/'+orderId)
            chefsNotConfirmed.forEach(chefId => {
                var user = Meteor.users.findOne(chefId)
                var html = ""
                html += "<p>Tsau " + user.profile.name + ",</p>"
                html += "<p>Sulle on tulnud uus tellimus. Kliki lingile ja kinnita oma nõusolekut.</p>"
                html += "<p><a href='"+link+"'></a>"+link+"</p>"
                html += "<p>Head päeva jätku,<br/>Toitla kirjatuvi</p>"
                console.log(html);
                Email.send('teavitus@toitla.com', user.getEmail(), 'Uus tellimus', html)
                Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Uus tellimus', html)
            })
        }
    },
    'Order--sendDetailsEmail': function(orderId, chefId) {
        check(orderId, String)
        check(chefId, String)
        check(this.userId, String)
        if ((Roles.userIsInRole(this.userId, 'manager') || chefId === this.userId) && Meteor.isServer) {
            var order = Orders.findOne(orderId, {chefs: {$elemMatch: {_id: chefId}}})
            var confirmation = order.chefs[0]
            var confirmNotes = confirmation.notes ? confirmation.notes.replace(/(?:\r\n|\r|\n)/g, '<br />') : ''
            var menuitems = MenuitemsInOrder.find({orderId: orderId, chefId: chefId})

            var date = moment(order.event.fromDate).format("DD.MM.YYYY")
            var time = moment(order.event.fromTime).format("HH:mm")

            var user = Meteor.users.findOne(chefId, {'profile.locations': {$elemMatch: {_id: confirmation.pickupLocation}}})

            var link = G.getFullUrl('/order/'+orderId)
            var html = ""
            html += "<p>Tsau " + user.profile.name + ",</p>"
            html += "<p>Siin on viimase tellimuse detailid</p>"
            html += "<h2>Tellimus</h2>"
            html += "<ul>"
            html += "<li>Aeg: " + date + " kell " + time + "</li>"
            html += "<li>Üritus: " + order.event.eventType + "</li>"
            html += "<li><a href='"+link+"'></a>ürituse link</li>"
            html += "</ul>"
            html += "<br/>"
            html += "<h2>Menüü</h2>"
            html += "<ul>"
            menuitems.forEach(item => {
                html += "<li>" + item.title + " (" + item.amount + "tk)" + "</li>"
            })
            html += "</ul>"
            html += "<br/>"
            html += "<h2>Kokkulepe</h2>"
            html += "<ul>"
            html += "<li>Kättesaamise aeg: " + confirmation.pickupTime + "</li>"
            html += "<li>Kättesaamise koht: " + user.profile.locations[0].address + "</li>"
            html += "<li>Lisainfo: " + confirmNotes + "</li>"
            html += "</ul>"
            html += "<p>Head päeva jätku,<br/>Toitla kirjatuvi</p>"
            Email.send('teavitus@toitla.com', user.getEmail(), (date + ' Tellimuse detailid'), html)
            Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Uus tellimus', html)
        }
    },
    'Order--updateChefsArrayField': function(orderId, arrayId, field, value) {
        if(Meteor.isClient) return false // chef doesn't have all neede info published
        check(orderId, String);
        check(arrayId, Match.OneOf(String, null, undefined));
        check(field, String);
        check(value, Match.OneOf(String, Boolean));
        check(this.userId, String);

        var order = Orders.findOne(orderId)
        if (!Roles.userIsInRole(this.userId, 'manager') && !_.contains(order.chefsInOrder, this.userId))
            throw new Meteor.Error(401, "Who are you? Order--updateChefsArrayField")

        if (!Orders.findOne({_id: orderId, 'chefs._id': arrayId})) {
            Orders.update(orderId, {$addToSet: {chefs: {_id: arrayId, [field]: value}}})
        } else {
            Orders.update({_id: orderId, 'chefs._id': arrayId}, {$set: {['chefs.$.' + field]: value}})
        }

    }
});
