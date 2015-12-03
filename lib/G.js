G = {
    strlen(str, len) {
        while (str.length < len) {
            str = " " + str
        }
        return str
    },
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    error(msg) {
        console.error(msg)
        var e = new Error(msg);
        var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
          .replace(/^\s+at\s+/gm, '')
          .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
          .split('\n');
          console.info(stack)
    },
    validateDetails: function(menuitem, onlyCheckThisField) {

        // Need to find new data - old info provided in arguments
        var menuitem = menuitem.inorder ? MenuItemsInOrder.findOne(menuitem._id) : MenuItemTemplates.findOne(menuitem._id)
        var empty = "Palun täida ka see väli"
        var errors = {}
        var required = onlyCheckThisField ? [onlyCheckThisField] : ['title', 'ingredients', 'foodType', 'priceClass', 'weight', 'amount']

        required.forEach(function(field){
            if (!menuitem[field])
                errors[field] = empty
        })

        var mustBeNumber = onlyCheckThisField ? [onlyCheckThisField] : ['weight', 'amount']
        mustBeNumber.forEach(function(field){
            if (!errors[field] && (!Number(menuitem[field]) || menuitem[field] <= 0))
                errors[field] = "Must be number only"
        })

        if (onlyCheckThisField) {
            var singleError = {}
            singleError['formErrors.' + onlyCheckThisField] = errors[onlyCheckThisField]
            MenuItemTemplates.update(menuitem._id, {$set: singleError})
        } else {
            MenuItemTemplates.update(menuitem._id, {$set: {formErrors: errors}})
        }
        var res = _.isEmpty(errors)
        return res
    }
}
