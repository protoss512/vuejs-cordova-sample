const fs = require('fs')

var i = 0
var str = ''
var strs = []
//重新開始，清除先前對話並使用台灣繁體中文
//產生1000個英文單字附音標和翻譯與例句附翻譯
fs.readFile('./t1.txt', (err, s) => {
    if (err) throw err;
    //
    str = String(s)

    let saves = []
    let ipas = []
    let forms = []
    let css = []
    let exs = []


    let isStart = false
    let i = 0;
    while (str[i] == '\r' && str[i + 1] == '\n') {
        i += 2
        let save = []
        let ipa = []
        let form = []
        let cs = []
        let ex = []
        for (; i < str.length; i++) {
            if (str[i + 1] == '[') break
            if (isStart) {
                save.push(str[i])
            }
            if (str[i] == '\n') {
                isStart = true
            }
        }
        isStart = false
        for (; i < str.length; i++) {
            if (str[i + 1] == ']') break
            if (isStart) {
                ipa.push(str[i])
            }
            if (str[i] == '[') {
                isStart = true
            }
        }
        isStart = false
        for (; i < str.length; i++) {
            if (str[i] == '.') break
            if (isStart) {
                form.push(str[i])
            }
            if (str[i] == '-') {
                isStart = true
            }
        }
        isStart = false
        for (; i < str.length; i++) {
            if (str[i] == '-') break
            if (isStart) {
                cs.push(str[i])
            }
            if (str[i] == '.') {
                isStart = true
            }
        }
        isStart = false
        for (; i < str.length; i++) {
            if (str[i] == '）') {
                i += 1
                saves.push(save)
                ipas.push(ipa)
                forms.push(form)
                css.push(cs.join(''))
                exs.push(ex.join(''))
                break
            }
            if (isStart) {
                ex.push(str[i])
            }
            if (str[i] == '-') {
                isStart = true
            }
        }
    }


    console.log(saves, ipas, forms, css, exs)
    output = 'export const a = ['
    for (let x = 0; x < saves.length; x++) {
        output += `{
            e:"${saves[x]}",
            p:"${ipas[x]}",
            f:"${forms[x]}",
            c:"${css[x]}",
            ex:"${exs[x]}"
        },`
        //console.log(x)
    }
    output += ']'
    fs.writeFile('test4.js', output, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
})
