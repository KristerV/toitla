var phantom = Meteor.npmRequire('x-ray-phantom')
var XRAY = Meteor.npmRequire('x-ray')
var xray = XRAY().driver(phantom()).delay(300)
var weak = Meteor.npmRequire('weak')
var ScrapingActive = false

Meteor.methods({
    scrape: function(sourceLink){
        if (!sourceLink)
            throw new Meteor.Error("Can't scrape empty link")
        if (!this.userId)
            throw new Meteor.Error("Authorized zone")
        if (!Scrapes.findOne({link: sourceLink})) {
            Scrapes.insert({
                type: 'links',
                link: sourceLink,
                status: 'waiting',
                dateAdded: new Date(),
            })
            scrapeNext()
        }
    },
    clearScraper: function() {
        if (!this.userId)
            throw new Meteor.Error("Authorized zone")
        Scrapes.remove({})
    }
});

var scrapeNext = function() {
    var next = Scrapes.findOne({status: 'waiting'}, {sort: {dateAdded: 1, secSort: 1}})
    if (ScrapingActive) {
        return
    }
    if (!next) {
        ScrapingActive = false
        return
    }
    ScrapingActive = true
    var link = next.link
    console.log(" ");
    console.log("GO TO: " + link);
    if (next.type === 'links') {
        scrapeForLinks(link)
    } else if (next.type === 'content') {
        scrapeNextContent(link)
    }
}

var scrapeNextContent = function(link) {
    xray(link, {
        name: 'meta[name="description"]@content',
        address: '.fc-bi-address-value',
        telephone: '.fc-bi-contact-name:contains("Telefon") + .fc-bi-contact-value',
        email: '.fc-bi-contact-name:contains("E-post") + .fc-bi-contact-value',
        website: '.fc-bi-urls-field a@href',
    })(Meteor.bindEnvironment(function(error, result){
        if (error)
            console.log("ERROR:", error);
        if (result.address.indexOf("allinn") > -1 && result.email) {
            result.status = 'done'
        } else {
            result.status = 'ditched'
        }
        console.log("RESULT:", result);
        Scrapes.update({link: link}, {$set: result})
        ScrapingActive = false
        scrapeNext()
    }))
}

var scrapeForLinks = function(link) {
    xray(link, ['a[title="Veebilehe kontaktandmed"]@href'])(Meteor.bindEnvironment(function(error, obj){
        console.log("INITIAL FETCH DONE");
        if (error)
            console.log("ERROR: ", error);

        var data
        for (var i = 0; i < obj.length; i++) {
            data = {
                link: obj[i],
                status: 'waiting',
                type: 'content',
                dateAdded: new Date(),
                secSort: i,
            }
            Scrapes.insert(data)
        }
        Scrapes.update({link: link}, {$set: {status: 'done'}})
        ScrapingActive = false
        scrapeNext()
    }))
}

scrapeNext()
