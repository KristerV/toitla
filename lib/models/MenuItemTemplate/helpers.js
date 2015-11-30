MenuItemTemplates.helpers({
    validateDetails: function(onlyCheckThisField) {

        // Need to find new data - this cycle has not been updated
        var menuitem = MenuItemTemplates.findOne(this._id)
        var empty = "Palun täida ka see väli"
        var errors = {}
        var required = ['title', 'ingredients', 'foodType', 'priceClass', 'weight']

        required.forEach(function(field){
            if (!menuitem[field])
                errors[field] = empty
        })

        if (!errors['weight'] && (!Number(menuitem.weight) || menuitem.weight <= 0)) {
            errors['weight'] = "Kaal peab olema arv, grammides."
        }

        if (onlyCheckThisField) {
            var singleError = {}
            singleError['formErrors.' + onlyCheckThisField] = errors[onlyCheckThisField]
            MenuItemTemplates.update(this._id, {$set: singleError})
        } else {
            MenuItemTemplates.update(this._id, {$set: {formErrors: errors}})
        }
        var res = _.isEmpty(errors)
        return res
    },
    updateTemplatesCount: function() {
        Meteor.call('menuitemTemplate--countUpdate', this.chefId)
    }
})
