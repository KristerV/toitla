T = function(section, key) {
    var lang = 'en'
    if (!Translations[section] || !Translations[section][key] || !Translations[section][key][lang]) {
        console.error("Translation missing: " + section + " - " + key)
        return key
    } else {
        // https://facebook.github.io/react/tips/dangerously-set-inner-html.html
        var dangerouslySetHTML = {__html: Translations[section][key][lang]}
        return dangerouslySetHTML
    }
}
