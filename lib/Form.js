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
    allowedEdit: function(userId, field, doc) {
        doc = doc || this
        return Security.allowed(this.schema, userId, field, 'edit', doc)
    },

    allowedView: function(userId, field, doc) {
        doc = doc || this
        return Security.allowed(this.schema, userId, field, 'view', doc)
    },

    updateField: function(field, value, callback) {
        Meteor.call('FormUpdateField', this.collectionName, this._id, field, value, callback)
    },

    handleChangeDropdown: function(e, selectedIndex, menuItem) {
        this.updateField(menuItem.payload, menuItem.value)
    },

    handleChangeCheckbox: function(e, checked, callback) {
        this.updateField(e.target.name, checked, callback)
    },

    handleTextFieldChange: function(e, callback) {
        var value = e.target.value
        var name = e.target.name
        this.updateField(name, value, callback)
    },

    updatePhase: function(phase) {
        Meteor.call('updatePhase', this.collectionName, this._id, phase)
    },
}

// The Form object is not directly used, instread the methods are extended.
_.extend(Order, Form)
_.extend(Suborder, Form)

Meteor.methods({
    FormUpdateField: function(collectionName, docId, field, value) {
        var collection = Mongo.Collection.get(collectionName)
        var doc = collection.findOne(docId)
        if (!doc.allowedEdit(this.userId, field, doc))
            throw new Meteor.Error("Oled kindel, et sul on vajalikud õigused? field: "+field)
        var data = {}
        data[field] = value
        collection.update(docId, {$set: data})
    },
    submitInitialForm: function(docId, calculatedPrice) {
        var order = Orders.findOne(docId)
        if (order.submitted)
            throw new Meteor.Error("Submitted order prices can't be resubmitted.")
        var data = {
            'details.originalPrice': order.details.calculatedPrice,
            'details.customPrice': order.details.calculatedPrice,
            'submitted': true,
        }
        Orders.update(docId, {$set: data})
        order.updatePhase('new')
    },
    updatePhase: function(collectionName, docId, phase) {
        if (collectionName == 'orders') {
            var orderId = docId
        } else {
            var orderId = Suborders.findOne(docId).orderId
        }
        Orders.update(orderId, {$set: {'status.phase': phase}})
        Suborders.update({orderId: orderId}, {$set: {phase: phase}}, {multi: true})
    }
});
