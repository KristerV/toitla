
Meteor.methods({
    'menuitemInOrder--refreshOrder': function(orderId) {
        check(orderId, String)
        var order = Orders.findOne(orderId)
        if (!order.isSubmitted() || Roles.userIsInRole(this.userId, 'manager')) {
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
        if (!order.isSubmitted() || Roles.userIsInRole(this.userId, 'manager')) {
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
    'menuitemInOrder--addItem': function(orderId, newItemId) {
        check(orderId, String)
        check(newItemId, String)
        if (Meteor.isServer && Roles.userIsInRole(this.userId, 'manager')) {
            var order = Orders.findOne(orderId)
            order.event = order.event || {}
            order.status = order.status || {}
            var template = MenuitemTemplates.findOne(newItemId)

            template.templateId = template._id
            delete template._id
            template.orderId = orderId
            template.inorder = true
            template.chefName = Meteor.users.findOne(template.chefId).profile.name
            template.amount = 20
            template.dueDate = order.event.fromDate
            template.orderStatus = order.status.phase

            MenuitemsInOrder.insert(template)
            Meteor.call('menuitemInOrder--calculateTotals', orderId)
        }
    },
    'menuitemInOrder--addMenuitemsArray': function(orderId, newItemIds) {
        throw new Meteor.Error("menuitemInOrder--addMenuitemsArray is deprecated");
        check(orderId, String)
        check(newItemIds, [String])
        if (Roles.userIsInRole(this.userId, 'manager')) {
            newItemIds.forEach(itemId => {
                Meteor.call('menuitemInOrder--addItem', orderId, itemId)
            })
        }
    },
    'menuitemInOrder--calculateTotals': function(orderId) {
        check(orderId, String)
        if(Meteor.isClient) return

        var order = Orders.findOne(orderId)
        if (!order.isSubmitted() || Roles.userIsInRole(this.userId, 'manager')) {
            if (!order.event || !order.event.peopleCount) {
                if(Meteor.isClient){
                    sAlert.warning("How many people are at the event? Can't calculate cost.")
                }
                return false
            }

            var people = order.event.peopleCount
            var totalWeight = 0
            var totalPrice = 0
            var totalPieces = 0
            var menu = MenuitemsInOrder.find({orderId: orderId})
            var chefsInOrder = []
            menu.forEach(function(item){
                totalWeight += item.weight * item.amount
                totalPrice += item.price * item.amount
                totalPieces += item.amount
                if (!_.contains(chefsInOrder, item.chefId))
                    chefsInOrder.push(item.chefId)
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
                    'chefsInOrder': chefsInOrder,
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
    },
    'menuitemInOrder--confirm': function(menuitemId) {
        check(menuitemId, String);
        check(this.userId, String)
        var menuitem = MenuitemsInOrder.findOne(menuitemId)
        if (Roles.userIsInRole(this.userId, 'manager') || menuitem.chefId === this.userId) {
            MenuitemsInOrder.update(menuitemId, {$set: {chefConfirmed: true}})
        }
    },
    'menuitemInOrder--removeConfirm': function(menuitemId) {
        check(menuitemId, String);
        check(this.userId, String)
        var menuitem = MenuitemsInOrder.findOne(menuitemId)
        if (Roles.userIsInRole(this.userId, 'manager') || menuitem.chefId === this.userId) {
            MenuitemsInOrder.update(menuitemId, {$set: {chefConfirmed: false}})
        }
    },
});
