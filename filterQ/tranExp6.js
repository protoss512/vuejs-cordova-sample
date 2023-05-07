const fs = require('fs')
const translate = require('@iamtraction/google-translate');

const SELECT = ['zh', 'zh-cn', 'fr', 'en', 'de', 'id', 'it', 'ja', 'ko', 'ru', 'es', 'vi', 'th', 'pt']
const TRAN = {
    'zh': 'zh', 'zh-cn': 'cn', 'fr': 'fr', 'en': 'en', 'de': 'de', 'id': 'id', 'it': 'it', 'ja': 'ja', 'ko': 'ko', 'ru': 'ru', 'es': 'es', 'vi': 'vi', 'th': 'th', 'pt': 'pt'
}

var qs = require('./question_space.js');


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
        for (let x = 0; x < q[i].sels.length; x++) {
            s += `"${q[i].sels[x]}",`
        }
        let a = ''
        for (let x = 0; x < q[i].ans.length; x++) {
            a += `"${q[i].ans[x]}",`
        }
        let e = id == 'zh' ? q[i].exps : await trans(q[i].exps, id)
        let c = id == 'zh' ? q[i].cns : await trans(q[i].cns, id)
        output += `{
            ars: "${q[i].ars}",
            reals: "${q[i].reals}",
            sels: [${s}],
            exps: "${e.replace(/\"/g, '')}",
            ans: [${a}],
            cns: "${c}"
        },`
    }
    output += ']'
    fs.writeFile('./ques6/' + TRAN[id] + '.js', output, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
}

for (let i = 0; i < SELECT.length; i++) {
    main(SELECT[i])
}

