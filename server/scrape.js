var phantom = Meteor.npmRequire('x-ray-phantom')
var XRAY = Meteor.npmRequire('x-ray')
var xray = XRAY().driver(phantom())
var weak = Meteor.npmRequire('weak')


Meteor.methods({
    scrape: function(sourceLink){
        if (!sourceLink)
            throw new Meteor.Error("Can't scrape empty link")
        xray(sourceLink, ['a[title="Veebilehe kontaktandmed"]@href'])(Meteor.bindEnvironment(function(error, obj){
            console.log("INITIAL FETCH DONE");
            if (error)
                console.log("ERROR: ", error);
            obj.forEach(Meteor.bindEnvironment(function(link, i){
                Meteor.setTimeout(Meteor.bindEnvironment(function(){
                    console.log("GO TO: " + link);
                    var x = XRAY().driver(phantom())
                    x(link, {
                        name: 'meta[name="description"]@content',
                        address: '.fc-bi-address-value',
                        telephone: '.fc-bi-contact-value',
                        email: '.fc-bi-contacts-field:nth-child(5) .fc-bi-contact-value',
                        website: '.fc-bi-urls-field a@href',
                    })(Meteor.bindEnvironment(function(error, result){
                        console.log("ERROR:", error);
                        console.log("INSERT:", result);
                        Scrapes.insert(result)
                    }))
                }),2000 * i)
            }))
        }))
    },
    clearScraper: function() {
        Scrapes.remove({})
    }
});
