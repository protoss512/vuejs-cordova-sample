const fs = require('fs')

var i = 0
var str = ''
var strs = []
//重新開始，清除先前對話並使用台灣繁體中文
fs.readFile('file4.txt', (err, s) => {
    if (err) throw err;
    let output = ''
    str = String(s)
    for (; i < str.length; i++) {
        start()
    }
    //console.log(strs[strs.length - 1], strs[strs.length - 1].length)
    //console.log(strs)
    //console.log(getQ(strs[strs.length - 1]))
    //console.log(getSEL(strs[strs.length - 1]))
    output = 'export const q = ['
    for (let x in strs) {
        const [sel, ex] = getSEL(strs[x])
        output += `{
            id:${x},
            q:"${getQ(strs[x])}",
            s:["${sel[0]}","${sel[1]}","${sel[2]}","${sel[3]}"],
            a:"",
            e:"${ex}",
        },`
        console.log(x)
    }
    output += ']'
    fs.writeFile('test3.js', output, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
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
    let f = 0
    let ex = []
    for (let j = 0; j < s.length; j++) {
        if (isBegin && s[j] == '\r' && s[j + 1] == '\n') {
            f = j
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
    for (let x = f; x < s.length; x++) {
        ex.push(s[x])
    }

    sel.push(save.join(''))
    ex = ex.join('')
    ex = ex.replace(/\r\n/g, '');
    return [sel, ex]
}

function checkVal(str) {
    let regExp = /^[\d|a-zA-Z_]+$/;
    if (regExp.test(str))
        return true;
    else
        return false;
}