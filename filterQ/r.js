const fs = require('fs')

var i = 0
var str = ''
var strs = []
//重新開始，清除先前對話並使用台灣繁體中文
//產生1000個英文單字附音標和翻譯與例句附翻譯
fs.readFile('./r1.txt', (err, s) => {
    if (err) throw err;
    //
    str = String(s)

    let saves = []
    let ipas = []
    let forms = []
    let css = []
    let exs = []


    let isStart = false
    let i = 1;
    const myArray = str.split("Passage:");

    //for (let i = 0; i < myArray.length; i++) {

    const index = myArray[i].indexOf('Questions:', 0)
    const [article, t] = [myArray[i].slice(0, index), myArray[i].slice(index)];
    const an = t.split("Answer:")
    const q = []
    const q_ex = []
    for (let x = 1; x < an.length; x++) {
        let ex = an[x].split("解析：")[1]
        if (x > 0) ex = ex.split("\r\n")[0]
        if (x > 1) ex = ex.split("\r\n")[0]
        if (x > 2) ex = ex.split("\r\n")[0]
        if (x > 3) ex = ex.split("\r\n")[0]
        if (x > 4) ex = ex.split("\r\n")[0]
        if (x > 5) ex = ex.split("\r\n")[0]
        if (x > 6) ex = ex.split("\r\n")[0]
        if (x > 7) ex = ex.split("\r\n")[0]
        if (x > 8) ex = ex.split("\r\n")[0]
        q_ex.push(ex)
        console.log(x - 1)
        //console.log(an[x - 1].split("A.")[1].split("B.")[0])//A
        console.log(an[x - 1]) //B
        //console.log(an[x - 1].split("A.")[1].split("B.")[1].split("C.")[0]) //B
        //console.log(an[1].split("A.")[1].split("B.")[1].split("C.")[1].split("D.")[0]) //C
        //console.log(an[1].split("A.")[1].split("B.")[1].split("C.")[1].split("D.")[1]) //D
    }



    //console.log(an[x].split("解析：")[1].split("\r\n")[0]) //ex1
    //console.log(an[2].split("解析：")[1].split("\r\n")[0].split("\r\n")[0]) //ex2
    //console.log(an[3].split("解析：")[1].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0]) //ex3
    //console.log(an[4].split("解析：")[1].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0]) //ex4
    //console.log(an[5].split("解析：")[1].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0])//ex5
    //}



    let q1 = an[0].split("A.")[0].replace('Questions:', '').replace('\r\n', '')
    //let q1_s = [an[0].split("A.")[1].split("B.")[0], an[0].split("A.")[1].split("B.")[1].split("C.")[0], an[0].split("A.")[1].split("B.")[1].split("C.")[1].split("D.")[0], an[0].split("A.")[1].split("B.")[1].split("C.")[1].split("D.")[1]]
    //console.log(an[0].split("A.")[1].split("B.")[0])//A
    //console.log(an[0].split("A.")[1].split("B.")[1].split("C.")[0]) //B
    //console.log(an[0].split("A.")[1].split("B.")[1].split("C.")[1].split("D.")[0]) //C
    //console.log(an[0].split("A.")[1].split("B.")[1].split("C.")[1].split("D.")[1]) //D

    //console.log(an[1].split(an[1].split("解析：")[1].split("\r\n")[0])[1].split("A.")[0])//q2
    //console.log(an[2].split(an[2].split("解析：")[1].split("\r\n")[0].split("\r\n")[0])[1].split("A.")[0])//q3
    //console.log(an[3].split(an[3].split("解析：")[1].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0])[1].split("A.")[0])//q4
    //console.log(an[4].split(an[4].split("解析：")[1].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0])[1].split("A.")[0])//q5

    //console.log(an[1].split("解析：")[1].split("\r\n")[0]) //ex1
    //console.log(an[2].split("解析：")[1].split("\r\n")[0].split("\r\n")[0]) //ex2
    //console.log(an[3].split("解析：")[1].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0]) //ex3
    //console.log(an[4].split("解析：")[1].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0]) //ex4
    //console.log(an[5].split("解析：")[1].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0].split("\r\n")[0])//ex5

    /*while (str[i] == '\r' && str[i + 1] == '\n') {
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
    }*/


    //console.log(saves, ipas, forms, css, exs)
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
    /*fs.writeFile('test4.js', output, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });*/
})
