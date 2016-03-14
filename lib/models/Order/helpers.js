// Order extends Form!
Order = {
    collectionName: 'orders',

    createOrder: function(callback) {
        Meteor.call('createOrder', function(err, result){
			if (err)
				sAlert.error(err)
            else if (Roles.userIsInRole(Meteor.userId(), 'manager'))
			    FlowRouter.go("/order/"+result)
            else
			    FlowRouter.go("/neworder/"+result)
		})
    },

    delete: function() {
        if (this.contact && this.contact.email && !confirm("This order has an email, are you sure you want to delete it?")) {
            return false
        }
        Meteor.call('deleteOrder', this._id)
        FlowRouter.go('/orders')
    },

    switchItem: function(itemId) {
        Meteor.call('menuitemInOrder--switchItem', itemId)
        $('#calculating-price-loader').addClass('force-visible')
    },

    calculateTotals: function(itemId) {
        Meteor.call('menuitemInOrder--calculateTotals', this._id)
        $('#calculating-price-loader').addClass('force-visible')
    },

    submitForm() {
        Meteor.call('NewOrder.submitForm', this._id, (err, result) => {
            if (err)
                console.error(err)
        })

        if (!Meteor.userId())
            FlowRouter.go("submitted")
        else
            FlowRouter.go("order", {orderId: this._id})
    },

    removeAllMenuitems() {
        Meteor.call('menuitemInOrder--removeAll', this._id)
    },

    isSubmitted() {
        return !!this.status && this.status[0] && this.status[0].checked
    },

    isStatusChecked(name) {
        var result = false
        if (!this.status) return false
        this.status.forEach(stat => {
            if (stat.text === name && stat.checked)
                result = true
        })
        return result
    },

    isChefInOrder(chefId) {
        var result = false
        if (this.chefs) {
            this.chefs.forEach(item => {
                if (item._id === chefId)
                    result = true
            })
        }
        return result
    },
    showMenuToChef() {
        var result = false

        // finished orders that chef isn't part of are not published anyway
        if (this.result && this.result.result)
            return true
        this.status.forEach(stat => {
            if (stat.text === Settings.checklistReserved.openChefConfirmations && stat.checked)
                result = true
        })
        return result
    },
    highlightForChef(chefId) {
        var appropriateStatus = false
        var chefIsInOrder = false
        if (this.status) {
            this.status.forEach(stat => {
                if (_.contains([Settings.checklistReserved.openChefConfirmations, 'Ready for event'], stat.text) && stat.checked)
                    appropriateStatus = true
                else if (stat.checked) // only highlight the two statuses
                    appropriateStatus = false
            })
        }
        if (this.chefs) {
            this.chefs.forEach(chef => {
                if (chef._id === chefId)
                    chefIsInOrder = true
            })
        }
        return appropriateStatus && chefIsInOrder
    },
    resetDriverInfo(callback) {
        Meteor.call('Order--resetDriverInfo', this._id, callback)
    },
    getAllergies() {
        let allergies = ""
        if (this.allergies && this.allergies.host)
            allergies += this.allergies.host + "; "
        if (this.allergies && this.allergies.guests)
            allergies += this.allergies.guests.join("; ")
        return allergies
    }

}
