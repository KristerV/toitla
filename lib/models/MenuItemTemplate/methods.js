
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
    'menuitemTemplate--switchTag': function(menuitemId, tagName) {
        check(this.userId, String)
        check(menuitemId, String)
        check(tagName, String)
        var menuitem = MenuItemTemplates.findOne(menuitemId)
        var tag = Settings.findByKey('menuitemTags', 'name', tagName)
        if (menuitem && !menuitem.published && menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) {
            if (_.findWhere(menuitem.tags, tag)) {
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
        if (menuitem &&
            !menuitem.published &&
            !menuitem.inorder &&
            (menuitem.chefId === this.userId ||
            Roles.userIsInRole(this.userId, 'manager'))
        )
        {
            var data = {}
            data[fieldName] = fieldValue
            MenuItemTemplates.update(menuitemId, {$set: data})
        }
        menuitem.validateDetails(fieldName)
    },
    'menuitemTemplate--publish': function(menuitemId) {
        Meteor.call('menuitemTemplate--togglePublish', menuitemId, true)
    },
    'menuitemTemplate--unpublish': function(menuitemId) {
        Meteor.call('menuitemTemplate--togglePublish', menuitemId, false)
    },
    'menuitemTemplate--togglePublish': function(menuitemId, value) {
        check(this.userId, String)
        check(menuitemId, String)
        check(value, Boolean)
        var menuitem = MenuItemTemplates.findOne(menuitemId)
        if (menuitem && (menuitem.validateDetails() || menuitem.published) && (menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager'))) {
            MenuItemTemplates.update(menuitemId, {$set: {published: value}})
        }
        menuitem.updateTemplatesCount()
    },
    'menuitemTemplate--delete': function(menuitemId) {
        check(this.userId, String)
        check(menuitemId, String)
        var menuitem = MenuItemTemplates.findOne(menuitemId)
        if (menuitem && !menuitem.published && menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) {
            MenuItemTemplates.remove(menuitemId)
        }
        menuitem.updateTemplatesCount()
    },
    'menuitemTemplate--countUpdate': function(userId) {
        check(userId, String);
        var items = MenuItemTemplates.find({chefId: userId, published: true}).fetch()
        Meteor.users.update(userId, {$set: {menuCount: items.length}})
    }
});
