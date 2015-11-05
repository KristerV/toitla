FakeData = {
    generateFakeMenuitemTemplates: function(){
        Security.devOnly()
        for (var i = 0; i < 10; i++) {
            var rand = !!parseInt(Math.random() * 3)
            var userId = Meteor.users.insert({
                roles: [ 'chef' ],
                profile: {
                    name: rand ? Fake.sentence(2) : null,
                    vet: rand ? true : null,
                    address: Fake.sentence(2),
                    companyCode: rand ? Fake.sentence(1) : null,
                    companyName: rand ? Fake.sentence(1) : null,
                    homepage: Fake.sentence(1),
                    tel: Fake.sentence(1),
                },
                eligible: rand ? true : false,
                manualRating: parseInt( Math.random() * 5 ),
                acceptanceScore: parseInt( Math.random() * 5 ),
                emails: [{address: Fake.word()+"@address.ee"}],
            });
            if (userId) console.info("Generated user: " + userId)
            for (var j = 0; j < 10; j++) {
                var data = {
                    chefId: userId,
                    rand: Math.random(),
                    title: Fake.sentence(3),
                    ingredients: Fake.sentence(10),
                    weight: Fake.fromArray([10, 50 ,100, 150, 190, 210, 260, 280, 330, 390, 450]),
                    published: true,
                    tags: Fake.fromArray([Fake.fromArray(Settings.menuitemTags),Fake.fromArray(Settings.menuitemTags),Fake.fromArray(Settings.menuitemTags)],[],[Fake.fromArray(Settings.menuitemTags)]),
                    foodType: Fake.fromArray(Settings.foodTypes),
                    priceClass: Fake.fromArray(Settings.getKeys('priceClasses'))
                }
                var template = MenuItemTemplates.insert(data)
                if (template) console.info("Generated MenuItemTemplate: " + template)
            }
        }
    },
    removeAllMenuItemTemplates: function(){
        Security.devOnly()
        MenuItemTemplates.remove({})
    },
    removeAllMenuItemsInOrder: function(){
        Security.devOnly()
        MenuItemsInOrder.remove({})
    },
    removeAllFakeUsers: function(){
        Security.devOnly()
        Meteor.users.remove({services: {$exists: 0}})
    },
}

Meteor.methods({
    "fake.regen": function(){
        FakeData.removeAllMenuItemTemplates()
        FakeData.removeAllMenuItemsInOrder()
        FakeData.removeAllFakeUsers()
        FakeData.generateFakeMenuitemTemplates()
    },
    "fake.all": function(){
        FakeData.generateFakeMenuitemTemplates()
    },
    "fake.none": function(){
        FakeData.removeAllMenuItemTemplates()
        FakeData.removeAllMenuItemsInOrder()
        FakeData.removeAllFakeUsers()
    },
    "fake.generateMenuitemTemplates": function(){FakeData.generateFakeMenuitemTemplates()},
    "fake.removeAllMenuItemTemplates": function(){FakeData.removeAllMenuItemTemplates()},
    "fake.removeAllMenuItemsInOrder": function(){FakeData.removeAllMenuItemsInOrder()},
    "fake.removeAllFakeUsers": function(){FakeData.removeAllFakeUsers()},
});
