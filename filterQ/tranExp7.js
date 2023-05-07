const fs = require('fs')
//const translate = require('@iamtraction/google-translate');
const translate = require('node-google-translate-skidz');



const SELECT = ['zh', 'zh-cn', 'fr', 'en', 'de', 'id', 'it', 'ja', 'ko', 'ru', 'es', 'vi', 'th', 'pt']
const TRAN = {
    'zh': 'zh', 'zh-cn': 'cn', 'fr': 'fr', 'en': 'en', 'de': 'de', 'id': 'id', 'it': 'it', 'ja': 'ja', 'ko': 'ko', 'ru': 'ru', 'es': 'es', 'vi': 'vi', 'th': 'th', 'pt': 'pt'
}

var qs = require('./read_question.js');


function trans(text, id) {
    /*return new Promise(resolve => {
        translate(text, { from: 'zh-tw', to: id }).then(res => {
            //console.log(res.text); // OUTPUT: You are amazing!
            resolve(res.text);
        }).catch(err => {
            resolve('');
        });
    });*/
    return new Promise(resolve => {
        translate({
            text: text,
            source: 'zh-tw',
            target: id
        }, function (result) {
            resolve(result['translation']);
        });
    });
}

async function main(id) {
    let q = qs.getQS()
    let output = 'export const ' + id + ' = ['
    for (let i = 0; i < q.length; i++) {
        let s = ''
        for (let x = 0; x < q[i].q.length; x++) {
            s += `"${q[i].q[x]}",`
        }
        let a = ''
        for (let x = 0; x < q[i].q_a.length; x++) {
            a += `"${q[i].q_a[x]}",`
        }

        let z = ''
        for (let x = 0; x < q[i].q_sel.length; x++) {
            let t = '['
            for (let a = 0; a < q[i].q_sel[x].length; a++) {
                t += `"${q[i].q_sel[x][a]}",`
            }
            t += '],'
            z += t
        }
        let y = ''
        for (let x = 0; x < q[i].q_ex.length; x++) {
            let u = id == 'zh' ? q[i].q_ex[x] : await trans(q[i].q_ex[x], id)
            y += `"${u.replace(/\"/g, '')}",`
        }

        //let e = id == 'zh' ? q[i].q_ex : 
        let c = id == 'zh' ? q[i].zh : await trans(q[i].zh, id)
        output += `{
            ar: "${q[i].ar}",
            q: [${s}],
            q_sel:[${z}],
            q_ex: [${y}],
            q_a: [${a}],
            zh: "${c}"
        },`
    }
    output += ']'
    fs.writeFile('./ques7/' + id + '.js', output, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
}

for (let i = 0; i < SELECT.length; i++) {
    main(SELECT[i])
}
//main('fr')