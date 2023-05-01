
<template>
    <div style="height: 100vh;" :class="isDark ? 'darkBack' : 'lightBack'">
        <div style="overflow-y: auto;padding: 10px;display:flex;flex-direction:column;">

            <div class="demo-card-square mdl-card"
                style="border-radius: 8px;width:100%;box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);margin-bottom: 60px;"
                :class="isDark ? 'dark' : 'light'">

                <dialog class="mdl-dialog" style="width: 100%;margin: 80px 20px 0 20px;border-radius: 8px;"
                    :class="isDark ? 'dark' : 'light'">
                    <div class="mdl-dialog__content" style="padding: 15px 15px 5px 15px;margin: 0;">
                        <div style="margin: 5px 0 5px 0;font-size: 14px;" :class="isDark ? 'darkGray' : 'lightGray'">{{
                            $t("please_select") }}</div>
                        <div v-for="(item, index) in sels" v-bind:key="index">
                            <button @click="onSel(item, index, position, SELC[index + position])"
                                style="text-transform: none;text-align: left;margin: 5px 0 5px 0;padding: 0;width: 100%;padding: 5px 0 5px 0;">
                                <div style="display: inline;margin-right: 10px;font-size: 14px;"
                                    :class="isDark ? 'darkGray' : 'lightGray'">
                                    {{ SELC[index + position] }}</div>
                                <div :style="mystyle" style="display: inline;line-height:1.2;"
                                    :class="isDark ? 'dark' : 'light'">{{
                                        item }}</div>
                            </button>
                            <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
                        </div>
                    </div>
                    <div class="mdl-dialog__actions mdl-dialog__actions--full-width">
                        <button type="button" class="mdl-button mdl-js-button mdl-js-ripple-effect"
                            style="color:dodgerblue;font-size: 18px;" @click="close">{{
                                $t("cancel") }}</button>
                    </div>
                </dialog>
                <div style="width:100%;padding: 10px;" :class="isDark ? 'dark' : 'light'">
                    <div style="margin-bottom: 5px;font-size: 14px;" :class="isDark ? 'darkGray' : 'lightGray'">{{ 'Q' + num
                        + '.' +
                        $t("read_article") }}</div>
                    <div v-if="isExp">
                        <div :style="mystyle" style="line-height:1.2;display: inline-block;" v-for="(item, i) in reals"
                            :key="i">
                            <div style="margin-right: 5px;padding: 2px;" v-if="an.includes(i)"
                                :class="isDark ? 'lightBorder' : 'darkBorder'">
                                {{ item }}
                            </div>
                            <div v-else style="margin-right: 5px;" :class="isDark ? 'darkGray' : 'lightGray'">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                    <div v-else :style="mystyle" style="line-height:1.2;display: inline-block;"
                        v-for="(item, index) in arts" :key="index">
                        <button type="button" class="show-modal" style="margin-right: 5px;padding: 2px;"
                            v-if="an.includes(index)" :class="isDark ? 'lightBorder' : 'darkBorder'" @click="open(index)">
                            {{ item }}
                        </button>
                        <div v-else style="margin-right: 5px;">
                            {{ item }}
                        </div>
                    </div>
                    <div style="text-align: right;margin-top: 10px;" v-if='isExp'><v-icon
                            style="padding: 0 5px 0 5px;margin-right: 10px;" :class="isDark ? 'dark' : 'light'"
                            @click="onEn">mdi-translate</v-icon><v-icon :class="isDark ? 'dark' : 'light'"
                            style="padding: 0 5px 0 5px;" @click="speech(real)">mdi-text-to-speech</v-icon></div>
                </div>
                <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
                <div v-if='isExp' :style="mystyle" :class="isDark ? 'dark' : 'light'">
                    <div style="margin: 10px;line-height:1.2">
                        {{ isCorrect ? $t("correct") : $t("fail") + sel }}</div>
                    <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
                    <div style="margin: 10px;line-height:1.2">{{ exp }}</div>
                </div>
                <div class="mdl-card__actions mdl-card--border" :class="isDark ? 'dark' : 'light'">
                    <button v-if='isExp' @click="goNext" class="mdl-button mdl-js-button  mdl-button--primary"
                        style="font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;">
                        {{ $t("go_next") }}
                    </button>
                    <button v-else-if="selected != ''" @click="anwser" class="mdl-button mdl-js-button mdl-button--primary"
                        style="font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;">
                        {{ $t("to_answer") }}
                    </button>
                    <button v-else class="mdl-button mdl-js-button" disabled
                        style="font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:#444;">
                        {{ $t("to_answer") }}
                    </button>
                </div>
            </div>

        </div>
        <div v-if="isDetail" @click="closeDetail"
            style="position: fixed;top:0;left:0;width:100vw;height:100vh;z-index:1;background-color:rgba(0,0,0,0.3);">
        </div>
        <div v-if="isDetail" class="demo-card-square" :class="isDark ? 'dark' : 'light'"
            style="position: fixed;top:20%;left: 5%;border-radius: 8px;width: 90%;z-index:2;display:flex;flex-direction:column;"
            :style="mystyle">
            <div style="width: 100%;padding: 10px;">
                <div style="margin-bottom: 5px;width: 100%;font-size: 12px;" :class="isDark ? 'darkGray' : 'lightGray'">{{
                    $t("trans_not") }}</div>
                <div style="font-size: 20px;line-height:1.2;width: 100%;" :class="isDark ? 'dark' : 'light'">
                    {{ onExp }}
                </div>
            </div>
            <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
            <div class="mdl-card__actions mdl-card--border">
                <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="closeDetail"
                    style="padding: 0;font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;">
                    {{ $t(" close") }} </div>
            </div>
        </div>
    </div>
