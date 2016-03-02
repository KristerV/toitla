Meteor.methods({
    createOrder: function () {
        return Orders.insert({
            createdAt: new Date,
            createdBy: this.userId,
            allergies: {
                _id: Random.id(),
                host: "",
                guests: [],
            },
            errors: {},
            contact: {},
        })
    },
    deleteOrder: function (orderId) {
        if (Roles.userIsInRole(this.userId, 'manager')) {
            Orders.remove(orderId)
            MenuitemsInOrder.remove({orderId: orderId})
        }
    },
    'NewOrder.submitForm': function (orderId) {
        check(orderId, String);
        var order = Orders.findOne(orderId)
        if (order.isSubmitted())
            throw new Meteor.Error("Submitted orders can't be resubmitted.")

        // Submitted status
        Meteor.call('Settings--startChecklist', 'orders', orderId, 'status', (err, result) => {
            // Only after status checklist is ready
            Orders.update({_id: orderId, 'status.text': 'Submitted'}, {$set: {'status.$.checked': true}})
        })

        // EMAIL

        var html = (order.result && order.result.result === 'lost' ? "TELLIMUS KAOTATUD" : "UUS TELLIMUS")

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

        Meteor.call('sendEmail', null, null, 'Uus tellimus', html, true)
    },
    'Order--sendConfirmationEmails': function (orderId) {
        check(orderId, String)
        check(this.userId, String)
        if (Roles.userIsInRole(this.userId, 'manager') && Meteor.isServer) {
            var order = Orders.findOne(orderId)
            order.chefs = order.chefs || []

            var noResponse = []
            order.chefs.forEach(chef => {
                if (!chef.confirmed && !chef.declined)
                    noResponse.push(chef._id)
            })

            var link = G.getFullUrl('/order/' + orderId)
            noResponse.forEach(chefId => {
                var user = Meteor.users.findOne(chefId)
                var html = ""
                html += "<p>Tsau " + user.profile.name + ",</p>"
                html += "<p>Sulle on tulnud uus tellimus. Kliki lingile ja kinnita oma nõusolekut.</p>"
                html += "<p><a href='" + link + "'></a>" + link + "</p>"
                html += "<p>Head päeva jätku,<br/>Toitla kirjatuvi</p>"
                Meteor.call('sendEmail', null, user.getEmail(), 'Uus tellimus', html)
            })
        }
    },
    'Order--sendDetailsEmail': function (orderId, chefId) {
        check(orderId, String)
        check(chefId, String)
        check(this.userId, String)
        if ((Roles.userIsInRole(this.userId, 'manager') || chefId === this.userId) && Meteor.isServer) {
            var order = Orders.findOne(orderId)
            var confirmation
            order.chefs.forEach(chef => {
                if (chef._id === chefId)
                    confirmation = chef
            })

            if (!confirmation) throw new Mereot.Error("No comfirmation object exists for this chef")

            var confirmNotes = confirmation.notes ? confirmation.notes.replace(/(?:\r\n|\r|\n)/g, '<br />') : ''
            var menuitems = MenuitemsInOrder.find({orderId: orderId, chefId: chefId})

            var date = moment(order.event.fromDate).tz("Europe/Tallinn").format("DD.MM.YYYY")
            var time = moment(order.event.fromTime).format("HH:mm")

            var user = Meteor.users.findOne(chefId)
            var address = ""
            user.profile.locations.forEach(loc => {
                if (loc._id === confirmation.pickupLocation)
                    address = loc.address
            })

            var link = G.getFullUrl('/order/' + orderId)
            var html = ""
            html += "<p>Tsau " + user.profile.name + ",</p>"
            html += "<p>Siin on viimase tellimuse detailid</p>"
            html += "<h2>Tellimus</h2>"
            html += "<ul>"
            html += "<li>Aeg: " + date + " kell " + time + "</li>"
            html += "<li>Üritus: " + order.event.eventType + "</li>"
            html += "<li><a href='" + link + "'>ürituse link</a></li>"
            html += "</ul>"
            html += "<br/>"
            html += "<h2>Menüü</h2>"
            html += "<ul>"
            var totalPrice = 0
            var totalWeight = 0
            menuitems.forEach(item => {
                totalPrice += item.price * item.amount
                totalWeight += item.weight * item.amount
                html += "<li>" + item.title + " (" + item.weight + "g, " + item.price + "€, " + item.amount + "tk)</li>"
            })
            html += "<li>Lõppsumma: " + totalPrice + "€</li>"
            html += "<li>Lõppkaal: " + totalWeight + "g</li>"
            html += "</ul>"
            html += "<br/>"
            html += "<h2>Kokkulepe</h2>"
            html += "<ul>"
            html += "<li>Kättesaamise aeg: " + confirmation.pickupTime + "</li>"
            html += "<li>Kättesaamise koht: " + address + "</li>"
            html += "<li>Lisainfo: " + confirmNotes + "</li>"
            html += "</ul>"
            let allergies = order.getAllergies()
            if (allergies)
                html += `<p style="color: red"><b>Allergiad</b>: ${allergies}</p>`
            html += "<p>Head päeva jätku,<br/>Toitla kirjatuvi</p>"
            Meteor.call('sendEmail', null, user.getEmail(), (date + ' Tellimuse detailid'), html)
        }
    },
    'Order--updateChefsArrayField': function (orderId, arrayId, field, value) {
        if (Meteor.isClient) return false // chef doesn't have all neede info published
        check(orderId, String);
        check(arrayId, Match.OneOf(String, null, undefined));
        check(field, String);
        check(value, Match.OneOf(String, Boolean));
        check(this.userId, String);

        var order = Orders.findOne(orderId)
        if (!Roles.userIsInRole(this.userId, 'manager') && !order.isChefInOrder(this.userId))
            throw new Meteor.Error(401, "Who are you? Order--updateChefsArrayField")

        if (!Orders.findOne({_id: orderId, 'chefs._id': arrayId})) {
            Orders.update(orderId, {$addToSet: {chefs: {_id: arrayId, [field]: value}}})
        } else {
            Orders.update({_id: orderId, 'chefs._id': arrayId}, {$set: {['chefs.$.' + field]: value}})
        }

    },
    'Order--resultChange': function (orderId, result) {
        check(orderId, String);
        check(result, Match.OneOf(String, null));
        check(this.userId, String);
        if (!Roles.userIsInRole(this.userId, 'manager'))
            throw new Meteor.Error(401, "Who are you? Order--resultChange")

        Orders.update(orderId, {$set: {'result.result': result}})
    },
    'Order--resetDriverInfo': function (orderId) {
        check(orderId, String)
        check(this.userId, String)
        if (Meteor.isClient) return
        if (Roles.isManager(this.userId)) {
            const order = Orders.findOne(orderId)
            order.driver = order.driver || {}
            const settings = Settings.findOne('driver')

            // Easy info
            const intro = settings.message.intro
            const outro = settings.message.outro
            let waypoints = (order.chefs ? order.chefs.length : 0) + 1 + (order.driver.startOffice ? 1 : 0)
            const summary = `Tänases tellimuses on kokku **${waypoints} sihtkohta**.`

            // Compile start waypoint
            let start = ""
            if (order.driver.startOffice) {
                const toitla = Settings.toitla
                start = `**Toitla kontor** ${toitla.address}.\n${toitla.directions}\n[Waze](${toitla.waze})\n![kontorisse pilt](${toitla.mapImage})\n\n`
            }

            // Compile chefs directions
            let chefsInfo = ""
            if (order.chefs) {
                order.chefs.forEach((item, i) => {
                    let user = Meteor.users.findOne(item._id)
                    let location = {}
                    user.profile.locations.forEach(loc => {
                        if (loc._id === item.pickupLocation)
                            location = loc
                    })
                    if (location.address)
                        chefsInfo += `**${location.address}**`
                    else
                        chefsInfo += `# ${user.profile.name} has not chosen an address`
                    if (location.notes)
                        chefsInfo += `\n${location.notes}`
                    if (location.latlong)
                        chefsInfo += `\n[Waze](${G.getWazeLink(location.latlong)})`
                    chefsInfo += `\n\n`
                })
            }


            // Compile finish
            let finish = ""
            if (order.event.location)
                finish += `**${order.event.location}**`
            else
                finish += "# Missing event address"
            if (order.driver.finishDirections)
                finish += `\n${order.driver.finishDirections}`
            if (order.driver.finishLatlong)
                finish += `\n[Waze](${G.getWazeLink(order.driver.finishLatlong)})`

            // Results
            const total = `${intro}\n${summary}\n\n${start}${chefsInfo}\n\n${finish}\n\n${outro}`
            Orders.update(orderId, {$set: {'driver.info': total}})
            return total
        }
    },
    'Order--moveChefUp': function (orderId, startIndex) {
        check(orderId, String)
        check(startIndex, Number)
        if (!Roles.isManager(this.userId))
            throw new Meteor.Error('How did you even get here?')

        if (startIndex <= 0)
            return true

        var order = Orders.findOne(orderId)
        var item = order.chefs[startIndex]
        Orders.update(orderId, {
            $pull: {chefs: {_id: item._id}}
        })
        Orders.update(orderId, {
            $push: {
                chefs: {
                    $position: startIndex - 1,
                    $each: [item],
                }
            }
        })
    }
});
