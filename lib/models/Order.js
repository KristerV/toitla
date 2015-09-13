
Orders = new Mongo.Collection('orders', {transform: function(doc){
    doc.__proto__ = Order;
    return doc;
}});

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("orders", function(orderId){

            var fields = {submitted: 1, 'status': 1}
            var find = {dontFindAny: true}
            if (!this.userId) {
                fields['details'] = 1
                fields['contact'] = 1
                find = {
                    _id: orderId,
                    submitted: false
                }
            }

            if (Roles.userIsInRole(this.userId, ['manager'])) {
                fields['details'] = 1
                fields['contact'] = 1
                fields['suborders'] = 1
                find = {}
            }
            if (Roles.userIsInRole(this.userId, ['chef'])) {
                var suborders = Suborders.find({currentChefId: this.userId}).fetch()
                var suborderIds = _.map(suborders, function(suborder){
                    return suborder.orderId
                })
                find = {_id: {$in: suborderIds}}
            }
            return Orders.find(find, {fields: fields})
        });
    }
});

OrderSchema = {
    'details.peopleCount': {
        required: true,
        type: Number,
    },
    'details.mealCount': {
        required: true,
        type: Number,
    },
    'details.location': {
        required: true,
    },
    'details.fromDate': {
        required: true,
    },
    'details.fromTime': {
        required: true,
    },
    'details.toTime': {
        required: true,
    },
    'contact.name': {
        required: true,
    },
    'contact.number': {
        required: true,
    },
    'contact.email': {
        required: true,
    },
}

OrderPermissionSchema = {
    submitted: {
        roles: {
            edit: function(order) {
                if (order.submitted)
                    return ['manager']
                else if (order.submitted === false)
                    return true
            },
            view: function(order) {
                if (order.submitted)
                    return ['manager']
                else if (order.submitted === false)
                    return true
            },
        }
    },
    status: {
        roles: {
            edit: ['manager'],
            view: ['manager', 'chef'],
        }
    },
    details: {
        roles: {
            edit: function(order) {
                if (order.submitted)
                    return ['manager']
                else if (order.submitted === false)
                    return true
            },
            view: function(order) {
                if (order.submitted)
                    return ['manager']
                else if (order.submitted === false)
                    return true
            },
        }
    },
    contact: {
        roles: {
            edit: function(order) {
                if (order.submitted)
                    return ['manager']
                else if (order.submitted === false)
                    return true
            },
            view: function(order) {
                if (order.submitted)
                    return ['manager']
                else if (order.submitted === false)
                    return true
            },
        }
    },
    suborders: {
        roles: {
            edit: ['manager'],
            view: ['manager', 'chef'],
        },
    },
}

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
        if (c)
            Meteor.call('deleteOrder', this._id)
        FlowRouter.go('/ylevaade')
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

        if (isFormValid) {
            Meteor.call('submitInitialForm', this._id, this.details.calculatedPrice, function(err){
                if (err)
                    sAlert.error(err.reason)
                FlowRouter.go("/?showDialog=orderSentDialog")
            })
        }
    },

}

Meteor.methods({
    createOrder: function() {
        return Orders.insert({
            createdAt: new Date,
            submitted: false,
            status: {
                phase: Object.keys(Settings.phases)[0],
            },
            details: {
                calculatedPrice: 0
            },
            contact: {},
            suborders: []
        })
    },
    deleteOrder: function(orderId) {
        if (Roles.userIsInRole(this.userId, 'manager'))
            Orders.remove(orderId)
    },
});
