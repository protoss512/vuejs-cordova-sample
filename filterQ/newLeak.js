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
const SELECT = ['A', 'B', 'C', 'D']
const SELECT2 = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3
}
async function main() {
    fs.readFile('./a.txt', async (err, s) => {
        if (err) throw err;

        str = String(s)

        let articles = []
        let sels = []
        let exps = []
        let anss = []
        let reals = []
        let cns = []
        const myArray = str.split("ChatGPT");

        let num = 12
        let lenn = 0

        let length = myArray[1].split(".\r\n")[0].split("\r\n").length
        //console.log(myArray[1].split(".\r\n")[0].split("\r\n")[length - 1] + '.') // question


        /*
        console.log(myArray[num].split(".\r\n")[1].split("\r\nD.")[0].split("A. ")[1].split("B. ")[0].replace('\r\n', ''))//A
        console.log(myArray[num].split(".\r\n")[1].split("\r\nD.")[0].split("B. ")[1].split("C. ")[0].replace('\r\n', ''))//B
        console.log(myArray[num].split(".\r\n")[1].split("\r\nD.")[0].split("C. ")[1].split("D. ")[0].replace('\r\n', ''))//C
        console.log(myArray[num].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n")[0].replace(' ', ''))//D
*/
        //console.log(myArray[1].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n"))

        /*lenn = myArray[num].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n").length
        let text = ''
        //console.log(myArray[num].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n"),lenn)
        for (let x = 1; x < lenn; x++) {
            if (myArray[num].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n")[x] == 'User') break
            text += myArray[num].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n")[x]
        }
        //console.log(text.split("答案")[text.split("答案").length - 1])
*/

        let output = ''
        let len = 0
        for (let i = 1; i < myArray.length - 1; i++) {
            len = myArray[i].split(".\r\n")[0].split("\r\n").length
            //output += myArray[i].split(".\r\n")[0].split("\r\n")[len - 1] + '\r\n' + myArray[i].split(".\r\n")[1] + '\r\n'
            //console.log('start\r\n' + myArray[i].split(".\r\n")[0].split("\r\n")[len - 1] + '\r\n' + myArray[i].split(".\r\n")[1] + '\r\nend')

            console.log(i, myArray[i].split(".\r\n")[0].split("\r\n")[len - 1] + '.')//question

            lenn = myArray[i].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n").length
            let text = ''
            for (let x = 1; x < lenn; x++) {
                if (myArray[i].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n")[x] == 'User') break
                text += myArray[i].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n")[x]
            }
            //console.log(text.split("答案")[1])

            //console.log(i, myArray[i].split(".\r\n")[0].split("\r\n")[len - 1] + '.', lenn)


            let a = text.split("答案")[text.split("答案").length - 1].split(".")[0]
            let ans = ''
            if (a.includes('A')) {
                ans = 'A'
            } else if (a.includes('B')) {
                ans = 'B'
            } else if (a.includes('C')) {
                ans = 'C'
            } else if (a.includes('D')) {
                ans = 'D'
            } else {
                ans = 'error'
            }
            let sel = []

            //console.log(myArray[i].split(".\r\n")[1].split("\r\nD.")[0].split("A. ")[1].split("B. ")[0].replace('\r\n', ''))//A
            //console.log(myArray[i].split(".\r\n")[1].split("\r\nD.")[0].split("B. ")[1].split("C. ")[0].replace('\r\n', ''))//B
            //console.log(myArray[i].split(".\r\n")[1].split("\r\nD.")[0].split("C. ")[1].split("D. ")[0].replace('\r\n', ''))//C
            //console.log(myArray[i].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n")[0].replace(' ', ''))//D

            sel.push(myArray[i].split(".\r\n")[1].split("\r\nD.")[0].split("A. ")[1].split("B. ")[0].replace(/\r\n/g, ''))
            sel.push(myArray[i].split(".\r\n")[1].split("\r\nD.")[0].split("B. ")[1].split("C. ")[0].replace(/\r\n/g, ''))
            sel.push(myArray[i].split(".\r\n")[1].split("\r\nD.")[0].split("C. ")[1].split("D. ")[0].replace(/\r\n/g, ''))
            sel.push(myArray[i].split(".\r\n")[1].split("\r\nD.")[1].split("\r\n")[0].replace(/\r\n/g, ''))

            //output += i.toString() + 'start\r\n' + text + '\r\n' + ans + '\r\nend\r\n'

            articles.push(myArray[i].split(".\r\n")[0].split("\r\n")[len - 1] + '.')
            sels.push(sel)
            anss.push(sel[SELECT2[ans]])
            exps.push(text.replace(/\"/g, ' '))

            let c = myArray[i].split(".\r\n")[0].split("\r\n")[len - 1] + '.'
            c = c.replace('_', sel[SELECT2[ans]])
            c = c.replace(/\_/g, '')

            cns.push(await trans(c))
        }
        //console.log(sels[0],sels[1])


        output = 'export const q = ['
        for (let i = 0; i < articles.length; i++) {
            let q = '['
            for (let x = 0; x < 4; x++) {
                q += `"${sels[i][x]}",`
            }//.replace(/\r\n/g, '')
            q += ']'
            output += `{
                q:"${articles[i]}",
                s:${q},
                a:"${anss[i]}",
                e:"${exps[i]}",
                z:"${cns[i]}"
            },`
        }
        output += ']'
        fs.writeFile('test3.js', output, function (err) {
            if (err)
                console.log(err);
            else
                console.log('Write operation complete.');
        });

        /*fs.writeFile('test1.js', output, function (err) {
            if (err)
                console.log(err);
            else
                console.log('Write operation complete.');
        });*/

        /*for (let i = 1; i < myArray.length; i++) {
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
        });*/
    })
}

main()