const fs = require('fs')
const translate = require('@iamtraction/google-translate');
const data = {
    "question": "問題 .",
    "to_answer": "看解答",
    "go_next": "下一題",
    "correct": "正確 !",
    "fail": "正確答案為:  ",
    "to_Ke_Leak": "句子填空",
    "total_question": "總答題數",
    "total_correct": "答對題數",
    "total_error": "答錯題數",
    "correct_rate": "答對率",
    "analysis": "分析",
    "vocabulary": "單字練習",
    "to_read": "單篇閱讀",
    "explanation": "解析",
    "read_answer": "回答問題",
    "look_read": "閱讀文章",
    "english": "英文",
    "explation": "解析",
    "easy": "簡潔",
    "useful": "易學易用",
    "feel": "改善學習體驗",
    "start": "開始使用",
    "setting": "設定",
    "font_rate": "文字大小",
    "small": "小",
    "middle": "中",
    "large": "大",
    "translation": "翻譯",
    "speech_rate": "語音速度",
    "high": "快",
    "normal": "中",
    "low": "慢",
    "home": "首頁",
    "start_study": "開始練習",
    "app_name": "英文解析",
    "read_article": "請閱讀以下文章",
    "please_select": "請選擇答案",
    "trans_not": "翻譯僅供參考",
    "sctor_space": "段落填空",
    "dark_switch": "夜間模式",
    "anwser_num": "答題數",
    "to_Ke_Leak_exp": "閱讀各種文本並回答幾種不同類型的閱讀理解問題，並且在四個選項中，選出正確答案。",
    "sctor_space_exp": "閱讀每篇文章，找出某些部分缺少一個詞、短語或句子。每個問題有四個答案，請選擇最佳答案來完成文章。",
    "to_read_exp": "閱讀精選的文本，例如雜誌和報紙文章、電子郵件和即時消息。 每篇課文或每組課文後面都有幾個問題。 為每個問題選擇最佳答案。",
    "cancel": "取消",
    "contact": "聯絡我",
    "close": "關閉",
    "version": "版本",
    "statistics": "統計",
    "is_check": "確定要清除嗎?",
    "check": "確定",
    "delete_data": "清除統計數據",
    "currect_rate": "正確率",
    "use_time": "使用時間",
    "language": "語言"
}
const SELECT = ['zh-cn', 'fr', 'en', 'de', 'id', 'it', 'ja', 'ko', 'ru', 'es', 'vi', 'th', 'pt']
const TRAN = {
    'zh-cn': 'cn', 'fr': 'fr', 'en': 'en', 'de': 'de', 'id': 'id', 'it': 'it', 'ja': 'ja', 'ko': 'ko', 'ru': 'ru', 'es': 'es', 'vi': 'vi', 'th': 'th', 'pt': 'pt'
}
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
    let [result, keys] = json2array(data)
    output = '{\n'
    for (let i = 0; i < keys.length; i++) {
        output += `"${keys[i]}":"${await trans(result[i], id)}"${i != keys.length - 1 ? ',' : ''}\n`
    }
    output += '\n}'
    fs.writeFile('./lang/' + TRAN[id] + '.json', output, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
}

for (let i = 0; i < SELECT.length; i++) {
    main(SELECT[i])
}

function json2array(json) {
    let result = [];
    //var ids = []
    let keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });
    return [result, keys];
}
