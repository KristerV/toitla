SettingsVariables = {
    locale: {
        default: 'et',
        available: ['et', 'en']
    },
    system_email: "Toitla <no-reply@toitla.com>",
    toitla: {
        address: "Telliskivi 60-C3",
        directions: "Sõita on vaja loomelinnaku tagant läbi suure parkla Vabalavani, post-värava laseme alla sinu jõudes.",
        waze: "http://waze.to?ll=59.438550,24.727962&navigate=yes",
        maps: "https://goo.gl/maps/YTznXL3SQ272",
        mapImage: "/images/web/officeMap.png",
        fleepConvo: "conv.1nho427pw5qh36@fleep.io",
        colors: {
            green: "#22b573",
        }
    },
    landing: {
        client_logos: ["us_embassy.png", "toggl.png", "transferwise.png", "swedbank.png", "fleep.png", "okia.pdf", "teleport.png", "funderbeam.pdf", "terveeesti.png", "telliskivi.pdf", "wiseguys.pdf", "proekspert.pdf", "teaduseagentuur.png", "tehnopol.png", "pare.png", "techsisters.png", "kysk.png", "minuunistustepaev.pdf", "digigirls.png", "bimsummit.png"],
        features: [
            {
                title: 'full_service',
                text: 'full_service_text',
                img: 'images/landing/features/hannes.jpg',
            },
            {
                title: 'fingerfood',
                text: 'fingerfood_text',
                img: 'images/landing/events/IMG_8961.jpg',
            },
            {
                title: 'fresh_coffee',
                text: 'fresh_coffee_text',
                img: 'uploads/images/menuitems/d5085d30-a60b-4123-8c6d-85d3b622b680.jpg',
            },
            {
                title: 'local_beverages',
                text: 'local_beverages_text',
                img: 'uploads/images/menuitems/a587da82-b0b9-4647-8a70-6fe4319331e7.png',
            },
            {
                title: 'large_cakes',
                text: 'large_cakes_text',
                img: 'images/landing/events/',
            },
            {
                title: 'setup_cleanup',
                text: 'setup_cleanup_text',
                img: 'images/landing/events/',
            },
            {
                title: 'personafied_table',
                text: 'personafied_table_text',
                img: 'images/landing/features/personafied_table.jpg',
            },
            {
                title: 'all_diets',
                text: 'all_diets_text',
                img: 'images/landing/features/vegan.jpg',
            },
            {
                title: 'large_variety',
                text: 'large_variety_text',
                img: 'images/landing/features/variety.jpg',
            },
            {
                title: 'never_hungry',
                text: 'never_hungry',
                img: 'images/landing/features/hungry.jpg',
            },
            {
                title: 'delivery',
                text: 'delivery_text',
                img: 'images/landing/features/uber.png',
            },
        ]
    },
    minimum_people_count: 10,
    minimum_days_notice: 2,
    menuConstructor: {
        maxSnacksPerChef: 90,
        gramsPerPerson: 250,
        foodMaxPercentFromTotal: 0.6
    },
    order: {
        tabs: [
            {
                route: 'status',
                label: 'Status'
            },
            {
                route: 'info',
                label: 'Info'
            },
            {
                route: 'menu',
                label: 'Menu'
            },
            {
                route: 'signs',
                label: 'Signs'
            },
            {
                route: 'equipment',
                label: 'Equipment'
            },
            {
                route: 'driver',
                label: 'Driver'
            },
        ]
    },
    settings: {
        tabs: [
            {
                route: 'checklists',
                label: 'Checklists'
            },
            {
                route: 'driver',
                label: 'Driver'
            }
        ]
    },
    checklistReserved: {
        submitted: "Submitted",
        openChefConfirmations: "Client Confirmed",
        readyForEvent: "Ready for Event",
    },
    foodTypes: ['main', 'dessert', 'drink'],
    menuitemTags: [
        // colors: https://www.google.com/design/spec/style/color.html#color-color-palette
        {
            name: 'meatfree',
            color: '#64DD17',
            public: true,
            group: 'diet',
            label: 'lihavaba',
        },
        {
            name: 'vegan',
            color: '#00C853',
            public: true,
            group: 'diet',
            label: 'vegan',
        },
        {
            name: 'raw',
            color: '#00BFA5',
            public: true,
            group: 'diet',
            label: 'toor',
        },
        {
            name: 'glutenfree',
            color: '#0091EA',
            public: false,
            group: 'allergenic',
            label: 'gluteenivaba',
        },
        {
            name: 'lactosefree',
            color: '#2962FF',
            public: false,
            group: 'allergenic',
            label: 'laktoosivaba',
        },
        {
            name: 'eco',
            color: '#8D6E63',
            public: true,
            group: 'preference',
            label: 'mahe',
        },
        {
            name: 'sugarfree',
            color: '#C2185B',
            public: true,
            group: 'allergenic',
            label: 'suhkruvaba',
        },
        {
            name: 'kidfriendly',
            color: '#AA00FF',
            public: false,
            group: 'preference',
            label: 'laste',
        },
        {
            name: 'lunch',
            color: '#FBC02D',
            public: false,
            group: 'preference',
            label: 'Lõunaamps',
        },
        {
            name: 'fish',
            color: '#FBC02D',
            public: false,
            group: 'diet',
            label: 'Kala',
        },
    ],
}

