T = {
    currentLocale: Settings.locale.default,

    // Initialization
    init: (loc) => {
        if (loc)
            T.currentLocale = loc
        T.convert(T)
    },

    // Converts {et: '', en: ''} objects
    // into function(){ return localized string }
    convert: (obj) => {
        for (var prop in obj) {
            let p = obj[prop]
            if (p && p.hasOwnProperty('en')) {
                // Encapsulate translations object to stop change next loop
                obj[prop] = (function() {
                    var translations = obj[prop]
                    return function(lang) {
                        if (!lang) lang = T.currentLocale
                        return translations[lang]
                    }
                })()
            } else if (_.isObject(obj[prop]) && obj.hasOwnProperty(prop)) {
                T.convert(obj[prop])
            }
        }
    }
}