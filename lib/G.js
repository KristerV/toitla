G = {
    strlen(str, len) {
        while (str.length < len) {
            str = " " + str
        }
        return str
    }
}
