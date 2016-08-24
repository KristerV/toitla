MenuitemsInOrder = new Mongo.Collection('menuitems_inorder');

Meteor.startup(function(){
    if (Meteor.isServer){
        Meteor.publish("menuitems_inorder", function(find, options) {

            if (!this.userId)
                throw new Meteor.Error("Only users can see MenuitemsInOrder")

            find = find || {}
            options = options || {}
            options.fields = options.fields || {}

            if (Roles.userIsInRole(this.userId, 'chef')) {
                find.chefId = this.userId
                options.fields = {
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
                    foodType: 1,
                    price: 1,
                    weight: 1,
                    templateId: 1,
                    chefConfirmed: 1,
                }
            } else {
                options.fields.history = 0
            }

            return MenuitemsInOrder.find(find, options)
        });
    }
});
