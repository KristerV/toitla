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
    'details.serviceType': {
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
