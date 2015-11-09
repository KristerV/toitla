T = function(section, key) {
    var lang = 'en'
    if (!Translations[section] || !Translations[section][key] || !Translations[section][key][lang]) {
        console.error("Translation missing: " + section + " - " + key)
        var str = key
    } else {
        var str = Translations[section][key][lang]
    }
    // https://facebook.github.io/react/tips/dangerously-set-inner-html.html
    var dangerouslySetHTML = {__html: str}
    return dangerouslySetHTML
}
