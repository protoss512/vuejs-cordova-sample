const fs = require('fs')
const translate = require('@iamtraction/google-translate');

function trans(text) {
    return new Promise(resolve => {
        translate(text, { to: 'zh-tw' }).then(res => {
            //console.log(res.text); // OUTPUT: You are amazing!
            resolve(res.text);
        }).catch(err => {
            resolve('');
        });
    });
}


var i = 0
var str = ''
var strs = []


//重新開始，清除先前對話並使用台灣繁體中文
//產生1000個英文單字附音標和翻譯與例句附翻譯
async function main() {
    fs.readFile('./r6.txt', async (err, s) => {
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
                console.log(i, x - 1, lines)
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
            const zh = await trans(article.replace(/\r\n/g, ''))
            qs.push({
                ar: article.replace(/\r\n/g, ''),
                q: q,
                q_sel: q_sel,
                q_ex: q_ex,
                q_a: q_a,
                zh: zh
            })
        }
        console.log(qs)

        output = 'export const r = ['
        for (let i = 0; i < qs.length; i++) {
            let q = '['
            let q_l = '['
            let q_e = '['
            let q_a = '['
            for (let x = 0; x < qs[i].q.length; x++) {
                q += `"${qs[i].q[x]}",`
                q_l += `["${qs[i].q_sel[x][0]}","${qs[i].q_sel[x][1]}","${qs[i].q_sel[x][2]}","${qs[i].q_sel[x][3]}"],`
                q_e += `"${qs[i].q_ex[x]}",`
                q_a += `"${qs[i].q_a[x]}",`
            }
            q += ']'
            q_l += ']'
            q_e += ']'
            q_a += ']'
            output += `{
                ar:"${qs[i].ar}",
                q:${q},
                q_sel:${q_l},
                q_ex:${q_e},
                q_a:${q_a},
                zh:"${qs[i].zh}"
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
}

main()