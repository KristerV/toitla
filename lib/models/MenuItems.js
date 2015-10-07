MenuItems = new Mongo.Collection('menuitems');

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("menuitems", function(){
            var find = MenuItems.find()
            Counts.publish(this, 'menuitemsCount', find);
            return find
        });
    }
});

MenuItems.helpers({

})
