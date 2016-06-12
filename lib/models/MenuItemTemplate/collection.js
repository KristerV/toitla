MenuitemTemplates = new Mongo.Collection('menuitem_templates');
MenuitemTemplatesDeleted = new Mongo.Collection('menuitem_templates_deleted');

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("menuitem_templates", function(select, options){
            select = select || {}
            options = options || {}

            if (Roles.userIsInRole(this.userId, 'manager')) {
            } else if (Roles.userIsInRole(this.userId, 'chef')) {
                select.chefId = this.userId
            } else {
                throw new Meteor.Error('Please log in')
            }

            options.fields = {
                'history.history': 0,
                'history._id': 0,
                'history.chefId': 0,
                'history.rand': 0,
                'history.title': 0,
                'history.formErrors': 0,
                'history.foodType': 0,
                'history.ingredients': 0,
                'history.image': 0,
            }

            // Publish count for preloader
            return MenuitemTemplates.find(select, options)
        });
    }
});
