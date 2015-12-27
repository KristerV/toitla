MenuitemsInOrder = new Mongo.Collection('menuitems_inorder');

Meteor.startup(function(){
    if (Meteor.isServer){
        Meteor.publish("menuitems_inorder", function(select){
            if (!select.orderId)
                throw new Meteor.Error("No orderId specified for menuitems_inorder")

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
            }
            if (Roles.userIsInRole(this.userId, 'manager')) {
                fields.foodType = 1
                fields.priceClass = 1
                fields.weight = 1
                fields.rejected = 1
                fields.originalSpecifications = 1
                fields.templateId = 1
            } else {
                select.rejected = {$ne: true}
            }

            // Publish count for preloader
            Counts.publish(this, 'MenuitemsInOrderCount', MenuitemsInOrder.find(select))
            return MenuitemsInOrder.find(select, {fields: fields})
        });
    }
});
