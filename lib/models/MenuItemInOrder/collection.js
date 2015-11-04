MenuItemsInOrder = new Mongo.Collection('menuitems_inorder');

Meteor.startup(function(){
    if (Meteor.isServer){
        Meteor.publish("menuitems_inorder", function(select){
            if (!select.orderId)
                throw new Meteor.Error("No orderId specified for menuitems_inorder")
            console.log(select);

            // Publish count for preloader
            Counts.publish(this, 'MenuItemsInOrderCount', MenuItemsInOrder.find(select))
            console.log(MenuItemsInOrder.find(select).fetch());
            return MenuItemsInOrder.find(select)
        });
    }
});
