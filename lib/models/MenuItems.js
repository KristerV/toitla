MenuItemTemplates = new Mongo.Collection('menuitem_templates');
MenuItemsInOrder = new Mongo.Collection('menuitems_inorder');

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
        console.log(res);
        return res
    }
})

MenuItemsInOrder.helpers({

})

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("menuitem_templates", function(){
            var select
            var options

            if (Roles.userIsInRole(this.userId, 'manager')) {
                select = {}
            } else if (Roles.userIsInRole(this.userId, 'chef')) {
                select = {chefId: this.userId}
            } else {
                throw new Meteor.Error('Please log in')
            }

            // Publish count for preloader
            Counts.publish(this, 'MenuItemTemplatesCount', MenuItemTemplates.find(select))
            return MenuItemTemplates.find(select)
        });
        Meteor.publish("menuitems_inorder", function(options){
            var find = MenuItemsInOrder.find(options)

            // If not a user
            if (!this.userId)
                return false

            // Publish count for preloader
            Counts.publish(this, 'MenuItemsInOrderCount', find)
            return find
        });
    }
});

Meteor.methods({
    newMenuitemTemplate: function(chefId) {
        check(this.userId, String)
        check(chefId, String)
        if (this.userId === chefId || Roles.userIsInRole(this.userId, 'manager')) {
            MenuItemTemplates.insert({chefId: chefId})
        } else {
            throw new Meteor.Error("You can't add menu items to strangers profiles.")
        }
    },
    switchMenuitemTag: function(menuitemId, tag) {
        check(this.userId, String)
        check(menuitemId, String)
        check(tag, String)
        var menuitem = MenuItemTemplates.findOne(menuitemId)
        if (menuitem && !menuitem.published && menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) {
            if (_.contains(menuitem.tags, tag)) {
                MenuItemTemplates.update(menuitemId, {$pull: {tags: tag}})
            } else {
                MenuItemTemplates.update(menuitemId, {$push: {tags: tag}})
            }
        }
    },
    'menuitem--updateField': function(menuitemId, fieldName, fieldValue) {
        check(menuitemId, String)
        check(fieldName, String)
        check(fieldValue, Match.OneOf(String, null))
        check(this.userId, String)
        var menuitem = MenuItemTemplates.findOne(menuitemId)
        if (menuitem && !menuitem.published && menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) {
            var data = {}
            data[fieldName] = fieldValue
            MenuItemTemplates.update(menuitemId, {$set: data})
        }
        menuitem.validateDetails()
    },
    publishMenuitem: function(menuitemId) {
        Meteor.call('toggleMenuitemPublish', this.userId, menuitemId, true)
    },
    unpublishMenuitem: function(menuitemId) {
        Meteor.call('toggleMenuitemPublish', this.userId, menuitemId, false)
    },
    toggleMenuitemPublish: function(userId, menuitemId, value) {
        check(userId, String)
        check(menuitemId, String)
        check(value, Boolean)
        var menuitem = MenuItemTemplates.findOne(menuitemId)
        if (menuitem && menuitem.validateDetails() && menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) {
            MenuItemTemplates.update(menuitemId, {$set: {published: value}})
        }
    },
    deleteMenuitem: function(menuitemId) {
        check(this.userId, String)
        check(menuitemId, String)
        var menuitem = MenuItemTemplates.findOne(menuitemId)
        if (menuitem && !menuitem.published && menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) {
            MenuItemTemplates.remove(menuitemId)
        }
    },
});
