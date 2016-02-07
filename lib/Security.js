Security = {
    devOnly: function() {
        if(Meteor.isServer){
            if (!Meteor.isDev) { // !localhost && dev server
                throw new Meteor.Error("Only allowed in development mode")
            }
        } else {
            throw new Meteor.Error("devOnly is a server only method")
        }
    },
    isEmail: function(email) {
        return /^[^@]+@[^@]+\.[^@]+$/.test(email)
    },
}
