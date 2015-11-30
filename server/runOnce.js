// Convert ObjectIds it strings
// Meteor.startup(function(){
//     var items = MenuItemTemplates.find()
//     items.forEach(function(item){
//         if (!_.isString(item._id)) {
//             MenuItemTemplates.remove(item._id)
//             delete item._id
//             MenuItemTemplates.insert(item)
//         }
//
//     })
// });

// fix tags from arrays to objects
// Meteor.startup(function(){
//     var items = MenuItemTemplates.find()
//     items.forEach(function(item){
//         if (item.tags && item.tags.length > 0 && !_.isObject(item.tags[0])) {
//             var newTags = []
//             var oldTags = item.tags
//             for (var i = 0; i < oldTags.length; i++) {
//                 var newTag = Settings.findByKey('menuitemTags', 'name', oldTags[i])
//                 newTags.push(newTag)
//             }
//             MenuItemTemplates.update(item._id, {$set: {tags: newTags}})
//         }
//     })
// });
