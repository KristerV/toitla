TODO = function(msg) {
    msg = msg ? 'TODO: ' + msg : 'TODO'
    console.log(new Error(msg))
}

Settings = {
    minimum_people_count: 10,
    minimum_days_notice: 2,
    priceClasses: {
        class1: 0.4,
        class2: 0.8,
        class3: 1.5,
    },
    foodTypes: ['main', 'dessert'],
    menuitemTags: ['meatfree', 'glutenfree', 'vegan', 'lactosefree', 'raw', 'eco'],
    phases: {
        'unsubmitted': {
            label: "poolikud",
        },
        'new': {
            label: "Uus",
        },
        'chefsOffering': {
            label: "Kokad pakuvad",
        },
        'clientConfirm': {
            label: "Klient kinnitab",
        },
        'readyForEvent': {
            label: "Valmis ürituseks",
        },
        'done': {
            label: "Tehtud",
        },
        'lost': {
            label: "Kaotatud",
        },
    },
    suborders: {
		results: {
			accepted: "accepted",
			declined: "declined",
		},
	},
    getPhaseIndex: function(phase) {
        return this.getIndexOfSetting('phases', phase)
    },

    getKeys: function(field) {
        return Object.keys(this[field])
    },

    getResultsIndex: function(result) {
        return this.getIndexOfSetting('results', result)
    },

    // Some fields are only controllable by index.
    // Use value to get index from Settings.
    // placeholder: add +1 to index as field has default placeholder value
    getIndexOfSetting: function(field, value, placeholder) {

        if (value !== 0 && !value)
            return 0

        var index
        var obj = Settings[field]
        if (_.isArray(obj)) {
            index = _.indexOf(obj, value)
            if (placeholder) index++
        } else if (_.isObject(obj)) {
            index = Object.keys(obj).indexOf(value);
            if (placeholder) index++
        } else {
            console.error("getIndexOfSetting - target not an array nor object");
            console.log("obj: ", obj);
            console.log("field: ", field);
            console.log("value: ", value);
        }

        return index
    }
}

moment.locale('et');
