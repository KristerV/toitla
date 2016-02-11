
Meteor.methods({
    'menuitemTemplate--new': function(chefId) {
        check(this.userId, String)
        check(chefId, String)
        if (this.userId === chefId || Roles.userIsInRole(this.userId, 'manager')) {
            MenuitemTemplates.insert({chefId: chefId, rand: Math.random(), createdAt: new Date()})
        } else {
            throw new Meteor.Error("You can't add menu items to strangers profiles.")
        }
    },
    'menuitemTemplate--switchTag': function(menuitemId, tagName) {
        check(this.userId, String)
        check(menuitemId, String)
        check(tagName, String)
        var menuitem = MenuitemTemplates.findOne(menuitemId)
        var tag = Settings.findByKey('menuitemTags', 'name', tagName)
        if (menuitem && !menuitem.published && menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) {
            if (_.findWhere(menuitem.tags, tag)) {
                MenuitemTemplates.update(menuitemId, {$pull: {tags: tag}})
            } else {
                MenuitemTemplates.update(menuitemId, {$push: {tags: tag}})
            }
        }
    },
    'menuitemTemplate--updateField': function(menuitemId, fieldName, fieldValue, pushToArray) {
        check(menuitemId, String)
        check(fieldName, String)
        check(fieldValue, Match.OneOf(String, null, {date: Date, price: String}))
        check(pushToArray, Match.Optional(Boolean))
        check(this.userId, String)
        var menuitem = MenuitemTemplates.findOne(menuitemId)
        var isManager = Roles.userIsInRole(this.userId, 'manager')
        if (menuitem &&
            (!menuitem.published || (fieldName === 'managerComments' && isManager)) &&
            !menuitem.inorder &&
            (menuitem.chefId === this.userId ||
            isManager)
        ) {
            var data = {}
            data[fieldName] = Number(fieldValue) || fieldValue // convert to number if possible
            if (pushToArray)
                MenuitemTemplates.update(menuitemId, {$addToSet: data})
            else
                MenuitemTemplates.update(menuitemId, {$set: data})
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
        var menuitem = MenuitemTemplates.findOne(menuitemId)
        if (menuitem && (menuitem.validateDetails() || menuitem.published) && (menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager'))) {
            if (value) {
                menuitem.lastedUntil = new Date()
                MenuitemTemplates.update(menuitemId, {$set: {published: true}, $addToSet: {history: menuitem}})
            } else {
                MenuitemTemplates.update(menuitemId, {$set: {published: false}})
            }
        }
        menuitem.updateTemplatesCount()
    },
    'menuitemTemplate--delete': function(menuitemId) {
        check(this.userId, String)
        check(menuitemId, String)
        var menuitem = MenuitemTemplates.findOne(menuitemId)
        if (menuitem && !menuitem.published && menuitem.chefId === this.userId || Roles.userIsInRole(this.userId, 'manager')) {
            MenuitemTemplates.remove(menuitemId)
            MenuitemTemplatesDeleted.insert(menuitem)
        }
        menuitem.updateTemplatesCount()
    },
    'menuitemTemplate--countUpdate': function(userId) {
        check(userId, String);
        var items = MenuitemTemplates.find({chefId: userId, published: true}).fetch()
        Meteor.users.update(userId, {$set: {menuCount: items.length}})
    }
});
