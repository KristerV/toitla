Meteor.methods({
    'Analytics--event': (guestId, userId, sessionId, name, url) => {
        check(name, String)
        var userId = userId || this.userId || null
        var user = Meteor.users.findOne(userId)
        if (user) var username = user.getName()
        Analytics.insert({
            guestId: guestId,
            userId: userId,
            event: name,
            date: new Date(),
            username: username,
            sessionId: sessionId,
            url: url
        })
    }
})