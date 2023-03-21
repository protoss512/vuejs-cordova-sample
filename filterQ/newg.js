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


/* eslint-disable */
const q = [{
    id: 0,
    q: 'The __________ of DNA molecules determines the genetic traits of an organism.',
    s: ['structure', 'function', 'color', 'temperature'],
    a: 'structure',
    e: '這個題目在描述 DNA 分子的性質，使用了名詞 "structure" 來指出它的結構特徵，以及片語 "genetic traits" 來指出它如何決定生物的遺傳特徵。而選項中只有 A. structure 符合語境和概念。B. function 可能是一個常見的選項，但它不足以完全解釋 DNA 分子的特性。C. color 和 D. temperature 則明顯不相關。',
}, {
    id: 1,
    q: "The human body has an internal __________ system that helps regulate and maintain the body's functions.",
    s: ['respiratory', 'digestive', 'circulatory', 'muscular'],
    a: 'circulatory',
    e: "這個題目在描述人體的生理系統，使用了名詞 system 來指出它是一個系統，並且片語 helps regulate and maintain the body's functions 進一步說明了它的作用。而選項中只有 C. circulatory 符合這個描述，因為循環系統是一個由心臟、血管和血液組成的系統，它負責將氧氣和營養物質運送到身體的各個部位，同時將二氧化碳和其他代謝廢物帶回肺和腎臟以進行排泄。A. respiratory 和 B. digestive 是其他兩個生理系統，而 D. muscular 則是描述人體的肌肉系統。",
}, {
    id: 2,
    q: 'The ___________ is the smallest unit of life and is capable of carrying out all the functions of life, including metabolism and reproduction.',
    s: ['cell', 'organ', 'tissue', 'organism'],
    a: 'cell',
    e: '這個題目在描述生命的最小單位，使用了 "smallest unit of life" 這個短語來提示。而選項中只有 A. cell 符合這個描述，因為細胞是生命的基本單位，能夠執行代謝、分裂、分化等生命活動，而器官 (organ)、組織 (tissue) 和有機體 (organism) 則都是由多個細胞組成的更大的單位。因此，答案為 A. cell。',
}, {
    id: 3,
    q: 'In the process of ___________, plants convert light energy into chemical energy in the form of glucose.',
    s: ['photosynthesis', 'respiration', 'digestion', 'circulation'],
    a: 'photosynthesis',
    e: '這個題目在描述植物如何利用光能進行能量轉換，使用了 "convert light energy into chemical energy" 這個短語來提示。而選項中只有 A. photosynthesis 符合這個描述，因為光合作用是指植物利用光合色素吸收陽光能量，將二氧化碳和水轉化為葡萄糖和氧氣的過程，這個過程就是將光能轉換為化學能的過程。而呼吸 (respiration)、消化 (digestion) 和循環 (circulation) 則與此不同，因此答案為 A. photosynthesis。',
}, {
    id: 4,
    q: 'The human __________ system is responsible for protecting the body from harmful substances and invading pathogens.',
    s: ['circulatory', 'respiratory', 'immune', 'nervous'],
    a: 'immune',
    e: '這個題目描述了一個保護身體免受有害物質和侵略性病原體侵害的系統。選項中只有 C. immune (免疫) 符合這個描述，因為免疫系統負責保護身體免受病毒、細菌、真菌等病原體的攻擊，以及防止異物進入體內，維持身體健康。而循環 (circulatory)、呼吸 (respiratory) 和神經 (nervous) 系統都不是負責這個功能的系統，因此答案為 C. immune。',
}, {
    id: 5,
    q: '______________ is the study of how living organisms interact with each other and with their environment.',
    s: ['Anatomy', 'Physiology', 'Ecology', 'Genetics'],
    a: 'Ecology',
    e: '這個題目描述了一個研究生物與其環境互動的領域。選項中只有 C. Ecology (生態學) 符合這個描述，因為生態學研究生物與環境之間的關係，包括生物之間的相互作用、物種與物種之間的關係、生物與非生物環境之間的關係等。而解剖學 (Anatomy)、生理學 (Physiology) 和遺傳學 (Genetics) 則分別研究生物體的結構、功能和遺傳機制，與生物與環境之間的關係不直接相關，因此答案為 C. Ecology。',
}, {
    id: 6,
    q: "The ___________ gland produces hormones that regulate the body's metabolism.",
    s: ['Thyroid', 'Pituitary', 'Adrenal', 'Pancreas'],
    a: 'Thyroid',
    e: '這個題目描述了一個腺體，該腺體產生調節人體代謝率的荷爾蒙。選項中只有甲狀腺 (Thyroid) 符合這個描述，因為甲狀腺荷爾蒙可以影響人體的新陳代謝率，從而影響身體的生理機能，例如心率、體溫和消化。垂體 (Pituitary)、腎上腺 (Adrenal) 和胰臟 (Pancreas) 分別分泌其他種類的荷爾蒙，與代謝率無關，因此答案為 A. Thyroid。',
}, {
    id: 7,
    q: 'The _________ War was a conflict that lasted from 1950 to 1953 between North Korea, which was supported by China and the Soviet Union, and South Korea, which was supported by the United States and other countries.',
    s: ['Vietnam', 'Gulf', 'Korean', 'Iraq'],
    a: 'Korean',
    e: '這個題目描述了一個戰爭，該戰爭持續了從1950年到1953年之間，參戰雙方分別為支持北韓的中國和蘇聯，以及支持南韓的美國和其他國家。只有選項 C. Korean 符合這個描述，因為其他選項分別代表不同的戰爭，如越南戰爭 (Vietnam War)、海灣戰爭 (Gulf War) 和伊拉克戰爭 (Iraq War)，與此題目所描述的戰爭無關。因此答案為 C. Korean。',
}, {
    id: 8,
    q: 'The ________ of the novel is full of twists and turns that keep readers on the edge of their seats.',
    s: ['plot', 'protagonist', 'theme', 'conflict'],
    a: 'plot',
    e: '這句話中的 "twists and turns" 暗示著這本小說的劇情複雜而曲折，因此空格處應填入描述小說劇情的詞彙。選項中只有 A. plot (劇情) 能夠恰當地填入空格，因此 A 為正確答案。B. protagonist (主角)、C. theme (主題) 和 D. conflict (衝突) 都不能夠恰當地填入空格。',
}, {
    id: 9,
    q: 'Despite having no prior acting experience, Emily managed to ________ the role of Juliet in the school play.',
    s: ['procure', 'exude', 'concede', 'secure'],
    a: 'secure',
    e: '在這個句子中，空格後面的“the role of Juliet in the school play”表示“Juliet這個角色在學校的話劇中”，所以我們需要找一個動詞，表示Emily“得到”了這個角色。A選項“procure”表示“取得”，也可以表示“購買”或“強迫”，但在這個句子中不合適。B選項“exude”表示“散發”，C選項“concede”表示“承認”，但它們都不符合句子的意思。因此，D選項“secure”表示“獲得”或“取得”，是正確的選項。',
}, {
    id: 10,
    q: 'The _______ is the central processing unit of a computer, which controls all other parts of the computer system.',
    s: ['monitor', 'keyboard', 'mouse', 'CPU'],
    a: 'CPU',
    e: '因為題目所描述的是電腦的中央處理器，而選項 A、B、C 則分別是顯示器、鍵盤和滑鼠。',
}, {
    id: 11,
    q: 'Despite the ___________ of the internet, some people still prefer reading books made from paper.',
    s: ['convenience', 'popularity', 'novelty', 'complexity'],
    a: 'convenience',
    e: '句子的意思是“儘管有互聯網，仍有些人喜歡閱讀用紙張印刷的書籍”。convenience是“方便”或“便利”的意思，符合句意。B. popularity表示“流行”，不符合句意；C. novelty表示“新奇”或“新穎”，也不符合句意；D. complexity表示“複雜”，同樣不符合句意。',
}, {
    id: 12,
    q: 'The teacher asked the students to submit a(n) _________ of their project before the deadline.',
    s: ['summary', 'analysis', 'evaluation', 'interpretation'],
    a: 'summary',
    e: '通常是簡潔而全面地概述整個文本或文章的主要內容，以便讓讀者可以快速了解它的核心思想和結論。B. analysis（分析）： 是一種細心研究文本或文章的方法，通常涉及特定主題、模式或細節，目的是理解和詮釋所分析的材料。C. evaluation（評價）： 是評估文本或文章質量的過程。 評估可以基於某種標準或範圍，可以是專業的或個人的。D. interpretation（解釋）： 是理解文本或文章的基本含義，通常基於個人或特定文化的背景和觀點。 解釋通常涉及詮釋文本或文章的意圖和目的，並可能導致對該材料的不同理解。解析：根據上下文，老師要求學生在最後期限之前提交一份「評價」，以便老師評估學生的項目。因此，答案是 C. evaluation（評價）。其他選項在上下文中不太適合，因為「摘要」不足以評估學生的項目，「分析」並不一定需要提交給老師，「解釋」與老師要求的不符。',
}, {
    id: 13,
    q: "The company's financial ____ showed that they had a net profit of $10 million last year.",
    s: ['statement', 'status', 'strategy', 'stimulation'],
    a: 'statement',
    e: '本題考查詞彙理解和應用能力。句子中說到“公司的財務____顯示他們去年有1000萬美元的淨利潤”，因此需要選出一個與“財務”相關、可以顯示公司利潤的單詞。根據常識可知，表示公司利潤的英文單詞為“statement”，因此選項 A 正確。選項 B 中的“status”表示“狀態”，選項 C 的“strategy”表示“策略”，選項 D 的“stimulation”表示“刺激”，均與句子意思不符，故為錯誤選項。因此，本題答案為 A。 ',
}, {
    id: 14,
    q: 'Despite being known as a shy person, John was surprisingly ___ at the party last night.',
    s: ['outgoing', 'reserved', 'introverted', 'timid'],
    a: 'outgoing',
    e: '本題考察形容詞在句子中的修飾作用，選擇正確的形容詞填入空格中。句子開頭已經明確表示約翰是一個較內向的人，因此需要在四個選項中選擇一個與此相反的形容詞。A選項的意思是外向的，B選項是內向的，C選項也是內向的，D選項的意思是膽小的。根據句子意思，John在昨晚的派對上表現出人意料之外的行為，因此應該選擇與內向相反的選項A，也就是outgoing，意思是外向的，與內向相反。正確答案：A. outgoing',
}, {
    id: 15,
    q: 'It is important to __________ a healthy and balanced diet to maintain good health.',
    s: ['eat', 'ate', 'eating', 'eats'],
    a: 'eat',
    e: '句子中缺少的是一個動詞，而主語是 “it” ，根據主語是單數，所以選項中只有 A 和 D 可能是正確答案。但是，因為是要講述維持健康，所以選項 A 用現在式的 “eat” 更合適。選項 B 的 “ate” 是過去式，不符合文意。選項 C 的 “eating” 是進行式，也不符合文意。選項 D 的 “eats” 是第三人稱單數現在式，文意對但主語不符。因此，正確答案是 A. eat。',
}, {
    id: 18,
    q: 'In order to _____ for the upcoming exam, he spent hours every day reviewing his notes and practicing problems.',
    s: ['revise', 'reject', 'release', 'regulate'],
    a: 'revise',
    e: '這句話的意思是為了準備即將到來的考試，他每天花了幾個小時複習筆記和練習問題。根據句意，應該用一個表示“修訂、修改”的詞來填空。A. revise 符合句意，表示“修訂、修改”，為正確答案。B. reject 表示“拒絕、排斥”，與句意不符。C. release 表示“釋放、發行”，與句意不符。D. regulate 表示“調節、管理”，與句意不符。因此，正確答案為 A. revise。',
}, {
    id: 19,
    q: 'The young athlete was _____ to give up his Olympic dreams after suffering a severe injury during training.',
    s: ['forced', 'refused', 'expected', 'encouraged'],
    a: 'forced',
    e: '根據題意，這位年輕的運動員因受傷而要放棄他的奧運夢想。從文意來看，他被迫要做出這個決定。因此，選項 A "forced"（被迫）是正確的答案。選項 B "refused"（拒絕）和選項 D "encouraged"（鼓勵）都與文意不符，因為這位運動員受傷後沒有選擇放棄是因為他被迫這樣做。選項 C "expected"（預期）也與文意不符。儘管教練和團隊可能意識到這位運動員的受傷可能會對他的夢想產生影響，但他們並沒有期望他放棄，而是被迫要做出這個決定。因此，答案是 A "forced"。',
}, {
    id: 0,
    q: "The Mona Lisa, a portrait painted by Leonardo da Vinci, is widely considered one of the greatest works of art of all time. It was painted in the 16th century and depicts a woman with a mysterious smile. The painting is housed in the _____ Museum in Paris, France.",
    s: ["Metropolitan", "Smithsonian", "Louvre", "Guggenheim"],
    a: "Louvre",
    e: "題目描述了著名的「蒙娜麗莎」畫作，並指出該畫作現存於哪個博物館。四個選項中，只有 C 選項「羅浮宮博物館」是該畫作現存的所在地，因此 C 是正確的答案。其他三個選項分別是紐約大都會博物館（Metropolitan Museum of Art）、史密森尼學會（Smithsonian Institution）、古根海姆博物館（Guggenheim Museum），與此畫作無關。",
}, {
    id: 1,
    q: "Global warming, also known as climate change, is the long-term _____ in Earth's average temperature. This increase in temperature is primarily caused by the release of greenhouse gases, such as carbon dioxide, into the atmosphere by human activities.",
    s: ["decrease", "stability", "fluctuation", "increase"],
    a: "increase",
    e: "題目提到全球暖化，說明了它是地球平均溫度長期上升的現象。四個選項中，只有 D 選項「增加」符合文意，因此 D 是正確的答案。其他三個選項分別是「減少」（decrease）、「穩定」（stability）、「波動」（fluctuation），都與全球暖化的現象不符。",
}, {
    id: 2,
    q: "The _____ is the process by which living organisms use energy from sunlight to convert carbon dioxide and water into organic compounds, such as carbohydrates, proteins, and fats.",
    s: ["photosynthesis", "respiration", "digestion", "circulation"],
    a: "photosynthesis",
    e: "題目描述了一種生物過程，即利用陽光能量將二氧化碳和水轉化為有機化合物。四個選項中，只有 A 選項「光合作用」符合文意，因此 A 是正確的答案。其他三個選項分別是「呼吸」（respiration）、「消化」（digestion）和「循環」（circulation），與此生物過程不符。",
}, {
    id: 3,
    q: "The _____ is the basic unit of life, consisting of a cell membrane, cytoplasm, and genetic material in the form of DNA.",
    s: ["cell", "organ", "tissue", "organism"],
    a: "cell",
    e: "題目描述了生命的基本單位，包括細胞膜、細胞質和以 DNA 形式存在的遺傳物質。四個選項中，只有 A 選項「細胞」符合文意，因此 A 是正確的答案。其他三個選項分別是「器官」（organ）、「組織」（tissue）和「生物體」（organism），都不是生命的基本單位。",
}, {
    id: 4,
    q: "The _____ is the part of a neuron that receives signals from other neurons or sensory receptors.",
    s: ["axon", "dendrite", "synapse", "myelin sheath"],
    a: "dendrite",
    e: "題目描述了神經元的一個部分，即接收來自其他神經元或感覺受器的信號。四個選項中，只有 B 選項「樹突」符合文意，因此 B 是正確的答案。其他三個選項分別是「軸突」（axon）、「突觸」（synapse）和「髓鞘」（myelin sheath），它們是神經元的其他結構，不是接收信號的部分。",
}, {
    id: 5,
    q: "In the process of photosynthesis, light energy is converted into chemical energy in the form of _____.",
    s: ["glucose", "oxygen", "water", "carbon dioxide"],
    a: "glucose",
    e: "題目描述了光合作用這個過程，問題要求找出光能轉換成的化學能的形式。四個選項中，只有 A 選項「葡萄糖」符合文意，因此 A 是正確的答案。光合作用的化學方程式可以寫作：6CO2 + 6H2O + 光能 → C6H12O6 + 6O2。在這個方程式中，光能轉換成的化學能以葡萄糖的形式儲存。B、C、D 三個選項分別是「氧氣」（oxygen）、「水」（water）和「二氧化碳」（carbon dioxide），都是光合作用過程中的反應物，不是光能轉換成的化學能形式。",
}, {
    id: 6,
    q: "The _____ system is responsible for regulating the body's response to stress and maintaining homeostasis.",
    s: ["nervous", "endocrine", "digestive", "respiratory"],
    a: "endocrine",
    e: "題目描述了一個調節身體對壓力反應和維持內部平衡的系統。四個選項中，只有 B 選項「內分泌系統」符合文意，因此 B 是正確的答案。內分泌系統是由各種分泌激素的腺體組成，它們通過血液將激素傳遞到身體的各個部位，調節生理過程並維持身體的內部平衡。其他三個選項分別是「神經系統」（nervous）、「消化系統」（digestive）和「呼吸系統」（respiratory），它們也都是身體的調節系統，但不是這道題目所描述的那一個。",
}, {
    id: 7,
    q: "_____, along with ribosomes, is responsible for protein synthesis in cells.",
    s: ["Mitochondria", "Nucleus", "Golgi apparatus", "Endoplasmic reticulum"],
    a: "Endoplasmic reticulum",
    e: "題目描述了一個負責細胞內蛋白質合成的組織。四個選項中，只有 D 選項「內質網」符合文意，因此 D 是正確的答案。內質網是一個由膜系統構成的細胞器，它可以分為粗面內質網和平滑內質網兩種。粗面內質網表面有許多固定的核糖體，負責蛋白質的合成，而平滑內質網則參與脂質代謝和其他生化過程。其他三個選項分別是「粒線體」（mitochondria）、「細胞核」（nucleus）和「高爾基體」（Golgi apparatus），它們在細胞內有不同的功能，但都不是負責蛋白質合成的主要細胞器。",
}, {
    id: 8,
    q: "The _____ of the internet has revolutionized the way we communicate and access information.",
    s: ["creation", "create", "creating", "created"],
    a: "created",
    e: "題目描述了一個已經發生的事實，因此需要使用過去式來形容這個過去的動作。四個選項中，只有 D 選項「創造」的過去式形式「created」符合文意，因此 D 是正確的答案。其他三個選項都是現在式或進行式形式，與描述的過去事實不符。注意，文法測試中常常會使用不同的時態來測試學生對英語時態的掌握程度。",
}, {
    id: 9,
    q: "The students, _____ are all from China, are attending an English language program in the United States.",
    s: ["who", "whom", "which", "whose"],
    a: "who",
    e: "題目描述了一個修飾「學生」的從句，需要使用關係代詞來引導從句。根據句意，需要用主格關係代詞，修飾「學生」。四個選項中，只有 A 選項「who」符合文意，因此 A 是正確的答案。B 選項「whom」是受格關係代詞，C 選項「which」則是用來修飾物體的關係代詞，D 選項「whose」則是用來表示所有關係的關係代詞。注意，英語中不同的關係代詞有不同的用法，學生應該掌握各種關係代詞的區別和用法。",
}, {
    id: 10,
    q: "The _____ the storm, the more difficult it was to drive.",
    s: ["harder", "hardest", "more hard", "most hard"],
    a: "harder",
    e: "題目要求選出一個表示程度比較的形容詞，根據文意可知，雨越大越難開車，因此需要使用比較級來修飾形容詞。四個選項中，只有 A 選項「harder」是比較級，符合文意，因此 A 是正確的答案。B 選項「hardest」是最高級，C 選項「more hard」和 D 選項「most hard」都是錯誤的形式。注意，學生在學習形容詞比較級時，需要掌握規則變化和不規則變化的形容詞，並熟悉各種比較級和最高級的用法。",
}, {
    id: 11,
    q: "The teacher asked the students to _____ the book and write a report.",
    s: ["read", "reading", "have read", "reads"],
    a: "read",
    e: "題目要求填入一個動詞，表示讓學生「讀」一本書並寫報告。根據句子結構可知，需要用不定式作為賓語。四個選項中，只有 A 選項「read」是不定式形式，符合文意，因此 A 是正確的答案。B 選項「reading」是現在分詞形式，C 選項「have read」是完成式形式，D 選項「reads」是第三人稱單數形式，都不符合文意。注意，學生在學習動詞不定式時，需要掌握其在句子中的用法和形式，並熟悉不同形式動詞的區別和用法。",
}, {
    id: 12,
    q: "The singer's voice is so _____ that it can move people to tears.",
    s: ["beautiful", "beautifully", "beauty", "beautify"],
    a: "beautiful",
    e: "題目要求填入一個形容詞，形容歌手的聲音「美麗」到可以感動人們落淚。根據句子結構可知，需要用形容詞修飾「voice」。四個選項中，只有 A 選項「beautiful」是形容詞形式，符合文意，因此 A 是正確的答案。B 選項「beautifully」是副詞形式，C 選項「beauty」是名詞形式，D 選項「beautify」是動詞形式，都不符合文意。注意，學生在學習形容詞時，需要掌握其在句子中的修飾對象和位置，並熟悉不同形式形容詞的區別和用法。",
}, {
    id: 13,
    q: "My grandmother is a _____ of strength and resilience.",
    s: ["model", "modelled", "modelling", "models"],
    a: "model",
    e: "題目要求填入一個名詞，形容奶奶是「堅強」和「有韌性」的榜樣。根據句子結構可知，需要用名詞表示奶奶的角色和特徵。四個選項中，只有 A 選項「model」是名詞形式，符合文意，因此 A 是正確的答案。B 選項「modelled」是過去分詞形式，C 選項「modelling」是現在分詞形式，D 選項「models」是動詞第三人稱單數形式，都不符合文意。注意，學生在學習名詞時，需要了解不同名詞的分類和用法，掌握名詞在句子中的主、賓、表等角色。",
}, {
    id: 14,
    q: "The teacher was _______ with the student's progress.",
    s: ["please", "pleased", "pleasing", "pleasure"],
    a: "pleased",
    e: "題目要求填入一個形容詞，形容老師對學生的進步感到「高興」。根據句子結構可知，需要用形容詞作表語形容老師的感覺。四個選項中，只有 B 選項「pleased」是形容詞形式，符合文意，因此 B 是正確的答案。A 選項「please」是動詞形式，C 選項「pleasing」是現在分詞形式，D 選項「pleasure」是名詞形式，都不符合文意。注意，學生在學習形容詞時，需要了解不同形容詞的分類和用法，掌握形容詞在句子中的用法和修飾對象。",
}, {
    id: 15,
    q: "The athlete was _____ to have won the gold medal.",
    s: ["thrill", "thrilling", "thrilled", "thrills"],
    a: "thrilled",
    e: "題目要求填入一個形容詞，形容這名運動員對於贏得金牌的感覺。根據句子結構可知，需要用形容詞作表語形容運動員的感覺。四個選項中，只有 C 選項「thrilled」是形容詞形式，符合文意，因此 C 是正確的答案。A 選項「thrill」是動詞或名詞形式，B 選項「thrilling」是現在分詞形式，D 選項「thrills」是名詞或動詞形式，都不符合文意。注意，學生在學習形容詞時，需要了解不同形容詞的分類和用法，掌握形容詞在句子中的用法和修飾對象。",
}, {
    id: 16,
    q: "The teacher asked the students to _____ a poem for homework.",
    s: ["analysis", "analyze", "analyzed", "analyzing"],
    a: "analyze",
    e: "題目要求填入一個動詞，指示老師要求學生做的事情。根據句子結構可知，需要填入原形動詞作為動詞不定式，表示「分析一首詩」。四個選項中，只有 B 選項「analyze」是原形動詞形式，符合文意，因此 B 是正確的答案。A 選項「analysis」是名詞形式，C 選項「analyzed」是過去分詞形式，D 選項「analyzing」是現在分詞形式，都不符合文意。注意，學生在學習動詞時，需要了解動詞的不同形式和用法，掌握動詞在句子中的用法和時態變化。",
}, {
    id: 17,
    q: "The concert _____ place in the park, but it was cancelled due to bad weather.",
    s: ["suppose", "supposed", "supposing", "supposes"],
    a: "supposed",
    e: "題目要求填入一個動詞，表示「音樂會」是否舉辦。根據句子結構可知，需要填入過去式動詞，表示「音樂會原本計畫在公園舉辦，但因為天氣不佳而取消了」。四個選項中，只有 B 選項「supposed」是過去式動詞形式，符合文意，因此 B 是正確的答案。A 選項「suppose」是原形動詞形式，C 選項「supposing」是現在分詞形式，D 選項「supposes」是現在式動詞形式，都不符合文意。注意，學生在學習動詞時，需要了解動詞的不同形式和用法，掌握動詞在句子中的用法和時態變化。",
}, {
    id: 18,
    q: "I have been studying English for five years, but I still find it _____ to speak fluently.",
    s: ["challenge", "challenging", "challenged", "challenges"],
    a: "challenging",
    e: "題目要求填入一個形容詞，表示「說英語」對我來說是什麼感覺。根據句子結構可知，需要填入形容詞「-ing」形式，表示「說英語是有挑戰性的」。四個選項中，只有 B 選項「challenging」是形容詞「-ing」形式，符合文意，因此 B 是正確的答案。A 選項「challenge」是名詞或動詞形式，C 選項「challenged」是過去式或被動語態形式，D 選項「challenges」是動詞現在式形式，都不符合文意。注意，學生在學習形容詞時，需要了解形容詞的不同形式和用法，掌握形容詞在句子中的用法和修飾對象。",
}, {
    id: 20,
    q: "The students in the school band have been practicing every day for the upcoming concert, but they still have a few sections that need to be __________.",
    s: ["rehearsed", "revised", "refrained", "reflected"],
    a: "rehearsed",
    e: "這道題目測試了學生對於動詞 rehearsed 的理解。在句子中，rehearsed 的意思是練習、排練，符合文意。revised 的意思是修改、修正，不符合句子的語境。refrained 的意思是克制、戒除，也不符合文意。reflected 的意思是反映、映射，與句子意思不符合。因此，選項 1. rehearsed 是正確答案。",
}, {
    id: 21,
    q: "The art exhibit will be open to the public __________ the end of the month.",
    s: ["from", "for", "until", "since"],
    a: "until",
    e: "這道題目測試了學生對於介系詞 until 的理解。在句子中，until 的意思是直到，符合文意。from 的意思是從......開始，不符合文意。for 的意思是為......的期間，也不符合句子的語境。since 的意思是自......以來，與句子意思不符合。因此，選項 3. until 是正確答案。",
}, {
    id: 22,
    q: "The __________ of the test will be announced next week.",
    s: ["scores", "grade", "result", "mark"],
    a: "result",
    e: "這道題目測試了學生對於考試相關詞彙的認識。在句子中，result 代表的是考試成績或測試結果，符合文意。scores 表示多項測試的得分，不符合文意。grade 通常是指學年成績，與句子意思不符合。mark 則是通常表示的是單一試卷上的得分，不符合句子意思。因此，選項 3. result 是正確答案。",
}, {
    id: 23,
    q: "The new school policy regarding dress code has been ____________ by many students.",
    s: ["adapted", "adopted", "adept", "adapt"],
    a: "adopted",
    e: "這個句子的主詞是 “school policy”（學校規定），動詞是 “has been”（被），缺少的克漏字應該是一個形容詞或過去分詞，用來描述 “school policy”（學校規定）被什麼樣的動作所影響。選項 (A) 的 “adapted” 表示「改編、改寫」，但是在這個句子中並不適當，因為這裡的學校規定是被影響，而不是被改編或改寫。選項 (C) 的 “adept” 表示「熟練、擅長」，在這個句子中也不合適，因為這個形容詞無法描述 “school policy”（學校規定）被影響的情況。選項 (D) 的 “adapt” 表示「適應、適合」，雖然用字形式正確，但是缺少動詞過去分詞的形式，因此不適用於這個句子中。選項 (B) 的 “adopted” 表示「採用、領養、接受」，符合這個句子的語境，表示「新的校規被許多學生所接受（adopted）」，因此是正確答案。因此，答案是 (B) adopted。",
}, {
    id: 24,
    q: "Despite the __________ of studying abroad, it's often difficult to leave behind one's family and friends.",
    s: ["convenience", "opportunity", "competition", "obligation"],
    a: "opportunity",
    e: "此題考察的是選擇詞彙的能力，考生需要通讀全句，將空格所在句子的意思理解清楚，並在選項中選出最符合句意的一個。根據句子意思，本句表達離家留學的困難，由此可知選項 A. convenience 不符合句意；選項 C. competition 更不合適，所以可以排除。選項 D. obligation 是指義務、責任，明顯不符合語境。而選項 B. opportunity 則為「機會」之意，符合句意，為正確答案。因此，答案為 B. opportunity，表示「儘管留學有機會，但是要離開家人和朋友還是很難的。」",
}, {
    id: 26,
    q: "The new rule requires that all employees ________ their work schedules at least one week in advance.",
    s: ["submit", "will submit", "submitting", "to submit"],
    a: "submit",
    e: "這是一個動詞時態和形式的問題。句子中的 requires 是現在時，因此動詞應該使用現在式，而 submit 是不定式，表示將來，因此應該使用原形 submit，而不是選項 B 中的 will submit。選項 C 中的 submitting 是現在進行式，意思不符合句意。因此，正確答案為選項 A 中的 submit，而選項 D 中的 to submit 雖然形式正確，但不必要，因為主句中已經包含了必要的語氣詞 requires。",
}, {
    id: 27,
    q: "The __________ of the novel is the climax where the main character finally confronts his arch-nemesis.",
    s: ["setting", "theme", "plot", "protagonist"],
    a: "plot",
    e: "plot（情節）指的是一個故事中的主要事件和行動，包括開頭、發展、高潮和結局。在這句話中，文法上需要用到的是“the climax of the novel”（小說的高潮），所以答案應該是描述小說中的情節（plot）的選項 C。A. setting（背景）是指小說中的時間、地點和環境等背景設定，並不是這個問題的正確答案。B. theme（主題）是小說中蘊含的觀念、訊息或思想，與這句話的內容並不相符，因此也不是正確答案。D. protagonist（主角）是指故事中的主要角色，而不是故事的情節，因此也不是正確答案。因此，答案是 C. plot（情節）。",
}, {
    id: 28,
    q: "She suggested that we ____ a hotel rather than a hostel.",
    s: ["stay in", "to stay in", "staying in", "stayed in"],
    a: "stay in",
    e: "本句是一個建議句型，主語是 She，動詞是 suggested，that 引導的是一個虛擬語氣的從句，從句中的動詞要使用原形。因此，本句的正確語法是 stay in，選項 A 是唯一符合語法的選項。選項 B to stay in 中的 to 是不必要的，選項 C staying in 中的 -ing 形式表示進行，不符合虛擬語氣的要求，選項 D stayed in 中的過去式也不符合語境，因此都不是正確答案。",
}, {
    id: 29,
    q: "She is one of the most talented singers I have ever heard, and her new album is _______ to be a huge success.",
    s: ["expect", "expecting", "expected", "expects"],
    a: "expected",
    e: "根據前文的時態，句子主語 She 是現在時，所以動詞要用現在式，而 her new album 則是未來式，所以選項中只有 C. expected 符合文法和時態，表示預期未來的事情，是最佳答案。正確答案：C. expected",
}, {
    id: 30,
    q: "Despite the rain, he still went out for a jog because he didn't want to __________ his exercise routine.",
    s: ["disrupt", "improve", "determine", "conduct"],
    a: "disrupt",
    e: "本句中使用了 despite 表示「儘管」，所以後面的句子應該表達相反的意思，即「儘管下雨，他仍然去慢跑」。因此選項 (A) disrupt 表示「打亂」，符合句意。選項 (B) improve 表示「改善」，與句意不符；選項 (C) determine 表示「決定」，並不符合文意；選項 (D) conduct 表示「進行」，也不符合文意。",
}, {
    id: 31,
    q: "Although she had never been there before, she was able to navigate her way around the __________ easily.",
    s: ["airport ", "mall ", "museum ", "city"],
    a: "city",
    e: "根據前半句 Although she had never been there before 可知她從未去過這個城市，因此她能夠輕鬆地在城市中找到路，因此正確答案是D. city。A. airport是機場，B. mall是商場，C. museum是博物館，與文意不符。",
}, {
    id: 32,
    q: "Despite __________ to study for the exam, he still managed to pass it with flying colors.",
    s: ["not having enough time", "not having had enough time", "haven't had enough time", "not having enough times"],
    a: "not having enough time",
    e: "這句話中缺少的是一個名詞片語，用來表示他缺乏的是什麼。正確的片語是 not having enough time，表示他沒有足夠的時間學習，但他仍然以亮麗的成績通過了考試。選項 B 中的動詞時態不正確，應為現在完成式；選項 C 中的現在完成式時態和主語不符；選項 D 中的 times 應該改為 time 才正確。",
}, {
    id: 33,
    q: "The use of technology ________ changed the way we live our lives.",
    s: ["has", "had", "have", "having"],
    a: "has",
    e: "這是一道動詞時態的題目，空格前面有定冠詞 the，表示這是一個特定的、已經存在的事實，所以要用現在完成式，表示從過去一直持續到現在的情況，選項中只有 A 選現在完成式，所以答案為 A。選項解釋：A. has (現在完成式，表示從過去到現在一直發生的動作或狀態)B. had (過去完成式，表示在過去某個時間或事件之前已經發生或完成的動作或狀態)C. have (現在簡單式，表示經常或習慣性的動作或狀態，與定冠詞 the 不符合)D. having (現在分詞，通常作為動詞的補語或作為句子的非謂語動詞，與句意不符合)",
}, {
    id: 34,
    q: "Although John was ____ to come to the party, he didn't show up.",
    s: ["invited", "being invited", "inviting", "having invited"],
    a: "invited",
    e: "這是一個動詞的被動語態的考察。句子主語是John，表示他是被邀請的人。因此，要用被動語態的「be invited」，且根據句子的時態，應該使用過去式的「was invited」。在選項中，只有(A) invited符合這個規則，所以是正確答案。(B) being invited是現在進行式的被動語態，不符合時態和意思。(C) inviting是現在分詞的主動語態，不符合意思。(D) having invited是現在完成式的被動語態，也不符合時態和意思。",
}, {
    id: 35,
    q: "______ to the party, we missed all the fun.",
    s: ["Not going", "Not having gone", "Not gone", "Having not gone"],
    a: "Not gone",
    e: "這是一個分詞構句的句子，需要選擇一個分詞形式作為答案。分詞構句由分詞與其前面的主詞或句子連接而成，分詞的形式可以是現在分詞 (-ing) 或過去分詞 (-ed)。當分詞作為主語補語時，使用現在分詞，當分詞作為主語之外的補語時，使用過去分詞。在這個句子中，主句是 “we missed all the fun”，缺少了一個分詞形式來作為主語的補語。選項 (A) Not going 使用了現在分詞的形式，但是在這裡不合適，因為 not going 表示的是動作的否定，但是在這裡需要表達缺少了這個動作導致的結果，因此需要使用過去分詞形式。選項 (B) Not having gone 是現在完成式的形式，也使用了過去分詞形式，但是這裡不合適，因為現在完成式強調的是一個動作或狀態對現在的影響或重要性，但是這個句子中並不需要強調這個意思。選項 (C) Not gone 是過去分詞的形式，正確地表達了缺少了動作所帶來的結果，因此是正確的選項。選項 (D) Having not gone 是現在完成式的形式，使用了現在完成式和過去分詞形式，但是和選項 (B) 的問題一樣，這裡也不合適。因此，答案是 (C) Not gone。",
}, {
    id: 36,
    q: "In the library, there are many books that ____ different kinds of knowledge, such as science, literature, and history.",
    s: ["contain", "contains", "containing", "contained"],
    a: "containing",
    e: "這道題考查的是主語和謂語在數上的一致性。主語是 many books，是複數形式，因此謂語動詞也要用複數形式。選項 A 和 B 的動詞 contain 和 contains 都是單數形式的，不符合主謂數上的一致性，排除。選項 D 的動詞 contained 是過去式，也不符合時態的要求，排除。只有選項 C 的動詞 containing 是現在分詞形式，符合主謂數和時態上的要求，正確答案是 C。",
}, {
    id: 0,
    q: "She __________ studying English for six years when she moved to the United States.",
    s: ["had been", "has been", "was", "is"],
    a: "had been",
    e: "此題是過去完成式的動詞時態。'had been' 表示在過去的某一時間點之前已經完成的動作。在這個句子中，'moved to the United States' 是過去發生的事情，因此 'had been' 是正確的選擇。",
}, {
    id: 1,
    q: "If I _______ enough money, I would buy a car.",
    s: ["have", "had", "will have", "would have"],
    a: "had",
    e: "此題是虛擬語氣的條件句，表示虛擬的情況，因此動詞時態需要用過去式。'had' 表示過去擁有過這樣的情況。在這個句子中，如果當前沒有足夠的錢，就無法買車，所以需要使用虛擬語氣，因此 'had' 是正確的選擇。",
}, {
    id: 2,
    q: "She is always the first one _______ class every day.",
    s: ["to arrive at", "arrives at", "arriving at", "arrived at"],
    a: "to arrive at",
    e: "此題考察的是動詞不定式的用法。'the first one to arrive at class' 表示第一個到達教室的人。動詞不定式 'to arrive' 在這個句子中作為形容詞用，修飾 'the first one'，因此應該使用 'to arrive at'。",
}, {
    id: 3,
    q: "I will go to the concert with you _______ I finish my homework.",
    s: ["before", "since", "after", "when"],
    a: "before",
    e: "此題是連接詞的用法。'before' 表示在某個時間或事件之前發生另一件事情，符合句意。因此，'before' 是正確選擇。",
}, {
    id: 4,
    q: "I have never seen a movie that is _______ scary.",
    s: ["so", "such", "very", "too"],
    a: "such",
    e: "此題是形容詞的用法。'such' 表示這樣的、如此的，用來形容後面的形容詞 'scary'，符合句意。因此，'such' 是正確選擇。",
}, {
    id: 5,
    q: "John is always the first person _______ to class.",
    s: ["arrive", "arrived", "arriving", "to arrive"],
    a: "to arrive",
    e: "此題是不定式的用法。'to arrive' 表示到達，用來修飾 'the first person'，符合句意。因此，'to arrive' 是正確選擇。",
}, {
    id: 6,
    q: "The teacher told us that _______ before class.",
    s: ["we had to be quiet", "we have to be quiet", "we had to been quiet", "we have to been quiet"],
    a: "we had to be quiet",
    e: "此題是間接引語的用法。 'told' 表示說、告訴，後面接直接引語 'You have to be quiet'。當將直接引語轉換成間接引語時，動詞必須改變時態，因為直接引語是現在式，所以間接引語需要改為過去式 'had to'。因此，'we had to be quiet' 是正確選擇。",
}, {
    id: 7,
    q: "Not only _____ to the party last night, but she also brought a delicious cake.",
    s: ["she came", "did she come", "she comes", "does she come"],
    a: "did she come",
    e: "此題是倒裝句的用法。'Not only' 是表示 '不僅'，通常與 'but also' 搭配使用，意思是除了某件事情之外，還有其他的事情。在 'not only ... but also' 的句型中，主語和助動詞須倒裝，放在句首。因此正確的答案是 'did she come'，而其他選項 'she came'、'she comes'、'does she come' 都不符合倒裝句的用法。",
}, {
    id: 8,
    q: "The company's profits have increased _____ since they launched their new product line.",
    s: ["significantly", "signification", "signified", "signify"],
    a: "significantly",
    e: "此題是形容詞副詞的用法。句子中需要一個副詞來修飾動詞 'increased'，表示程度或程度大小。'Significantly' 是副詞，意思是 '顯著地'、'明顯地'。而其他選項 'signification'、'signified'、'signify' 都不是副詞，也不適用於此句中的語境。因此正確的答案是 'significantly'。",
}, {
    id: 9,
    q: "The teacher suggested that we _____ the exam to the following week.",
    s: ["delay", "delayed", "delaying", "delays"],
    a: "delay",
    e: "此題是情態動詞的用法。在這個句子中，'suggested' 是主要動詞，表示 '建議'，而 'delay' 是情態動詞，表示 '延遲'。當情態動詞用於建議或命令的語氣時，後面的動詞必須使用原形動詞。因此正確的答案是 'delay'，而其他選項 'delayed'、'delaying'、'delays' 均不適用於此句中的語境。",
}, {
    id: 10,
    q: "The concert was so loud that it _____ my ears.",
    s: ["hurts", "hurt", "has hurt", "was hurting"],
    a: "hurt",
    e: "此題是時態和動詞形式的考察。'was' 表示過去式，'hurt' 是動詞的過去式，符合時態和動詞形式的要求。而其他選項 'hurts'、'has hurt'、'was hurting' 則不符合過去式的要求，因此不是正確答案。",
}, {
    id: 11,
    q: "If I _____ you, I would quit that job.",
    s: ["am", "was", "were", "will be"],
    a: "were",
    e: "此題是虛擬語氣的考察。在虛擬語氣的條件子句中，如果主語是第一人稱單數 'I'，應該使用 'were'，而不是 'was'。其他選項 'am'、'will be' 則表示真實的情況，不符合虛擬語氣的要求，因此也不是正確答案。",
}, {
    id: 12,
    q: "The teacher suggested that John _____ the assignment before the due date.",
    s: ["finish", "finishes", "finished", "has finished"],
    a: "finish",
    e: "此題是 Subjunctive Mood（虛擬語氣）的考察。在 Subjunctive Mood 中，動詞不用於人稱或數量的變化，因此要用原形動詞。因為 'suggested' 後面接的是 'that' 子句，而 'that' 子句中的動詞就要用原形動詞。其他選項 'finishes'、'finished'、'has finished' 都不是原形動詞，因此不是正確答案。",
}, {
    id: 13,
    q: "Neither the teacher nor the students _____ satisfied with the results.",
    s: ["is", "are", "were", "be"],
    a: "are",
    e: "此題是主謂一致性的考察。由於 'neither...nor' 表示否定並列，因此主詞為複數形式，故動詞要用複數形式。選項 A. is 和選項 D. be 都是單數形式的動詞，因此不是正確答案。選項 C. were 過去式，和句中的時間矛盾，因此也不是正確答案。正確答案是 B. are，為複數形式的現在式動詞。",
}, {
    id: 14,
    q: "She _______ her phone at home yesterday.",
    s: ["forgot", "forget", "had forgot", "had forget"],
    a: "forgot",
    e: "此題是過去式的考察。由於句中已經使用了過去式 'yesterday'，因此動詞也要用過去式。選項 A. forgot 和選項 B. forget 的差別在於 forgot 是過去式，而 forget 是現在式。選項 C. had forgot 和選項 D. had forget 則是過去完成式，不適用於此句。因此，正確答案是 A. forgot。",
}, {
    id: 15,
    q: "He will not come to the party, _______?",
    s: ["will he", "won't he", "does he", "doesn't he"],
    a: "will he",
    e: "此題是反意疑問句的考察。反意疑問句是由一個陳述句和一個疑問句組成，通常用於尋求確認或強調，其基本形式為：陳述句 + 疑問句助動詞。在此句中，陳述句為 'He will not come to the party'，疑問句助動詞應該使用與陳述句相反的形式，即 will 要變成 will not，然後加上主詞 he，得到選項 A. will he。選項 B. won't he 則是把否定詞 won't 用在疑問句中，不適用於此句。選項 C. does he 和選項 D. doesn't he 則是用疑問詞 does 和 doesn't，也不符合反意疑問句的基本形式。因此，正確答案是 A. will he。",
}, {
    id: 16,
    q: "______________ the time he arrived at the party, most of the guests had already left.",
    s: ["At", "By", "In", "On"],
    a: "By",
    e: "句中使用了「most of the guests had already left」表示大多數客人已經離開，因此可以得知他到達派對時，大多數的客人已經走了。而答案選項中，只有 B 選項「By」可以表示「到（某個時間）時已經…」的意思，符合句意。另外，「at」表示「在某個時間」、「in」表示「在某個時間段」、「on」表示「在某個特定的日子或日期」，不符合句意。",
}, {
    id: 17,
    q: "Although it was raining, ____________ to the game.",
    s: ["we still went", "we still go", "we are still going", "we still gone"],
    a: "we still went",
    e: "本題考察的是動詞的時態用法。根據句子的時間點，動詞應使用過去式，表示過去某個時間發生的動作，因此選項 A. we still went 是正確的。選項 B. we still go 是現在式，選項 C. we are still going 是現在進行式，選項 D. we still gone 是過去分詞，皆不符合文法規則，因此排除。",
}, {
    id: 18,
    q: "The company has __________ its sales target for the year by 20 percent, thanks to the new marketing strategy.",
    s: ["exceeded", "succeeded", "proceeded", "seceded"],
    a: "exceeded",
    e: "根據句子意思，這家公司由於新的行銷策略，已將年度銷售目標提高了 20％，因此需要填入一個表示'超過、突破'的動詞。因此選項 a. 'exceeded' 正確，表示 '超過、突破'。選項 b. 'succeeded' 表示 '成功'，不符合句意；選項 c. 'proceeded' 表示 '繼續進行'，也不符合句意；選項 d. 'seceded' 表示 '脫離、分離'，更不符合句意。因此，答案為選項 a. 'exceeded'。",
}, {
    id: 19,
    q: "The students were ____________ when they found out about the surprise test.",
    s: ["surprising", "surprised", "surprise", "surprisingly"],
    a: "surprised",
    e: "這是一個形容詞的用法問題，問題中空格前面是 were，這是 be 動詞的過去式，所以需要填入形容詞的過去式形式，表示被動作影響後的情況。選項 a. surprising 是形容詞的現在分詞形式，不符合時態和語境。選項 b. surprised 是形容詞的過去分詞形式，符合時態和語境，正確答案。選項 c. surprise 是名詞形式，不符合文法和語境。選項 d. surprisingly 是副詞形式，不符合文法和語境。因此，正確答案是選項 b. surprised。",
}, {
    id: 20,
    q: "Despite studying very hard, Emily _______ to pass the final exam.",
    s: ["failed", "has failed", "would fail", "will fail"],
    a: "failed",
    e: "這題考查動詞時態的選擇，因為文章使用了過去式的 'studied'，所以接下來的動詞時態應該也是過去式，因此選項 B 和 D 可以排除。考慮到上下文的意思，表示雖然 Emily 用功讀書，但還是沒有及格，因此應選用過去式的 'failed'，因此答案為 A。C 選項表示未來可能性，與文意不符。答案：A. failed",
}, {
    id: 21,
    q: "The teacher asked the class to be ________ while he explained the new lesson.",
    s: ["quiet", "quite", "quit", "quick"],
    a: "quiet",
    e: "該句中的空格需要填入一個形容詞，並且要表示安靜。在這裡，只有 A. quiet 符合文意，因為 B. quite 意思是“相當”，C. quit 意思是“停止”，D. quick 意思是“快速的”，都與文意不符。因此，正確答案是 A. quiet。",
}, {
    id: 22,
    q: "_________ a good book is like a conversation with a smart person who lived in the past.",
    s: ["To read", "Reading", "Reads", "Read"],
    a: "Reading",
    e: "這是一道主詞為 'a good book' 的句子，要用現在分詞來當作形容詞來形容主詞。'To read' 是不定詞，用來表示動作的目的；'reads' 是現在簡單式，表示現在的習慣或狀態；'read' 則是過去式，與句子主詞不符合。因此，正確答案是 B. Reading，表示 '閱讀' 的動名詞形式。句意為：閱讀一本好書就像是和過去聰明的人進行對話一樣。",
}, {
    id: 23,
    q: "Despite __________ much larger than its closest relative, the giant panda, the polar bear is actually a subspecies of the brown bear.",
    s: ["is", "are", "being", "been"],
    a: "is",
    e: "這是一個考查現在分詞的題目。本句主語為polar bear（北極熊），介系詞後面的短語 much larger than its closest relative（比其最親近的親戚要大得多）是一個形容詞片語，作polar bear的后置定語，修飾polar bear。因為介詞後面的短語修飾的是主語，所以這個句子的謂語動詞要和主語保持一致。因此，我們可以先排除掉選項B和D，因為它們都是複數形式的動詞，而主語是單數。選項A和C都是現在分詞，而這個句子需要的是一個系動詞。當表示某事物的狀態時，常常使用系動詞，而不是動作動詞。因此，選項C中的being是一個現在分詞的形式，不能用來作系動詞。只有選項A中的is是正確的答案，因為它是be動詞的現在時單數形式，可以作為系動詞來表示北極熊的狀態。因此，正確答案是A. is。",
}, {
    id: 24,
    q: "The ____ of the novel was so intriguing that I couldn't put it down.",
    s: ["climax", "exposition", "resolution", "rising action"],
    a: "climax",
    e: "這句話在談論小說的情節，所以需要填入一個適當的情節詞。'climax'（高潮）表示小說的最高點，因此這是正確的答案。",
}, {
    id: 25,
    q: "The book, which I ___ yesterday, is very interesting.",
    s: ["read", "am reading", "have read", "will read"],
    a: "have read",
    e: "此題為過去完成式，應使用現在完成式的助動詞 have/has + 過去分詞形式 (past participle)。",
}, {
    id: 26,
    q: "Despite her initial reluctance, the teacher ultimately decided to __________ the students’ request for a field trip.",
    s: ["grant", "refuse", "withdraw", "decline"],
    a: "grant",
    e: "根據句子意思可知，老師最終決定允許學生們的請求去進行實地考察，所以需要填入與“允許”相關的詞語。A. grant即為“允許”的意思，符合題意，故選擇A. grant。B. refuse為“拒絕”的意思，C. withdraw為“撤回”的意思，D. decline為“下降”、“拒絕”等意思，都與題意不符。",
}, {
    id: 27,
    q: "The new employee was _____ for his poor work performance.",
    s: ["lauded", "admonished", "applauded", "approved"],
    a: "admonished",
    e: "這道題目考查的是動詞與介詞的搭配。其中，laud 表示讚美、稱讚，apologize 表示道歉，applaud 表示喝彩，而 admonish 則表示警告、告誡，與 'poor work performance' 不符，因此答案為 (B) admonished。所以答案是 (B) admonished。",
}, {
    id: 28,
    q: "The new employee was nervous on her first day, but she _____________ to feel more comfortable after meeting her colleagues.",
    s: ["starts", "started", "will start", "has started"],
    a: "started",
    e: "此題考察時態的運用，要求填入合適的時態以使句子通順，符合文法。句中已經給出了時間線索，即在新員工的第一天，因此需要使用過去式來描述已經發生的動作。故B選項“started”為正確答案。選項A和C都使用了現在式和未來式，不符合文法，選項D則使用了現在完成式，表示動作的完成，不符合該句意思。因此，正確答案為B選項“started”。",
}, {
    id: 29,
    q: "The new teacher was determined to __________ the students’ interest in science by conducting exciting experiments.",
    s: ["pique", "peak", "peek", "pick"],
    a: "pique",
    e: "這道題目考查了四個相似的單詞，而正確答案為 A. pique。因此，正確答案為 A. pique，表示新老師會透過富有趣味性的實驗激起學生對科學的興趣。",
}, {
    id: 30,
    q: "The ___________ of air pollution can be harmful to both humans and the environment.",
    s: ["effect", "affect", "affects", "affected"],
    a: "effect",
    e: "這是一個常見的考試題型，考查effect和affect的用法。effect是名詞，表示結果或影響，而affect是動詞，表示對某事物產生影響。由於句子主語the effect是單數，因此要使用單數動詞形式。因此，選擇選項A，即effect。正確答案：A. effect",
}, {
    id: 31,
    q: "One of the keys to _____________ in life is to develop a growth mindset.",
    s: ["success", "successful", "succeed", "succeeding"],
    a: "success",
    e: "這題要選擇一個能填入空格的名詞，從文意上判斷，表示「成功」的詞彙會最貼近題目的需求，因此答案為 (A) success。(B) successful 是形容詞，不符合空格的用詞要求；(C) succeed 和 (D) succeeding 是動詞，也無法直接填入空格。因此，答案為 (A) success。",
}, {
    id: 32,
    q: "The new project requires a lot of ________________.",
    s: ["money", "monies", "much money", "many money"],
    a: "money",
    e: "在此句中，需要填入的是“money”的單數形式，而“monies”、“much money”和“many money”都是不正確的。因此，答案為A. money。",
}, {
    id: 33,
    q: "The _______ of the American Civil War in 1865 led to the abolition of slavery in the United States.",
    s: ["cessation", "prevalence", "conclusion", "contemplation"],
    a: "conclusion",
    e: "這道題目考查的是名詞的選擇。題目中需要一個合適的名詞來填空，表達的是「美國內戰」的結束。選項 A) cessation 表示「中止、停止」，B) prevalence 表示「普及、流行」，D) contemplation 表示「沉思、思考」，這三個選項都與結束不相符，因此可以排除。而選項 C) conclusion 表示「結論、結束」，與題目的要求相符，因此是正確答案。",
}, {
    id: 34,
    q: "The new science museum in town has been a huge ___ with locals and visitors alike. The interactive exhibits and hands-on activities make it a great place for families to spend the day learning and having fun.",
    s: ["success", "successful", "succeed", "successfully"],
    a: "successful",
    e: "這題考查名詞與形容詞的使用。前半句說「這個城鎮的新科學博物館」，因為是名詞，所以後半句要使用形容詞來形容它，因此選項 B 'successful' 為正確答案。選項 A 'success' 為名詞，不符合句子結構。選項 C 'succeed' 為動詞原形，同樣不符合句子結構。選項 D 'successfully' 為副詞，也不符合句子結構。",
}, {
    id: 35,
    q: "Many people find it difficult to ___________ a new language, but there are many benefits to doing so.",
    s: ["memorize", "memorizing", "memorized", "memorizeable"],
    a: "memorize",
    e: "這道題目考查的是動詞的時態和形式，句中主語是“Many people”，動詞是“find”，所以要用動詞的原形“memorize”。B 選項是動詞的現在分詞形式，C 選項是動詞的過去分詞形式，D 選項則是形容詞形式，都不能與主語和動詞的時態和形式相符。因此，正確答案是 A 選項。",
}, {
    id: 36,
    q: "It's important to have good _____ when working in a team. Communication is key, and being able to express yourself clearly can help avoid misunderstandings and conflicts.",
    s: ["commitment", "communication", "creativity", "cooperation"],
    a: "communication",
    e: "本題考查名詞選擇。根據句子結構及句意，前半句提到“當在一個團隊中工作時”，後半句則進一步解釋“溝通是關鍵”，因此應選擇和溝通相關的名詞。從選項中可看到，(B) communication符合文意，其他選項不合適。因此，正確答案為(B) communication。",
}, {
    id: 37,
    q: "The new employee was ________ to attend the meeting on Monday.",
    s: ["advise", "advised", "advising", "to advise"],
    a: "advised",
    e: "本題考察的是動詞的時態和詞形變化。根據句意“新員工被建議參加星期一的會議”，需要用到被動語態，動詞用過去分詞形式。根據答案選項，只有B) advised符合文法規則，因此答案是B。",
},]

main()

async function main() {

    output = 'export const q = ['
    for (let x = 0; x < q.length; x++) {
        output += `{
            q:"${q[x].q}",
            s:["${q[x].s[0]}","${q[x].s[1]}","${q[x].s[2]}","${q[x].s[3]}"],
            a:"${q[x].a}",
            e:"${q[x].e}",
            z:"${await toZH(q, x)}"
        },`
    }
    output += ']'
    fs.writeFile('test4.js', output, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
}

async function toZH(q, x) {
    let a = q[x].q
    a = a.replace('_', q[x].a)
    let real = a.replace(/\_/g, '')
    return trans(real)
    //console.log(real)
    //console.log(trans(real))
}
