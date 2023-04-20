
<template>
    <div style="height: 100vh;">
        <div style="overflow-y: auto;margin: 10px;display:flex;flex-direction:column;">
            <div class="demo-card-square mdl-card "
                style="border-radius: 8px;width:99%;background-color: #333;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);">

                <dialog class="mdl-dialog"
                    style="width: 100%;margin: 80px 20px 0 20px;background-color: #333;border-radius: 8px;">
                    <div class="mdl-dialog__content">
                        <div style="font-weight: bold;color:#777;margin-bottom: 5px;">{{ $t("please_select") }}</div>
                        <div v-for="(item, index) in sels" v-bind:key="index">
                            <button class="mdl-button mdl-js-button mdl-js-ripple-effect"
                                @click="onSel(item, index, position, SELC[index + position])"
                                style="text-transform: none;text-align: left;margin: 5px;padding: 0;width: 97%;background-color: #333;">
                                <div
                                    style="display: inline;color: #777;margin-right: 5px;padding-left: 10px;font-size: 16px;">
                                    {{ SELC[index + position] }}</div>
                                <div :style="mystyle" style="display: inline;color: #CCC;line-height:1.01;">{{
                                    item }}</div>
                            </button>
                            <hr style="margin: 0 20px 0 20px;padding: 0;border: 1px groove #444;">
                        </div>
                    </div>
                    <div class="mdl-dialog__actions mdl-dialog__actions--full-width">
                        <button type="button" class="mdl-button mdl-js-button mdl-js-ripple-effect"
                            style="color: #CCC;font-size: 18px;" @click="close">{{
                                $t("cancel") }}</button>
                    </div>
                </dialog>

                <div class="mdl-card__supporting-text" style="width:99%;">
                    <div style="font-weight: bold;color:#777;margin-bottom: 5px;">{{ $t("read_article") }}</div>
                    <div v-if="isExp">
                        <div :style="mystyle" style="color:#AAA;line-height:1.01;line-height:1.01;display: inline-block;"
                            v-for="(item, i) in reals" :key="i">
                            <div style="margin-right: 5px;border: 1px groove #0F0;padding: 2px;" v-if="an.includes(i)">
                                {{ item }}
                            </div>
                            <div v-else style="margin-right: 5px;">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                    <div v-else :style="mystyle" style="color:#CCC;line-height:1.01;display: inline-block;"
                        v-for="(item, index) in arts" :key="index">
                        <button type="button" class="show-modal"
                            style="margin-right: 5px;border: 1px groove #0F0;padding: 2px;" v-if="an.includes(index)"
                            @click="open(index)">
                            {{ item }}
                        </button>
                        <div v-else style="margin-right: 5px;">
                            {{ item }}
                        </div>
                    </div>
                    <div style="text-align: right;margin-top: 10px;" v-if='isExp'><v-icon
                            style="color:#777;padding: 0 5px 0 5px;margin-right: 10px;"
                            @click="onEn">mdi-translate</v-icon><v-icon style="padding: 0 5px 0 5px;color:#777"
                            @click="speech(real)">mdi-text-to-speech</v-icon></div>
                </div>
                <hr style="margin: 0 10px 0 10px;padding: 0;border: 1px groove #444;">
                <div v-if='isExp' :style="mystyle">
                    <div style="margin: 10px;color: #CCC;;line-height:1.01">
                        {{ isCorrect ? $t("correct") : $t("fail") + sel }}</div>
                    <hr style="margin: 10px 10px 10px 10px;border: 1px groove #444;">
                    <div style="margin: 10px;color: #CCC;line-height:1.01">{{ exp }}</div>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <button v-if='isExp' @click="goNext"
                        class="mdl-button mdl-js-button mdl-card__supporting-text mdl-button--primary"
                        style="font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;">
                        {{ $t("go_next") }}
                    </button>
                    <button v-else-if="selected != ''" @click="anwser"
                        class="mdl-button mdl-js-button mdl-card__supporting-text mdl-button--primary"
                        style="font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;">
                        {{ $t("to_answer") }}
                    </button>
                    <button v-else class="mdl-button mdl-js-button mdl-card__supporting-text" disabled
                        style="font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:#444;">
                        {{ $t("to_answer") }}
                    </button>
                </div>
            </div>
        </div>
        <div style="height: 60px;"></div>
        <div v-if="isDetail"
            style="position: fixed;top:0;left:0;width:99vw;height:100vh;z-index:3;background-color:rgba(0,0,0,0.3);color:black;display:flex">
            <div style="background-color:#2A2A2A;flex:1;display:flex;flex-direction:column;margin-top: 24vh;margin-bottom:24vh;margin-left: 2vw;margin-right: 2vw;border-radius: 3vw;"
                :style="mystyle">
                <div style="flex:1;background-color: #2A2A2A;display:flex;">
                    <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"></div>
                    <div
                        style="flex:5;display: flex;justify-content: center;align-items: center;color: #ccc;font-weight: bold;">
                        <div style="margin-right: 10px;font-size: 22px;">{{
                            $t("translation") }}</div>
                    </div>
                    <v-icon
                        style="flex:1;display: flex;justify-content: flex-end;align-items: center;padding: 5px;color:#777"
                        @click="closeDetail">mdi-window-close</v-icon>
                </div>
                <hr style="margin: 0 10px 5px 10px;border: 1px groove #444;">
                <div style="margin-left: 10px;font-weight: bold;color:#777;margin-bottom: 5px;">{{ $t("trans_not") }}</div>
                <div style="flex:10;color: #ccc;margin: 0 10px 10px 10px;font-size: 22px;line-height:1.01">
                    {{ onExp }}
                </div>
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
const synth = window.speechSynthesis;
export default {
    name: 'SctorSpace',
    data: () => {
        return {
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
    mounted() {

        this.$parent.title = i18n.t("sctor_space")
        const [m, t] = tool.getLang()
        this.mystyle = m
        this.speech_rate = tool.getSpeechRate()

        number = Math.floor(Math.random() * q.length)
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
        ss.shift()

    },
    methods: {
        open(idx) {
            indx = idx
            for (let i = 0; i < this.an.length; i++) {
                if (idx == this.an[i]) {
                    this.sels = ss[i]
                    this.position = i * 4
                }
            }
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
                        //alert('success');
                    }, function (reason) {
                        //alert(reason);
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

            number = Math.floor(Math.random() * q.length)
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
            ss.shift()

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
  
<style scoped></style>