User = {

    getEmail: function() {
        if (this.emails) {
            return this.emails[0].address;
        } else {
            return null
        }
    },

    getName: function() {
        return this.profile.name
    },

    updateField: function(field, value, callback) {
        Meteor.call('updateUserField', this._id, field, value, callback)
    },

    handleCheckboxChange: function(e, callback) {
        this.updateField(e.target.name, e.target.checked, callback)
    },

    handleTextFieldChange: function(e, callback) {
        var value = e.target.value
        var name = e.target.name
        this.updateField(name, value, callback)
    },

    makeRole: function(role, userId) {
        userId = userId || Meteor.userId()
        Meteor.call('makeRole', role, userId)
    },

    makeManager: function(userId) {
        userId = userId || this._id
        Meteor.call('makeRole', 'manager', userId)
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
    },

    isChef: function() {
        return Roles.userIsInRole(this._id, 'chef')
    },

    isManager: function() {
        return Roles.userIsInRole(this._id, 'manager')
    },

    changeEmail: function(newEmail) {
        Meteor.call('User--changeEmail', this._id, newEmail)
    },

    changeCommissionFee: function(commissionFee) {
        Meteor.call('User--changeCommissionFee', this._id, commissionFee)
    }

};
