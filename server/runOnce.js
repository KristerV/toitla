Meteor.startup(function(){
    var items = MenuItemTemplates.find()
    items.forEach(function(item){
        if (item.tags && item.tags.length > 0 && !_.isObject(item.tags[0])) {
            var newTags = []
            var oldTags = item.tags
            for (var i = 0; i < oldTags.length; i++) {
                var newTag = Settings.findByKey('menuitemTags', 'name', oldTags[i])
                newTags.push(newTag)
            }
            MenuItemTemplates.update(item._id, {$set: {tags: newTags}})
        }
    })
});
