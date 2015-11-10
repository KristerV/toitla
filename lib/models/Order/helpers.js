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

    createSuborder: function(callback) {
        Suborder.create(this._id)
    },

    removeSuborder: function(arrayName, arrayId, callback) {
        TODO()
    },

    calculatePrice: function() {
        Meteor.call('calculatePrice', this._id)
    },

    submitForm: function(_this) {
        if (this.submitted)
            return false
        var isFormValid = true
        var state = {}

        _.each(OrderSchema, function(rules, field){

            // Get field value
            var fieldValue = this
            _.each(field.split('.'), function(v){
                if (fieldValue)
                    fieldValue = fieldValue[v]
            })

            // Validation required
            if (rules.required && !fieldValue) {
                state[field] = "Palun täida ka see väli ära"
                isFormValid = false
                return false
            }

            // Validation Type
            if (!!rules.type) {
                if (rules.type === Number && !parseInt(fieldValue)) {
                    state[field] = "Siia käib number"
                    isFormValid = false
                    return false
                }
            }

            // Validation passed
            state[field] = null

        }.bind(this))
        _this.setState(state)

        if (isFormValid || Roles.userIsInRole(Meteor.userId(), 'manager')) {
            Meteor.call('submitInitialForm', this._id, this.details.calculatedPrice, function(err){
                if (err)
                    sAlert.error(err.reason)
                if (!Roles.userIsInRole(Meteor.userId(), 'manager'))
                  FlowRouter.go("/?showDialog=orderSentDialog")
            })
        }
    },

}
