AnalyticsObject = {
    event(name) {
        return false // disable analytics, got duplicate _id error for some reason
        var guestId = localStorage.getItem('guestId')
        var userId = Meteor.userId()

        if (!guestId) {
            guestId = 'guest-' + Random.id()
            localStorage.setItem('guestId', guestId)
        }

        var sessionId = sessionStorage.getItem('sessionId')
        if (!sessionId) {
            sessionId = Random.id()
            sessionStorage.setItem('sessionId', sessionId)
        }

        var url = G.getFullUrl()

        Meteor.call('Analytics--event', guestId, userId, sessionId, name, url)
    }
}

_.extend(Analytics, AnalyticsObject)