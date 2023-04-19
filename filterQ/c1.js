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
const SELECT = ['(A)', '(B)', '(C)', '(D)', '(E)', '(F)', '(G)', '(H)', '(I)', '(J)', '(K)', '(L)', '(M)', '(N)', '(O)', '(P)',]
const SELECT2 = {
    '(A)': 0,
    '(B)': 1,
    '(C)': 2,
    '(D)': 3,
    '(E)': 4,
    '(F)': 5,
    '(G)': 6,
    '(H)': 7,
    '(I)': 8,
    '(J)': 9,
    '(K)': 10,
    '(L)': 11,
    '(M)': 12,
    '(N)': 13,
    '(O)': 14,
    '(P)': 15,
}
async function main() {
    fs.readFile('./c1.txt', async (err, s) => {
        if (err) throw err;
        //
        str = String(s)

        let articles = []
        let sels = []
        let exps = []
        let ans = []
        let reals = []
        let cns = []
        const myArray = str.split("題目：");


        //let exp = myArray[1].split('解析：')[1]
        //console.log(exp)

        //const article = myArray[1].split("(A)")[0]
        //console.log(article)

        /*for (let i = 0; i < SELECT.length; i++) {
            const a = myArray[1].split(SELECT[i])[1].split(SELECT[i + 1])[0]
            if (a.includes("解析：")) {
                const b = myArray[1].split(SELECT[i])[1].split('解析：')[0]
                //console.log(b)
                ep = myArray[1].split(SELECT[i])[1].split('解析：')[1]
                break
            }
            //console.log(a)
        }*/

        //console.log(ep)
        //const article = myArray[1].split("(A)")[0]
        for (let i = 1; i < myArray.length; i++) {
            let article = myArray[i].split("(A)")[0]
            //console.log(i, article)
            let ep = ''
            let sel = []
            for (let x = 0; x < SELECT.length; x++) {
                const a = myArray[i].split(SELECT[x])[1].split(SELECT[x + 1])[0]
                if (a.includes("解析：")) {
                    const b = myArray[i].split(SELECT[x])[1].split('解析：')[0]
                    //console.log(b)
                    sel.push(b)
                    ep = myArray[i].split('解析：')[1]
                    break
                }
                //console.log(a)
                sel.push(a)
            }
            //console.log('exp', ep)
            articles.push(article)
            sels.push(sel)
            exps.push(ep)
            let an = []
            for (let z = 0; z < SELECT.length; z++) {
                if (ep.includes(SELECT[z])) {
                    //console.log(SELECT[z])
                    an.push(SELECT[z])
                }
            }
            ans.push(an)
        }
        for (let i = 0; i < exps.length; i++) {
            //for (let i = 0; i < 1; i++) {
            let a = articles[i]
            for (let x = 0; x < ans[i].length; x++) {
                a = a.replace('_____', sels[i][SELECT2[ans[i][x]]])
            }
            reals.push(a)
            //console.log(a)
            let zh = await trans(a)
            //console.log(zh)
            cns.push(zh)
        }
        for (let i = 0; i < exps.length; i++) {
            //console.log(i, articles[i], sels[i], exps[i], ans[i], reals[i], cns[i])
        }


        output = 'export const r = ['
        for (let i = 0; i < articles.length; i++) {
            /*let q = '['
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
            q_a += ']'*/
            let q_a = '['
            for (let x = 0; x < ans[i].length; x++) {
                q_a += `"${ans[i][x]}",`
            }
            q_a += ']'

            let q = '['
            for (let x = 0; x < sels[i].length; x++) {
                q += `"${sels[i][x].replace(/\r\n/g, '')}",`
            }
            q += ']'
            output += `{
                ars:"${articles[i].replace(/\r\n/g, '')}",
                reals:"${reals[i].replace(/\r\n/g, '')}",
                sels:${q},
                exps:"${exps[i].replace(/\r\n/g, '')}",
                ans:${q_a},
                cns:"${cns[i].replace(/\r\n/g, '')}"
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

        /*for (let i = 1; i < myArray.length; i++) {

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
        });*/
    })
}

main()