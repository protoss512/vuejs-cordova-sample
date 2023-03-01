const fs = require('fs')

var i = 0
var str = ''
var strs = []
fs.readFile('file.txt', (err, s) => {
    if (err) throw err;
    str = String(s)
    for (; i < str.length; i++) {
        start()
    }
    //console.log(strs[strs.length - 1], strs[strs.length - 1].length)
    //console.log(strs)
    console.log(getQ(strs[strs.length - 1]))
    console.log(getSEL(strs[strs.length - 1]))
    /*fs.writeFile('test.txt', `{q:${strs[0]},}`, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });*/
})


function start() {
    let isBegin = false
    let save = []
    for (; i < str.length; i++) {
        if (checkVal(str[i])) {
            isBegin = true
        }
        if (isBegin && str[i] == '無' && str[i + 1] == '關' && str[i + 2] == '\r' && str[i + 3] == '\n') {
            break
        }
        if (isBegin) {
            save.push(str[i])
        }
    }
    strs.push(save.join(''))
}

function getQ(s) {
    let isBegin = false
    let save = []

    for (let j = 0; j < s.length; j++) {
        if (s[j] == '\r' && s[j + 1] == '\n') {
            return s.substring(0, j)
        }
    }
}

function getSEL(s) {
    let isBegin = false
    let save = []
    let sel = []
    for (let j = 0; j < s.length; j++) {
        if (isBegin && s[j] == '\r' && s[j + 1] == '\n') {
            break
        }

        if (s[j] == 'A' && s[j + 1] == '.' && s[j + 2] == ' ') {
            isBegin = true
            j += 3
        }
        if (isBegin) {
            save.push(s[j])
        }
    }
    sel.push(save.join(''))

    isBegin = false
    save = []
    for (let j = 0; j < s.length; j++) {
        if (isBegin && s[j] == '\r' && s[j + 1] == '\n') {
            break
        }

        if (s[j] == 'B' && s[j + 1] == '.' && s[j + 2] == ' ') {
            isBegin = true
            j += 3
        }
        if (isBegin) {
            save.push(s[j])
        }
    }
    sel.push(save.join(''))

    isBegin = false
    save = []
    for (let j = 0; j < s.length; j++) {
        if (isBegin && s[j] == '\r' && s[j + 1] == '\n') {
            break
        }

        if (s[j] == 'C' && s[j + 1] == '.' && s[j + 2] == ' ') {
            isBegin = true
            j += 3
        }
        if (isBegin) {
            save.push(s[j])
        }
    }
    sel.push(save.join(''))

    isBegin = false
    save = []
    for (let j = 0; j < s.length; j++) {
        if (isBegin && s[j] == '\r' && s[j + 1] == '\n') {
            break
        }

        if (s[j] == 'D' && s[j + 1] == '.' && s[j + 2] == ' ') {
            isBegin = true
            j += 3
        }
        if (isBegin) {
            save.push(s[j])
        }
    }
    sel.push(save.join(''))
    return sel
}

function checkVal(str) {
    let regExp = /^[\d|a-zA-Z_]+$/;
    if (regExp.test(str))
        return true;
    else
        return false;
}