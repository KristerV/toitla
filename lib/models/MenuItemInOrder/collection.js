MenuitemsInOrder = new Mongo.Collection('menuitems_inorder');

Meteor.startup(function(){
    if (Meteor.isServer){
        Meteor.publish("menuitems_inorder", function(orderId) {

            if (!this.userId)
                throw new Meteor.Error("Only users can see MenuitemsInOrder")

            find = {dontFindANything: true}
            fields = {dontShowAnything: 1}

            if (Roles.userIsInRole(this.userId, 'manager')) {
                find = {}
                fields = {}
            } else if (Roles.userIsInRole(this.userId, 'chef')) {
                find = { chefId: this.userId} // TODONOW et kokk näeks endaga seotud menuitemeid
                fields = {
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
            }

            return MenuitemsInOrder.find(find, {fields: fields})
        });
    }
});
