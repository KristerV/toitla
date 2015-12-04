// Order extends Form!
Order = {
    schema: OrderPermissionSchema,
    collectionName: 'orders',

    createOrder: function(callback) {
        Meteor.call('createOrder', function(err, result){
			if (err)
				sAlert.error(err)
            else if (Meteor.user().isManager())
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

    refreshMenu: function() {
        Meteor.call('menuitemInOrder--refreshOrder', this._id)
        Meteor.setTimeout(function(){
            $('#calculating-price-loader').addClass('force-visible')
        }, 50);
    },

    switchItem: function(itemId) {
        Meteor.call('menuitemInOrder--switchItem', itemId)
        $('#calculating-price-loader').addClass('force-visible')
    },

    calculateTotals: function(itemId) {
        Meteor.call('menuitemInOrder--calculateTotals', this._id)
        $('#calculating-price-loader').addClass('force-visible')
    },

    nextFlowSection(currentIndex, nextFlowSection) {
        Meteor.call('NewOrderSections.nextSection', this._id, currentIndex, nextFlowSection)
    },

    submitForm() {
        Meteor.call('NewOrder.submitForm', this._id)
    },

    removeAllMenuitems() {
        Meteor.call('menuitemInOrder--removeAll', this._id)
    }

}
