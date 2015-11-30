G = {
    strlen(str, len) {
        while (str.length < len) {
            str = " " + str
        }
        return str
    },
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    error(msg) {
        console.error(msg)
        var e = new Error(msg);
        var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
          .replace(/^\s+at\s+/gm, '')
          .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
          .split('\n');
          console.info(stack)
    }
}
