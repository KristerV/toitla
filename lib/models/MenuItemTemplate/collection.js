MenuitemTemplates = new Mongo.Collection('menuitem_templates');
MenuitemTemplatesDeleted = new Mongo.Collection('menuitem_templates_deleted');

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("menuitem_templates", function(select){
            select = select || {}

            if (Roles.userIsInRole(this.userId, 'manager')) {
            } else if (Roles.userIsInRole(this.userId, 'chef')) {
                select.chefId = this.userId
            } else {
                throw new Meteor.Error('Please log in')
            }

            // Publish count for preloader
            return MenuitemTemplates.find(select)
        });
    }
});
