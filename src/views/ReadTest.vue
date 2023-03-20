<template>
    <div style="display:flex;flex-direction:column;height: 100vh;width: 100vw;margin:0;padding: 0;">
        <div style="background-color: #222;margin: 10px;display:flex;">
            <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"><img
                    style="background-color: #222;" src="../assets/arrow_back.svg" @click="goHome"></div>
            <div style="flex:1;display: flex;justify-content: center;align-items: center;color: #ccc;">{{
                $t("to_read") }}</div>
            <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"></div>
        </div>
        <hr style="margin-bottom: 10px;border: 1px groove #666;margin-left: 10px;margin-right: 10px;">
        <div style="overflow-y: auto;flex:1;display: flex;flex-direction:column;">
            <div v-if="!isStep" style="height: 100vh;width: 100vw;margin-left: 10px;margin-right: 10px;">
                <div style="color: #ccc;" :style="mystyle">{{ article }}</div>
                <div v-if="isExp">
                    <hr style="margin-bottom: 10px;margin-top:10px;border: 1px groove #666;">
                    <div style="color: #ccc;" :style="mystyle">{{ article_zh }}</div>
                </div>
                <div style="height: 20px;"></div>
            </div>
            <div v-if="isStep" style="height: 100vh;width: 100vw;margin-left: 10px;margin-right: 10px;color: #ccc;">
                <div style="margin-bottom: 20px;" v-for="(item, index) in question" v-bind:key="index" :style="mystyle">
                    <div style="font-weight: bold;margin-bottom: 5px;"> {{ 'Q ' + (parseInt(index) +
                        1).toString() + '. ' + item }}</div>
                    <hr style="margin-bottom: 10px;border: 1px groove #666;">
                    <div v-for="(it, x) in sel[index]" v-bind:key="x" @click="onSel(it, index, x)">
                        <div :style="styles[index][x]" style="display: flex;justify-content:
                                                        center;align-items: center;">
                            <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;">{{ x == 0 ?
                                'A. ' : x
                                    == 1 ? 'B. ' : x == 2 ? 'C. ' : 'D. ' }}{{ it }}</div>
                        </div>
                        <hr style="border: 1px groove #666;margin-left: 10px;margin-right: 10px;">
                    </div>
                    <div style="margin-top: 5px;" v-show="isExp" :class="{
                        'correct_color': answer[index][1] == picked[index],
                        'init_color': answer[index][1] != picked[index]
                    }">{{ $t("fail") + ' ' + answer[index] }}</div>
                    <div style="margin-top: 5px;" v-show="isExp">{{ $t("explanation") + ' : ' + exp[index] }}</div>
                </div>
                <div style="height: 20px;"></div>
            </div>
        </div>
        <hr style="margin-bottom: 20px;margin-top:20px;border: 1px groove #666;margin-left: 10px;margin-right: 10px;">
        <div>
            <div v-if="!isExp && isAnswer || isNext"
                style="display: flex;justify-content: center;margin-left: 10px;margin-right: 10px;">
                <div style="flex:1;background-color: #252525;border-radius: 15px;height: 60px;width: 100%;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
                    @click="toStep">
                    {{ isStep ? $t("look_read") : $t("read_answer") }}
                </div>
                <div v-if="isNext" @click="goNext"
                    style="margin-left: 10px;flex:1;background-color: #252525;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;">
                    {{ $t("go_next") }}
                </div>
                <div v-if="!isExp && isAnswer" @click="toAnswer"
                    style="flex:1;margin-left: 10px;background-color: #252525;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;">
                    {{ $t("to_answer") }}
                </div>
            </div>
            <div v-else style="display: flex;justify-content: center;margin-left: 10px;margin-right: 10px;">
                <div style="flex:1;background-color: #252525;border-radius: 15px;height: 60px;width: 100%;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
                    @click="toStep">
                    {{ isStep ? $t("look_read") : $t("read_answer") }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as tool from '../tool';
import { r } from '../read_question.js'
var number = 0
export default {
    name: 'ReadTest',
    data: () => {
        return {
            isReport: false,
            article: '',
            question: [],
            sel: [],
            isExp: false,
            answer: [],
            exp: [],
            picked: [],
            isStep: false,
            isReset: false,
            isNext: false,
            mystyle: '',
            article_zh: '',
            styles: []
        }
    },
    computed: {
        isAnswer() {
            let h = 0
            for (let i = 0; i < this.picked.length; i++) {
                if (this.picked[i] != null) {
                    h++
                }
            }
            return h == this.question.length
        }
    },
    mounted() {

        number = Math.floor(Math.random() * r.length)
        let rs = r[number]
        this.article = rs.ar
        this.article_zh = rs.zh
        this.question = rs.q
        this.sel = rs.q_sel
        this.answer = rs.q_a
        this.exp = rs.q_ex
        const [s, t] = tool.getLang()
        this.mystyle = s
        this.font_size = t
        this.styles = []
        for (let i = 0; i < this.sel.length; i++) {
            this.styles.push([{ background: '#222' }, { background: '#222' }, { background: '#222' }, { background: '#222' }])
        }
    },
    methods: {
        toStep() {
            this.isStep ^= true
            this.isReset = false
        },
        toAnswer() {
            this.isReset = true
            this.answer = []
            this.exp = []
            this.sel = []
            setTimeout(() => {
                let rs = r[number]
                this.sel = rs.q_sel
                this.answer = rs.q_a
                this.exp = rs.q_ex
                this.isReset = false
                this.isExp = true
                this.isNext = true
                this.isStep = true
                window.scrollTo(0, 0)
            }, 10)
        },
        onEn(item) {

        },
        onSel(item, index, x) {
            console.log(item, index, x)
            for (let i = 0; i < this.sel.length; i++) {
                if (i == index) {
                    this.styles[i] = [{ background: '#222' }, { background: '#222' }, { background: '#222' }, { background: '#222' }]
                    this.styles[i][x] = { background: '#333' }
                }
            }
        },
        goHome() {
            window.location.hash = '/Main'
        },
        goNext() {
            number = Math.floor(Math.random() * r.length)

            this.article = ''
            this.article_zh = ''
            this.answer = []
            this.exp = []
            this.sel = []
            this.question = []
            this.isExp = true
            this.picked = []
            this.isStep = true
            this.isReset = true
            setTimeout(() => {
                let rs = r[number]
                this.article = rs.ar
                this.article_zh = rs.zh
                this.question = rs.q
                this.answer = rs.q_a
                this.exp = rs.q_ex
                this.sel = rs.q_sel
                this.isReset = false
                this.isStep = false
                this.isExp = false
                this.isNext = false
                this.styles = []
                for (let i = 0; i < this.sel.length; i++) {
                    this.styles.push([{ background: '#222' }, { background: '#222' }, { background: '#222' }, { background: '#222' }])
                }
            }, 10)
        }
    }
}

</script>


<style scoped>
.correct_color {
    background-color: green;
}

.error_color {
    background-color: red;
}

.normal_color {
    background-color: #444;
}

.init_color {
    background-color: #222;
}
</style>