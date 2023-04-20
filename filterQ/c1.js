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
        
        str = String(s)

        let articles = []
        let sels = []
        let exps = []
        let ans = []
        let reals = []
        let cns = []
        const myArray = str.split("題目：");

        for (let i = 1; i < myArray.length; i++) {
            let article = myArray[i].split("(A)")[0]
            let ep = ''
            let sel = []
            for (let x = 0; x < SELECT.length; x++) {
                const a = myArray[i].split(SELECT[x])[1].split(SELECT[x + 1])[0]
                if (a.includes("解析：")) {
                    const b = myArray[i].split(SELECT[x])[1].split('解析：')[0]
                    sel.push(b)
                    ep = myArray[i].split('解析：')[1]
                    break
                }
                sel.push(a)
            }
            articles.push(article)
            sels.push(sel)
            exps.push(ep)
            let an = []
            for (let z = 0; z < SELECT.length; z++) {
                if (ep.includes(SELECT[z])) {
                    an.push(SELECT[z])
                }
            }
            ans.push(an)
        }
        for (let i = 0; i < exps.length; i++) {
            let a = articles[i]
            for (let x = 0; x < ans[i].length; x++) {
                a = a.replace('_____', sels[i][SELECT2[ans[i][x]]])
            }
            reals.push(a)
            let zh = await trans(a)
            cns.push(zh)
        }

        output = 'export const r = ['
        for (let i = 0; i < articles.length; i++) {
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