// Needed to separate this
// http://stackoverflow.com/questions/4616202/self-references-in-object-literal-declarations
SettingsCalculations = {
    checklists: [
        {
            name: 'status',
            label: 'Status',
            reserved: _.values(SettingsVariables.checklistReserved)
        },
        {
            name: 'menuComposition',
            label: 'Menu Building',
        },
        {
            name: 'chefOnBoarding',
            label: 'Chef On-boarding',
        },
        {
            name: 'equipment',
            label: 'Equipment',
        },
        {
            name: 'lostReasons',
            label: 'Lost Order Reasons',
        },
    ],
    phases: {
        'unsubmitted': {
            label: "Unsubmitted",
            menuitemInOrderVisibleTheChef: false,
        },
        'new': {
            label: "Submitted",
            menuitemInOrderVisibleTheChef: false,
        },
        'getDetails': {
            label: "Details Gathered",
            menuitemInOrderVisibleTheChef: false,
        },
        'makeMenu': {
            label: "Menu Built",
            menuitemInOrderVisibleTheChef: false,
        },
        'makeOffer': {
            label: "Offer Sent",
            menuitemInOrderVisibleTheChef: false,
        },
        'clientConfirm': {
            label: "Client Confirmed",
            menuitemInOrderVisibleTheChef: false,
        },
        'chefConfirmOpen': {
            label: SettingsVariables.checklistReserved.openChefConfirmations,
            menuitemInOrderVisibleTheChef: true,
        },
        'chefConfirm': {
            label: "Chefs confirmed",
            menuitemInOrderVisibleTheChef: true,
        },
        'readyForEvent': {
            label: "Ready for event",
            menuitemInOrderVisibleTheChef: true,
        },
        'eventFinished': {
            label: "Event Finished",
            menuitemInOrderVisibleTheChef: true,
        },
        'feedback': {
            label: "Feedback/invoice sent",
            menuitemInOrderVisibleTheChef: true,
        },
        'done': {
            label: "Done",
            menuitemInOrderVisibleTheChef: true,
        },
        'silent': {
            label: "Silent",
            menuitemInOrderVisibleTheChef: true,
        },
        'lost': {
            label: "Lost",
            menuitemInOrderVisibleTheChef: true,
        },
    }
}

// Separate this just for show
SettingsFunctions = {
    getPhaseIndex: function(phase) {
        return this.getIndexOfSetting('phases', phase)
    },

    getKeys: function(field) {
        return Object.keys(this[field])
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
            console.warn("obj: ", obj);
            console.warn("field: ", field);
            console.warn("value: ", value);
        }

        return index
    },
    findByKey: function(field, key, value) {
        var find = {}
        find[key] = value
        return _.findWhere(Settings[field], find)
    },
}

_.extend(Settings, SettingsVariables, SettingsCalculations, SettingsFunctions)