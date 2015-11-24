Meteor.startup(function(){
    MenuItemTemplates.update({priceClass: "class2"}, {$set: {priceClass: "class1"}}, {multi: true})
});
