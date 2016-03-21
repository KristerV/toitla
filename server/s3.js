
process.env.AWS_ACCESS_KEY_ID = Meteor.settings.S3_KEY
process.env.AWS_SECRET_ACCESS_KEY = Meteor.settings.S3_SECRET

landingEventsImagesList =

S3.config = {
    key: Meteor.settings.S3_KEY,
    secret: Meteor.settings.S3_SECRET,
    bucket: 'toitla',
    region: 'eu-west-1'
}

Meteor.methods({
    's3--listObjects': (prefix) => {
    }
})

Meteor.startup(() => {
    var s3 = new AWS.S3()
    s3.listObjects({Bucket: 'toitla', Prefix: 'images/landing/events'},
        Meteor.bindEnvironment(function(err, data) {
            if (err)
                console.error(err)
            if (data) {
                var images = []
                data.Contents.forEach(item => {
                    if (item.Key !== 'images/landing/events/')
                        images.push(item.Key.replace(/ /g, "%20"))
                })
                Settings.upsert('landing', {$set: {eventImages: images}})
            }
        }))

})