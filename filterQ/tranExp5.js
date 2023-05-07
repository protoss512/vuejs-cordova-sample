const fs = require('fs')
const translate = require('@iamtraction/google-translate');

const SELECT = ['zh-cn', 'fr', 'en', 'de', 'id', 'it', 'ja', 'ko', 'ru', 'es', 'vi', 'th', 'pt']
const TRAN = {
    'zh-cn': 'cn', 'fr': 'fr', 'en': 'en', 'de': 'de', 'id': 'id', 'it': 'it', 'ja': 'ja', 'ko': 'ko', 'ru': 'ru', 'es': 'es', 'vi': 'vi', 'th': 'th', 'pt': 'pt'
}

var qs = require('./question.js');


function trans(text, id) {
    return new Promise(resolve => {
        translate(text, { from: 'zh-tw', to: id }).then(res => {
            //console.log(res.text); // OUTPUT: You are amazing!
            resolve(res.text);
        }).catch(err => {
            resolve('');
        });
    });
}

async function main(id) {
    let q = qs.getQS()
    let output = 'export const ' + id + ' = ['
    for (let i = 0; i < q.length; i++) {
        let s = ''
        for (let x = 0; x < 4; x++) {
            s += `"${q[i].s[x]}",`
        }
        let e = await trans(q[i].e, id)
        output += `{
            q: "${q[i].q}",
            s: [${s}],
            a: "${q[i].a}",
            e: "${e.replace(/\"/g, '')}",
            z: "${await trans(q[i].z, id)}"
        },`
    }
    output += ']'
    fs.writeFile('./ques5/' + TRAN[id] + '.js', output, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
}

for (let i = 0; i < SELECT.length; i++) {
    main(SELECT[i])
}

