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

    getResultsIndex: function(result) {
        return this.getIndexOfSetting('results', result)
    },

    getIndexOfSetting: function(field, value) {
        if (value !== 0 && !value)
            return 0
        var obj = Settings[field]
        if (_.isArray(obj))
            return _.indexOf(obj, value)
        else if (_.isObject(obj))
            return Object.keys(obj).indexOf(value);
        else {
            console.error("getIndexOfSetting - target not an array nor object");
            console.log("obj: ", obj);
            console.log("field: ", field);
            console.log("value: ", value);
        }
    },
}

moment.locale('et');
