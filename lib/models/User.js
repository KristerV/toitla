Meteor.users._transform = function(doc) {
    doc.__proto__ = User;
    return doc;
}

Meteor.startup(function(){
    if (Meteor.isServer) {
        Meteor.publish("allUserData", function(argument){
            if (this.userId)
                return Meteor.users.find({}, {fields: {'profile': 1, 'roles': 1, 'status': 1}});
        });
        Accounts.onCreateUser(function(options, user) {
            user.roles = ['chef']
            var emailHTML = "<p> -------------- Uus kasutaja -------------- </p><p>Email: " + user.emails[0].address + "</p>"
            Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Teavitus tellimusest', emailHTML)
            return user;
        });
    } else if (Meteor.isClient) {
        Meteor.setTimeout(function(){
          if (!Meteor.user().profile || !Meteor.user().profile.name) {
            sAlert.info('Palun täida oma profiil ära, siis saame sulle tellimusi saata.', {timeout: 10000})
          }
        }, 2000);
    }
});


UserSchema = {
    'profile.name': {
        required: true,
    },
    'profile.address': {
        required: true,
    },
    'profile.tel': {
        required: true,
    },
    'profile.vet': {
        required: true,
    },
    'profile.billing': {
        required: true,
    },
}

User = {

    updateField: function(field, value, callback) {
        Meteor.call('updateUserField', this._id, field, value, callback)
    },

    handleChangeDropdown: function(e, selectedIndex, menuItem) {
        this.updateField(menuItem.payload, menuItem.value)
    },

    handleCheckboxChange: function(e, checked, callback) {
        this.updateField(e.target.name, checked, callback)
    },

    handleTextFieldChange: function(e, callback) {
        var value = e.target.value
        var name = e.target.name
        this.updateField(name, value, callback)
    },

    addRole: function(role) {
        console.log("addRole is disabled for security");
        Meteor.call('makeRole', role)
    },

    getStatus: function() {
        var user = this
        if (!user || !user.status)
            return false

        if (user.status.idle)
            return "idle"
        else if (user.status.online)
            return "online"
        else
            return "offline"
    },

    lastOnline: function() {
        var user = this
        if (!user || !user.status)
            return false
        return user.status.lastActivity
    }

}

Meteor.methods({
    updateUserField: function(docId, field, value) {
        var data = {}
        data[field] = value
        Meteor.users.update(docId, {$set: data})
    },
    // Disable for security
    // makeRole: function(role) {
    //     Roles.removeUsersFromRoles(this.userId, ['chef', 'manager'])
    //     Roles.addUsersToRoles(this.userId, role)
    // }
});