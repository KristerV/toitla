// Convert chefsInOrder array to chefs detailed objects array
Meteor.startup(function(){
    var orders = Orders.find()
    orders.forEach(order => {
        if (!order.chefsInOrder) return
        var chefs = []
        console.info("CONVERT CHEFS IN ORDER: ", order._id);
        order.chefsInOrder.forEach(chefInOrder => {
            var existingChef = _.findWhere(order.chefs, {_id: chefInOrder})
            if (existingChef) {
                chefs.push(existingChef)
            } else {
                chefs.push({_id: chefInOrder})
            }
        });
        Orders.update(order._id, {$set: {chefs: chefs}, $unset: {chefsInOrder: 1}})
    })
});

// Enabling array-addresses for users
// Meteor.startup(function(){
//     var items = Meteor.users.find()
//     items.forEach(user => {
//         var address = user.profile ? user.profile.address : null
//         if (!address || user.profile.locations) return
//         console.info("LOCATION", address, user.profile.name);
//         Meteor.users.update(user._id, {$addToSet: {'profile.locations': {_id: Random.id(), address: address}}})
//     })
// });

// Remove orphan menuitems in order
// Meteor.startup(function(){
//     var items = MenuitemsInOrder.find()
//     items.forEach(item => {
//         var order = Orders.findOne(item.orderId)
//         if (!order)
//             MenuitemsInOrder.remove(item._id)
//     })
// });

// Add chefsInOrder to order
// Meteor.startup(function(){
//     var items = MenuitemsInOrder.find()
//     items.forEach(item => {
//         Orders.update(item.orderId, {$addToSet: {chefsInOrder: item.chefId}})
//     })
// });

// Add orderStatus to menuiteminorder
// Meteor.startup(function(){
//     var items = MenuitemsInOrder.find()
//     items.forEach(function(item){
//         if (!item.orderStatus) {
//             var order = Orders.findOne(item.orderId)
//             if (order)
//                 MenuitemsInOrder.update(item._id, {$set: {orderStatus: order.status.phase}})
//             else
//                 MenuitemsInOrder.remove(item._id) // remove without order
//         }
//     })
// });

// Add dueDate to menuiteminorder
// Meteor.startup(function(){
//     var items = MenuitemsInOrder.find()
//     items.forEach(function(item){
//         if (!item.dueDate) {
//             var order = Orders.findOne(item.orderId)
//             if (order)
//                 MenuitemsInOrder.update(item._id, {$set: {dueDate: order.event.fromDate}})
//             else
//                 MenuitemsInOrder.remove(item._id) // remove without order
//         }
//     })
// });

// Convert price from , to .
// Meteor.startup(function(){
//     var items = MenuitemsInOrder.find()
//     items.forEach(function(item){
//         if (item.price && !Number(item.price) && item.price.indexOf(',') !== -1) {
//             var newPrice = Number(item.price.replace(/,/g , "."))
//             MenuitemsInOrder.update(item._id, {$set: {price: newPrice}})
//         }
//     })
//     var items = MenuitemTemplates.find()
//     items.forEach(function(item){
//         if (item.price && !Number(item.price) && item.price.indexOf(',') !== -1) {
//             var newPrice = Number(item.price.replace(/,/g , "."))
//             MenuitemTemplates.update(item._id, {$set: {price: newPrice}})
//         }
//     })
// });

// Convert priceClass to freetext price
// Meteor.startup(function(){
//     var items = MenuitemTemplates.find()
//     items.forEach(function(item){
//         var price = Settings.priceClasses[item.priceClass]
//         if (price) {
//             MenuitemTemplates.update(item._id, {$set: {price: price}})
//             MenuitemsInOrder.update({templateId: item._id}, {$set: {price: price}}, {multi: true})
//         }
//     })
// });

// Convert weight info to number
// Meteor.startup(function(){
//     var items = MenuitemTemplates.find()
//     items.forEach(function(item){
//         if (_.isString(item.weight)) {
//             if (item.weight && item.weight.match(/\d+/).length > 0) {
//                 var newWeight = Number(item.weight.match(/\d+/)[0])
//                 MenuitemTemplates.update(item._id, {$set: {weight: newWeight}})
//             }
//         }
//     })
// });

// Convert ObjectIds it strings
// Meteor.startup(function(){
//     var items = MenuitemTemplates.find()
//     items.forEach(function(item){
//         if (!_.isString(item._id)) {
//             MenuitemTemplates.remove(item._id)
//             delete item._id
//             MenuitemTemplates.insert(item)
//         }
//     })
// });

// fix tags from arrays to objects
// Meteor.startup(function(){
//     var items = MenuitemTemplates.find()
//     items.forEach(function(item){
//         if (item.tags && item.tags.length > 0 && !_.isObject(item.tags[0])) {
//             var newTags = []
//             var oldTags = item.tags
//             for (var i = 0; i < oldTags.length; i++) {
//                 var newTag = Settings.findByKey('menuitemTags', 'name', oldTags[i])
//                 newTags.push(newTag)
//             }
//             MenuitemTemplates.update(item._id, {$set: {tags: newTags}})
//         }
//     })
// });
