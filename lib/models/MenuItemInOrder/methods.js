
Meteor.methods({
    'menuitemInOrder--refreshOrder': function(orderId) {
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer) {
                // var manager = new MenuGenerator(orderId)
                // return manager.refreshOrder()
            }
        } else {
            throw new Meteor.Error("Not authorized to update Menuitems.")
        }
    },
    'menuitemInOrder--switchItem': function(menuitemId) {
        check(menuitemId, String)
        var menuitem = MenuitemsInOrder.findOne(menuitemId)
        var order = Orders.findOne(menuitem.orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer) {
                // var manager = new MenuGenerator(order._id)
                // return manager.switchItem(menuitemId)
            }
        } else {
            throw new Meteor.Error("Not authorized to update Menuitems.")
        }
    },
    'menuitemInOrder--removeItem': function(menuitemId) {
        check(menuitemId, String)
        if (Roles.userIsInRole(this.userId, 'manager')) {
            var orderId = MenuitemsInOrder.findOne(menuitemId).orderId
            MenuitemsInOrder.remove(menuitemId)
            Meteor.call('menuitemInOrder--calculateTotals', orderId)
        }
    },
    'menuitemInOrder--addArray': function(orderId, newItems) {
        check(orderId, String)
        check(newItems, [String])
        if (Roles.userIsInRole(this.userId, 'manager')) {
            if(Meteor.isServer){
                var templates = MenuitemTemplates.find({_id: {$in: newItems}})
                var manager = new MenuGenerator(orderId)
                templates.forEach(template => {
                        manager.insertTemplate(template)
                })
                Meteor.call('menuitemInOrder--calculateTotals', orderId)
            }
        }
    },
    'menuitemInOrder--calculateTotals': function(orderId) {
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order.submitted || Roles.userIsInRole(this.userId, 'manager')) {
            // if(Meteor.isServer) {
                // var manager = new MenuGenerator(orderId)
                // return manager.calculateTotals()
            // }
            if (!order.event || !order.event.peopleCount) {
                sAlert.warning("How many people are at the event? Can't calculate cost.")
                return false
            }

            var people = order.event.peopleCount
            var totalWeight = 0
            var totalPrice = 0
            var totalPieces = 0
            var menu = MenuitemsInOrder.find({orderId: orderId})
            menu.forEach(function(item){
                totalWeight += item.weight * item.amount
                totalPrice += item.price * item.amount
                totalPieces += item.amount
            })

            var pricePP = totalPrice / people
            var weightPP = totalWeight / people
            var piecesPP = totalPieces / people

            if(Meteor.isServer){
                Orders.update(orderId, {$set: {
                    'price.calculated': parseInt(totalPrice),
                    'price.totalWeight': parseInt(totalWeight),
                    'price.totalPieces': parseInt(totalPieces),
                    'price.weightPerPerson': parseFloat(weightPP.toFixed(2)),
                    'price.piecesPerPerson': parseFloat(piecesPP.toFixed(2)),
                    'price.netPricePerPerson': parseFloat(pricePP.toFixed(2)),
                }})
            }
        } else {
            throw new Meteor.Error("Not authorized to update Menuitems.")
        }
    },
    'menuitemInOrder--updateField': function(menuitemId, fieldName, fieldValue) {
        check(menuitemId, String)
        check(fieldName, String)
        check(fieldValue, Match.OneOf(String, null))
        check(this.userId, String)
        var menuitem = MenuitemsInOrder.findOne(menuitemId)
        if (menuitem && (menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) ) {
            var data = {}
            data[fieldName] = Number(fieldValue) || fieldValue // convert to number if possible
            MenuitemsInOrder.update(menuitemId, {$set: data})
        }
        menuitem.validateDetails(fieldName, fieldName)
        Meteor.call('menuitemInOrder--calculateTotals', menuitem.orderId)
    },
    'menuitemInOrder--removeAll': function(orderId) {
        check(orderId, String)
        check(this.userId, String)
        if (Roles.userIsInRole(this.userId, 'manager')) {
            MenuitemsInOrder.remove({orderId: orderId})
            if(Meteor.isServer) {
                Meteor.call('menuitemInOrder--calculateTotals', orderId)
            }
        }
    }
});
