MenuItemsInOrder = new Mongo.Collection('menuitems_inorder');

Meteor.startup(function(){
    if(Meteor.isServer){
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
