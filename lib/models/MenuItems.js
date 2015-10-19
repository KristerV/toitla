MenuItemTemplates = new Mongo.Collection('menuitem_templates');
MenuItemsInOrder = new Mongo.Collection('menuitems_inorder');

MenuItemTemplates.helpers({

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
    newMenuItemTemplate: function(chefId) {
        if (this.userId === chefId || Roles.userIsInRole(this.userId, 'manager')) {
            MenuItemTemplates.insert({chefId: chefId})
        } else {
            throw new Meteor.Error("You can't add menu items to strangers profiles.")
        }
    }
});
