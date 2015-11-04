MenuItemsInOrder = new Mongo.Collection('menuitems_inorder');

Meteor.startup(function(){
    if (Meteor.isServer){
        Meteor.publish("menuitems_inorder", function(select){
            if (!select.orderId)
                throw new Meteor.Error("No orderId specified for menuitems_inorder")

            // Publish count for preloader
            Counts.publish(this, 'MenuItemsInOrderCount', MenuItemsInOrder.find(select))
            return MenuItemsInOrder.find(select)
        });
    }
});
