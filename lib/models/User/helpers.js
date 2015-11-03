User = {

    getEmail: function() {
        if (this.emails) {
            return this.emails[0].address;
        } else {
            return null
        }
    },

    updateField: function(field, value, callback) {
        Meteor.call('updateUserField', this._id, field, value, callback)
    },

    handleChangeDropdown: function(e, selectedIndex, menuitem) {
        this.updateField(menuitem.payload, menuitem.value)
    },

    handleCheckboxChange: function(e, checked, callback) {
        this.updateField(e.target.name, checked, callback)
    },

    handleTextFieldChange: function(e, callback) {
        var value = e.target.value
        var name = e.target.name
        this.updateField(name, value, callback)
    },

    addRole: function(role, userId) {
        userId = userId || Meteor.userId()
        console.log("addRole is disabled for security");
        Meteor.call('makeRole', role, userId)
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
