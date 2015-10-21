MenuItemTemplates.helpers({
    validateDetails: function() {

        // Need to find new data - this cycle has not been updated
        var menuitem = MenuItemTemplates.findOne(this._id)
        var empty = "Palun täida ka see väli"
        var errors = {}
        var required = ['title', 'ingredients', 'foodType', 'priceClass', 'weight']

        required.forEach(function(field){
            if (!menuitem[field])
                errors[field] = empty
        })

        if (!errors['weight'] && (!menuitem.weight.match(/[0-9]{2,}/g) || menuitem.weight.match(/[0-9]{2,}/g).length !== 1)) {
            errors['weight'] = "Kaal peab olema arv, grammides."
        }
        MenuItemTemplates.update(this._id, {$set: {formErrors: errors}})
        var res = _.isEmpty(errors)
        return res
    }
})
