MenuitemsInOrder = new Mongo.Collection('menuitems_inorder');

Meteor.startup(function(){
    if (Meteor.isServer){
        Meteor.publish("menuitems_inorder", function(find) {

            if (!Roles.userIsInRole(this.userId, 'manager'))
                throw new Meteor.Error("Only managers can see MenuitemsInOrder")

            find = find || {}

            var fields = {
                chefId: 1,
                chefName: 1,
                ingredients: 1,
                inorder: 1,
                orderId: 1,
                published: 1,
                rand: 1,
                tags: 1,
                title: 1,
                amount: 1,
                dueDate: 1,
                orderStatus: 1,
            }
            if (Roles.userIsInRole(this.userId, 'manager')) {
                fields.foodType = 1
                fields.price = 1
                fields.weight = 1
                fields.rejected = 1
                fields.originalSpecifications = 1
                fields.templateId = 1
            } else {
                find.rejected = {$ne: true}
            }

            return MenuitemsInOrder.find(find, {fields: fields})
        });
    }
});
