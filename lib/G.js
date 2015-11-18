G = {
    strlen(str, len) {
        while (str.length < len) {
            str = " " + str
        }
        return str
    },
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
