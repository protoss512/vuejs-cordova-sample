const fs = require('fs')

var i = 0
var str = ''
var strs = []
//重新開始，清除先前對話並使用台灣繁體中文
//產生1000個英文單字附音標和翻譯與例句附翻譯
fs.readFile('./z.txt', (err, s) => {
    if (err) throw err;
    //
    str = String(s)

    let saves = []
    let exs = []


    let isStart = false
    let i = 0;
    while (str[i] == '\r' && str[i + 1] == '\n') {
        i += 1
        let save = []
        let ex = []
        for (; i < str.length; i++) {
            if (str[i + 1] == '[') {
                console.log(save)
                break
            }
            if (isStart) {
                save.push(str[i])
            }
            if (str[i] == '\n') {
                isStart = true
                
            }

        }
        isStart = false
        for (; i < str.length; i++) {
            if (str[i] == '。') {
                ex.push(str[i])
                ex.push(str[i + 1])
                i += 2
                saves.push(save.join('').replace('\r\n', ''))
                exs.push(ex.join('').replace('\r\n', ';'))
                break
            }
            ex.push(str[i])
        }
    }


    console.log(saves)
    output = 'export const a = ['
    for (let x = 0; x < saves.length; x++) {
        output += `{
            e:"${saves[x]}",
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