</template>
  
<script>



import * as tool from '../tool';
import { q } from '../question_space.js'
import i18n from '../i18n';
var number = 0
var ss = []
var indx = 0
var rand = []
var qs = 0
const synth = window.speechSynthesis;
export default {
    name: 'SctorSpace',
    data: () => {
        return {
            num: 1,
            isDark: localStorage.getItem('Dark_mode') == '1' ? true : false,
            sels: [],
            SELC: ['(A)', '(B)', '(C)', '(D)', '(E)', '(F)', '(G)', '(H)', '(I)', '(J)', '(K)', '(L)', '(M)', '(N)', '(O)', '(P)',],
            arts: [],
            symbols: [],
            ans: [],
            an: [],
            position: 0,
            selected: '',
            isCorrect: false,
            exp: '',
            isExp: false,
            answer: '',
            sel: '',
            isDetail: false,
            onExp: '',
            mystyle: '',
            real: '',
            reals: [],
            speech_rate: 0.6,
        }
    },
    beforeDestroy() {
        this.$emit('title', 'exit');
    },
    mounted() {

        this.$emit('title', i18n.t("sctor_space") + ' ');
        setTimeout(() => {
            this.$emit('title', i18n.t("sctor_space"));
        }, 100)
        componentHandler.upgradeAllRegistered()
        const [m, t] = tool.getLang()
        this.mystyle = m
        this.speech_rate = tool.getSpeechRate()

        //number = Math.floor(Math.random() * q.length)

        for (let i = 0; i < q.length; i++) {
            rand.push(i)
        }
        rand = tool.shuffle(rand)

        if (qs > q.length) qs = 0
        number = rand[qs]
        qs++

        this.arts = q[number].ars.split(" ")
        this.reals = q[number].reals.split(" ")
        this.real = q[number].reals
        this.onExp = q[number].cns
        this.exp = q[number].exps
        this.ans = q[number].ans
        let b = q[number].sels
        for (let i = 0; i < b.length; i++) {
            b[i] = b[i].replace(' ', '')
        }
        let sel = b
        //console.log(sel)
        //let sel = q[number].sels
        let ars = this.arts
        for (let i = 0; i < ars.length; i++) {
            if (ars[i].includes('__')) {
                this.an.push(i)
            }
        }

        let s = []
        let x = 0
        while (sel.length > 0) {
            let a = sel.shift()
            if (x % 4 == 0) {
                ss.push(s)
                s = []
                s.push(a)
            } else s.push(a)
            x++
        }
        ss.push(s)

        let arr = ss
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length == 0) {
                arr.splice(i, 1);
                i--
            }
        }
        //console.log(arr)
        ss = arr
    },
    methods: {
        backHandler() {
            let dialog = document.querySelector('dialog');
            dialog.showModal();
        },
        open(idx) {
            indx = idx
            for (let i = 0; i < this.an.length; i++) {
                if (idx == this.an[i]) {
                    this.sels = ss[i]
                    this.position = i * 4
                }
            }
            //console.log(this.sels, ss, this.an, this.position, idx)
            let dialog = document.querySelector('dialog');
            dialog.showModal();
        },
        close() {
            let dialog = document.querySelector('dialog');
            dialog.close();
        },
        speech(t) {
            if (tool.checkVersion() == 'web') {

                if (synth.speaking) {
                    console.error("speechSynthesis.speaking");
                    return;
                }

                const utterThis = new SpeechSynthesisUtterance(t);

                utterThis.onend = function (event) {
                    console.log("SpeechSynthesisUtterance.onend");
                };

                utterThis.onerror = function (event) {
                    console.error("SpeechSynthesisUtterance.onerror");
                };

                utterThis.pitch = 0.8;
                utterThis.rate = this.speech_rate
                synth.speak(utterThis);
            } else {
                TTS
                    .speak({
                        text: t,
                        locale: 'en-US',//en-US en-GB
                        rate: this.speech_rate
                    }).then(function () {
                        alert('success');
                    }, function (reason) {
                        alert(reason);
                    });
            }
        },
        onEn() {
            this.isDetail = true
        },
        closeDetail() {
            if (this.isDetail) this.isDetail = false
        },
        goNext() {
            this.num = this.num + 1
            //number = Math.floor(Math.random() * q.length)
            if (qs > q.length) qs = 0
            number = rand[qs]
            qs++

            this.arts = q[number].ars.split(" ")
            this.reals = q[number].reals.split(" ")
            this.real = q[number].reals
            this.onExp = q[number].cns
            this.exp = q[number].exps
            this.ans = q[number].ans
            this.an = []

            let b = q[number].sels
            for (let i = 0; i < b.length; i++) {
                b[i] = b[i].replace(' ', '')
            }
            let sel = b
            let ars = this.arts
            for (let i = 0; i < ars.length; i++) {
                if (ars[i].includes('__')) {
                    this.an.push(i)
                }
            }

            ss = []
            let s = []
            let x = 0
            while (sel.length > 0) {
                let a = sel.shift()
                if (x % 4 == 0) {
                    ss.push(s)
                    s = []
                    s.push(a)
                } else s.push(a)
                x++
            }
            ss.push(s)

            let arr = ss
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].length == 0) {
                    arr.splice(i, 1);
                    i--
                }
            }
            //console.log(arr)
            ss = arr

            indx = 0
            this.isExp = false
            this.isCorrect = false
            this.isDetail = false
            this.position = 0
            this.selected = ''
        },
        onSel(item, index, pos, anwser) {
            this.symbols[pos / 4] = anwser
            this.$set(this.arts, indx, item)
            let isHave = false
            for (let i = 0; i < this.arts.length; i++) {
                if (this.arts[i].includes('__')) {
                    isHave = true
                }
            }
            if (!isHave) this.selected = 'have'
            let dialog = document.querySelector('dialog');
            dialog.close();
        },
        anwser() {
            let isCorrect = true

            for (let i = 0; i < this.ans.length; i++) {
                if (this.ans[i] != this.symbols[i]) {
                    isCorrect = false
                }
            }
            if (isCorrect) {
                this.isCorrect = true
            } else {
                this.sel = this.ans.join(', ')
                this.isCorrect = false
            }

            this.isExp = true
        }
    }
}
</script>
  
<style scoped>
.darkGray {
    color: #999;
}

.lightGray {
    color: #777;
}

.darkBack {
    background-color: #222;
}

.dark {
    background-color: #333;
    color: #CCC;
}

.darkNoBack {
    color: #CCC;
}

.darkBorder {
    border: 1px groove #444;
}

.lightBorder {
    border: 1px groove #DDD;
}

.light {
    background-color: #EEE;
    color: #222;
}

.lightNoBack {
    color: #222;
}

.lightBack {
    background-color: #DDD;
}
</style>