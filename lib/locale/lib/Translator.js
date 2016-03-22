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

                    // The actual translator
                    return function(opt) {
                        opt = opt || {}

                        let translation = translations[opt.locale || T.currentLocale]

                        if (opt.dangerous)
                            return {__html: translation}
                        else
                            return translation
                    }

                })()
            } else if (_.isObject(obj[prop]) && obj.hasOwnProperty(prop)) {
                T.convert(obj[prop])
            }
        }
    },
}