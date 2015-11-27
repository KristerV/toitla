// Order extends Form!
Order = {
    schema: OrderPermissionSchema,
    collectionName: 'orders',

    createOrder: function(callback) {
        Meteor.call('createOrder', function(err, result){
			if (err)
				sAlert.error(err)
			FlowRouter.go("/neworder/"+result)
		})
    },

    delete: function() {
        var c = confirm('Kindel, et kustutan tellimuse igaveseks?')
        if (c) {
            Meteor.call('deleteOrder', this._id)
            FlowRouter.go('/ylevaade')
        }
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

    calculatePrice: function(itemId) {
        Meteor.call('menuitemInOrder--calculatePrice', this._id)
        $('#calculating-price-loader').addClass('force-visible')
    },

    nextFlowSection(currentIndex, nextFlowSection) {
        Meteor.call('NewOrderSections.nextSection', this._id, currentIndex, nextFlowSection)
    },

    submitForm() {
        Meteor.call('NewOrder.submitForm', this._id)
        FlowRouter.go("/")
    }

}
