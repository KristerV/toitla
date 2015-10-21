MenuItemTemplates = new Mongo.Collection('menuitem_templates');

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
    }
});
