T = function(section, key, dangerouslySetHTML) {
    var lang = 'en'
    if (!Translations[section] || !Translations[section][key] || !Translations[section][key][lang]) {
        G.error("Translation missing: " + section + " - " + key)
        var str = key
    } else {
        var str = Translations[section][key][lang]
    }
    // https://facebook.github.io/react/tips/dangerously-set-inner-html.html
    if (dangerouslySetHTML)
        var html = {__html: str}
    else
        var html = str
    return html
}
