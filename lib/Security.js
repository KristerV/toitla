Security = {
    allowed : function (schema, userId, field, permission, doc) {
        var allowed = false
        var fieldArray = field.split('.')

        if (schema && schema.roles) {
            var a = schema.roles[permission]
            allowed = _.isFunction(a) ? a(doc) : a
        }

        _.each(fieldArray, function(f){

            if (schema) {
                if (!schema[f] && schema.hasOwnProperty(':_id')) {// pass over _id field
                    schema = schema[':_id']
                }
                else {
                    schema = schema[f]
                }
            }

            if (schema && schema.roles) {
                var a = schema.roles[permission]
                allowed = _.isFunction(a) ? a(doc) : a
            }
        })

        if (_.isBoolean(allowed))
            return allowed

        return Roles.userIsInRole(userId, allowed)
    },
}