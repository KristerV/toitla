// Order extends Form!
Order = {
    schema: OrderPermissionSchema,
    collectionName: 'orders',

    createOrder: function(callback) {
        Meteor.call('createOrder', function(err, result){
			if (err)
				sAlert.error(err)
			FlowRouter.go("/tellimus/"+result)
		})
    },

    delete: function() {
        var c = confirm('Kindel, et kustutan tellimuse igaveseks?')
        if (c) {
            Meteor.call('deleteOrder', this._id)
            FlowRouter.go('/ylevaade')
        }
    },

    calculatePrice: function() {
        Meteor.call('calculatePrice', this._id)
    },

    refreshMenu: function() {
        Meteor.call('menuitemInOrder--refreshOrder', this._id)
    },

    switchItem: function(itemId) {
        Meteor.call('menuitemInOrder--switchItem', itemId)
    },

    nextFlowSection(currentIndex, nextFlowSection) {
        Meteor.call('NewOrderSections.nextSection', this._id, currentIndex, nextFlowSection)
    },

}
