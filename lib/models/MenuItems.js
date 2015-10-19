MenuItemTemplates = new Mongo.Collection('menuitem_templates');
MenuItemsInOrder = new Mongo.Collection('menuitems_inorder');

MenuItemTemplates.helpers({

})

MenuItemsInOrder.helpers({

})

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("menuitem_templates", function(options){
            var find = MenuItemTemplates.find(options)

            // If not a user
            if (!this.userId)
                return false

            // Publish count for preloader
            Counts.publish(this, 'MenuItemTemplatesCount', find)
            return find
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
