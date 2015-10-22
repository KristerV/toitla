Meteor.methods({
    generateFakeMenuitemTemplates: function(){
        if (process.env.NODE_ENV !== 'development') {
            return false
        }
        for (var i = 0; i < 10; i++) {
            var userId = Meteor.users.insert({
                roles: [ 'chef' ],
                profile: { name: Fake.sentence(2), vet: true },
                emails: [{address: Fake.word()+"@address.ee"}],
                address: Fake.sentence(2),
                companyCode: Fake.sentence(1),
                companyName: Fake.sentence(1),
                homepage: Fake.sentence(1),
                tel: Fake.sentence(1),
            });
            for (var j = 0; j < 10; j++) {
                var data = {
                    chefId: userId,
                    title: Fake.sentence(3),
                    ingredients: Fake.sentence(10),
                    weight: Fake.fromArray([10, 50 ,100, 150, 190, 210, 260, 280, 330, 390, 450]),
                    published: true,
                    tags: Fake.fromArray([Fake.fromArray(Settings.menuitemTags),Fake.fromArray(Settings.menuitemTags),Fake.fromArray(Settings.menuitemTags)],[],[Fake.fromArray(Settings.menuitemTags)]),
                    foodType: Fake.fromArray(Settings.foodTypes),
                    priceClass: Fake.fromArray(Settings.getKeys('priceClasses'))
                }
                MenuItemTemplates.insert(data)
            }
        }
    },
    removeAllMenuItemTemplates: function() {
        if (process.env.NODE_ENV !== 'development') {
            return false
        }
        MenuItemTemplates.remove({})
    },
    removeAllFakeUsers: function() {
        if (process.env.NODE_ENV !== 'development') {
            return false
        }
        Meteor.users.remove({services: {$exists: 0}})
    },
});
