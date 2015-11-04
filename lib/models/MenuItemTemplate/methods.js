
Meteor.methods({
    'menuitemTemplate--new': function(chefId) {
        check(this.userId, String)
        check(chefId, String)
        if (this.userId === chefId || Roles.userIsInRole(this.userId, 'manager')) {
            MenuItemTemplates.insert({chefId: chefId, rand: Math.random()})
        } else {
            throw new Meteor.Error("You can't add menu items to strangers profiles.")
        }
    },
    'menuitemTemplate--switchTag': function(menuitemId, tag) {
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
    'menuitemTemplate--updateField': function(menuitemId, fieldName, fieldValue) {
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
        menuitem.validateDetails(fieldName)
    },
    'menuitemTemplate--publish': function(menuitemId) {
        Meteor.call('menuitemTemplate--togglePublish', this.userId, menuitemId, true)
    },
    'menuitemTemplate--unpublish': function(menuitemId) {
        Meteor.call('menuitemTemplate--togglePublish', this.userId, menuitemId, false)
    },
    'menuitemTemplate--togglePublish': function(userId, menuitemId, value) {
        check(userId, String)
        check(menuitemId, String)
        check(value, Boolean)
        var menuitem = MenuItemTemplates.findOne(menuitemId)
        if (menuitem && (menuitem.validateDetails() || menuitem.published) && (menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager'))) {
            MenuItemTemplates.update(menuitemId, {$set: {published: value}})
        }
    },
    'menuitemTemplate--delete': function(menuitemId) {
        check(this.userId, String)
        check(menuitemId, String)
        var menuitem = MenuItemTemplates.findOne(menuitemId)
        if (menuitem && !menuitem.published && menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) {
            MenuItemTemplates.remove(menuitemId)
        }
    },
});
