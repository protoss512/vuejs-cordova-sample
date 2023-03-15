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

    const myArray = str.split("Passage:");
    const qs = []

    for (let i = 1; i < myArray.length; i++) {

        const index = myArray[i].indexOf('Questions:', 0)
        const [article, t] = [myArray[i].slice(0, index), myArray[i].slice(index)];
        const an = t.split("Answer:")
        const q = []
        const q_ex = []
        const q_sel = []
        const q_a = []
        for (let x = 1; x < an.length; x++) {
            //console.log(i, x - 1)
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

            let lines = an[x - 1].split('\r\n');
            lines.splice(0, 3);
            const s = lines.join('\r\n');

            let sel = []
            const A = s.split("A.")[1].split("B.")[0]
            const B = s.split("A.")[1].split("B.")[1].split("C.")[0]
            const C = s.split("A.")[1].split("B.")[1].split("C.")[1].split("D.")[0]
            const D = s.split("A.")[1].split("B.")[1].split("C.")[1].split("D.")[1]
            sel.push(A.replace(/\r\n/g, ''))
            sel.push(B.replace(/\r\n/g, ''))
            sel.push(C.replace(/\r\n/g, ''))
            sel.push(D.replace(/\r\n/g, ''))
            q_sel.push(sel)

            q.push(s.split("A.")[0].replace(/\r\n/g, ''))

            q_a.push(an[x].split("Answer:")[0].split("解析：")[0].replace(/\r\n/g, ''))
        }
        //console.log(article, q, q_sel, q_ex, q_a)
        qs.push({
            ar: article.replace(/\r\n/g, ''),
            q: q,
            q_sel: q_sel,
            q_ex: q_ex,
            q_a: q_a
        })
    }
    console.log(qs)

    output = 'export const r = ['
    for (let i = 0; i < qs.length; i++) {
        let q = '['
        let q_l = '['
        for (let x = 0; x < qs[i].q.length; x++) {
            q += `"${qs[i].q[x]}",`
            q_l += `"${qs[i].q_sel[0]}","${qs[i].q_sel[1]}","${qs[i].q_sel[2]}","${qs[i].q_sel[3]}",`
        }
        q += ']'
        q_l += ']'
        output += `{
            ar:"${qs[i].ar}",
            q:${q},
            q_sel:${q_l},
        },`
        //console.log(x)
    }
    output += ']'
    fs.writeFile('test1.js', output, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
})
