moment.locale('et');

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
    getFullUrl(route, params) {
        if(Meteor.isClient){
            return Meteor.absoluteUrl().slice(0, -1) + FlowRouter.path(route, params)
        } else {
            return Meteor.absoluteUrl().slice(0, -1) + route
        }

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
        var empty = "Palun täida ka see väli"
        var errors = {}

        // Need to find new data - old info provided in arguments
        var menuitem = menuitem.inorder ? MenuitemsInOrder.findOne(menuitem._id) : MenuitemTemplates.findOne(menuitem._id)

        // Check required
        var required = onlyCheckThisField ? [onlyCheckThisField] : ['title', 'ingredients', 'foodType', 'price', 'weight']
        if (menuitem.inorder)
            required.push('amount')
        required.forEach(function(field){
            if (!menuitem[field])
                errors[field] = empty
        })

        // Check numbers
        var mustBeNumber = ['weight', 'price']
        if (menuitem.inorder)
            mustBeNumber = _.union(mustBeNumber, ['amount'])
        if (onlyCheckThisField)
            mustBeNumber = _.filter(mustBeNumber, function(item){ return item === onlyCheckThisField });
        mustBeNumber.forEach(function(field){
            if (!errors[field] && (!Number(menuitem[field]) || menuitem[field] <= 0))
                errors[field] = "Use a number (decimals with \".\" dot)"
        })

        // Save
        if (onlyCheckThisField) {
            var singleError = {}
            singleError['formErrors.' + onlyCheckThisField] = errors[onlyCheckThisField]
            MenuitemTemplates.update(menuitem._id, {$set: singleError})
        } else {
            MenuitemTemplates.update(menuitem._id, {$set: {formErrors: errors}})
        }
        var res = _.isEmpty(errors)
        return res
    },
    print() {
        // To print something you need to have two divs
        // .printable-container
        //      .printable-content
        //          <content/>
         var printContents = document.getElementById('printable-container').innerHTML;
         $('body').append(printContents)
         window.print();
         $('body > #printable-content').remove()
    },
}
