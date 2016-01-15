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
                    tags: Fake.fromArray([[Fake.fromArray(Settings.menuitemTags),Fake.fromArray(Settings.menuitemTags),Fake.fromArray(Settings.menuitemTags)],[],[Fake.fromArray(Settings.menuitemTags)]]),
                    foodType: Fake.fromArray(Settings.foodTypes),
                    price: Fake.fromArray([0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.5, 2])
                }
                var template = MenuitemTemplates.insert(data)
                if (template) console.info("Generated MenuitemTemplate: " + template)
            }
        }
    },
    removeAllMenuitemTemplates: function(){
        Security.devOnly()
        MenuitemTemplates.remove({})
    },
    removeAllMenuitemsInOrder: function(){
        Security.devOnly()
        MenuitemsInOrder.remove({})
    },
    removeAllFakeUsers: function(){
        Security.devOnly()
        Meteor.users.remove({services: {$exists: 0}})
    },
}

Meteor.methods({
    "fake.regen": function(){
        FakeData.removeAllMenuitemTemplates()
        FakeData.removeAllMenuitemsInOrder()
        FakeData.removeAllFakeUsers()
        FakeData.generateFakeMenuitemTemplates()
    },
    "fake.all": function(){
        FakeData.generateFakeMenuitemTemplates()
    },
    "fake.none": function(){
        FakeData.removeAllMenuitemTemplates()
        FakeData.removeAllMenuitemsInOrder()
        FakeData.removeAllFakeUsers()
    },
    "fake.generateMenuitemTemplates": function(){FakeData.generateFakeMenuitemTemplates()},
    "fake.removeAllMenuitemTemplates": function(){FakeData.removeAllMenuitemTemplates()},
    "fake.removeAllMenuitemsInOrder": function(){FakeData.removeAllMenuitemsInOrder()},
    "fake.removeAllFakeUsers": function(){FakeData.removeAllFakeUsers()},
});
