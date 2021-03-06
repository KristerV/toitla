Form = {

    updateField: function(field, value, callback) {
        Meteor.call('FormUpdateField', this.collectionName, this._id, field, value, callback)
    },

    handleChangeCheckbox: function(e, callback) {
        this.updateField(e.target.name, e.target.checked, callback)
    },

    handleTextFieldChange: function(e, callback) {
        var value = Number(e.target.value) || e.target.value
        var name = e.target.name
        this.updateField(name, value, callback)
    },

    pushToArray: function(field, value) {
        Meteor.call('FormPushToArray', this.collectionName, this._id, field, value)
    },

    handleRadioChange: function(e, selected, callback) {
        this.updateField(e.target.name, selected, callback)
    },

    checkRequiredFields: function(errorField, reqFields) {
        var docField = this[errorField] || {}
        var errors = {}
        errors[errorField] = {}
        for (var i = 0; i < reqFields.length; i++) {
            if (!docField.hasOwnProperty(reqFields[i]) || !docField[reqFields[i]]) {
                errors[errorField][reqFields[i]] = T.global.please_fill()
            } else if (reqFields[i] == 'peopleCount' && isNaN(docField[reqFields[i]])) {
                errors[errorField][reqFields[i]] = T.forms.not_number_error()
            }
        }
        return errors
    }
}

// The Form object is not directly used, instread the methods are extended.
_.defaults(Order, Form)
_.defaults(Setting, Form)

Meteor.methods({
    FormUpdateField: function(collectionName, docId, field, value) {
        var collection = Mongo.Collection.get(collectionName)
        var doc = collection.findOne(docId)
        if (!Roles.userIsInRole(this.userId, 'manager') && doc.isSubmitted())
            throw new Meteor.Error("ACCESS DENIED: "+field)
        var data = {}
        data[field] = value
        collection.update(docId, {$set: data})
    },
    FormPushToArray: function(collectionName, docId, field, value) {
        var collection = Mongo.Collection.get(collectionName)
        var doc = collection.findOne(docId)
        if (!Roles.userIsInRole(this.userId, 'manager') && doc.isSubmitted())
            throw new Meteor.Error("ACCESS DENIED: "+field)
        var data = {}
        data[field] = value
        collection.update(docId, {$push: data})
    }
});
