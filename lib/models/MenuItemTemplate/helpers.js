MenuitemTemplates.helpers({
    validateDetails: function(onlyCheckThisField) {
        return G.validateDetails(this, onlyCheckThisField)
    },
    updateTemplatesCount: function() {
        Meteor.call('menuitemTemplate--countUpdate', this.chefId)
    }
})
