
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
