// Form = function(input) {
//
//     // Get form DOM node
//     if (input.hasOwnProperty('elements')) { // is <form> object
//         this.form = input;
//     } else if (input.hasOwnProperty('getDOMNode')) { // is "this" object
//         this.form = input.getDOMNode();
//     } else if (input.hasOwnProperty('target')) { // is "event" object
//         input.preventDefault();
//         this.form = input.target;
//     }
// }


// Form.prototype.getValues = function () {
//     _.each(this.form, function(element, i){
//         var name = element
//         var value = element.value
//     })
// };

Form = {

    updateField: function(field, value, callback) {
        Meteor.call('FormUpdateField', this.collectionName, this._id, field, value, callback)
    },

    handleChangeDropdown: function(e, selectedIndex, menuitem) {
        this.updateField(menuitem.payload, menuitem.value)
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

    updatePhase: function(phase) {
        Meteor.call('updatePhase', this.collectionName, this._id, phase)
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
                errors[errorField][reqFields[i]] = T("global", "please_fill")
            } else if (reqFields[i] == 'peopleCount' && isNaN(docField[reqFields[i]])) {
                errors[errorField][reqFields[i]] = T("order", "people_count_patternError")
            }
        }
        return errors
    }
}

// The Form object is not directly used, instread the methods are extended.
_.defaults(Order, Form)

Meteor.methods({
    FormUpdateField: function(collectionName, docId, field, value) {
        var collection = Mongo.Collection.get(collectionName)
        var doc = collection.findOne(docId)
        if (doc.submitted && !Roles.userIsInRole(this.userId, 'manager'))
            throw new Meteor.Error("ACCESS DENIED: "+field)
        var data = {}
        data[field] = value
        collection.update(docId, {$set: data})
    },
    FormPushToArray: function(collectionName, docId, field, value) {
        var collection = Mongo.Collection.get(collectionName)
        var doc = collection.findOne(docId)
        if (doc.submitted && !Roles.userIsInRole(this.userId, 'manager'))
            throw new Meteor.Error("ACCESS DENIED: "+field)
        var data = {}
        data[field] = value
        collection.update(docId, {$push: data})
    },
    updatePhase: function(collectionName, docId, phase) {
        check(collectionName, String);
        check(docId, String);
        check(phase, String);
        if (!Roles.userIsInRole(this.userId, 'manager'))
            throw new Meteor.Error("Not allowed to update phase")
        if (collectionName === 'orders') {
            var orderId = docId
        }
        Orders.update(orderId, {$set: {'status.phase': phase}})
        MenuitemsInOrder.update({orderId: orderId}, {$set: {orderStatus: phase}}, {multi: true})
    }
});
