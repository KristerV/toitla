MenuItemsInOrder = new Mongo.Collection('menuitems_inorder');

Meteor.startup(function(){
    if (Meteor.isServer){
        Meteor.publish("menuitems_inorder", function(select){
            select = select || {}

            if (Roles.userIsInRole(this.userId, 'manager')) {
            } else if (Roles.userIsInRole(this.userId, 'chef')) {
            } else {
                throw new Meteor.Error('Please log in')
            }

            // Publish count for preloader
            Counts.publish(this, 'MenuItemsInOrderCount', MenuItemsInOrder.find(select))
            return MenuItemsInOrder.find(select)
        });
    }
});
