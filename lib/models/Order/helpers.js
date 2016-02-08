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
            else
                FlowRouter.go("submitted")
        })
    },

    removeAllMenuitems() {
        Meteor.call('menuitemInOrder--removeAll', this._id)
    },

    isSubmitted() {
        return !!this.status && this.status.phase !== 'unsubmitted'
    },

    isPhaseAchieved(phase) {
        var currentIndex = Settings.getIndexOfSetting('phases', this.status.phase)
        var targetIndex = Settings.getIndexOfSetting('phases', phase)
        return currentIndex >= targetIndex
    }

}
