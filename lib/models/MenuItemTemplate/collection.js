MenuitemTemplates = new Mongo.Collection('menuitem_templates');

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("menuitem_templates", function(select){
            select = select || {}

            if (Roles.userIsInRole(this.userId, 'manager')) {
            } else if (Roles.userIsInRole(this.userId, 'chef')) {
            } else {
                throw new Meteor.Error('Please log in')
            }

            // Publish count for preloader
            Counts.publish(this, 'MenuitemTemplatesCount', MenuitemTemplates.find(select))
            return MenuitemTemplates.find(select)
        });
    }
});
