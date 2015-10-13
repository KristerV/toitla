MenuItems = new Mongo.Collection('menuitems');

MenuItems.helpers({

})

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("menuitems", function(options){
            var find = MenuItems.find(options)
            Counts.publish(this, 'menuitemsCount', find)
            return find
        });
    }
});
