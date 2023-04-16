<template>
    <div style="display:flex;flex-direction:column;height: 100%;overflow-y: hidden;">
        <div style="overflow-y: auto;margin: 10px 10px 0px 10px;">
            <div v-if="!isStep" class="demo-card-square mdl-card"
                style="width: 99%;background-color: #333;padding: 10px;border-radius: 8px;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);">
                <div style="font-weight: bold;color:#777;margin-bottom: 5px;">{{ $t("read_article") }}</div>
                <div style="color: #ccc;" :style="mystyle">{{ article }}</div>
                <div v-if="isExp">
                    <hr style="margin-bottom: 10px;margin-top:10px;border: 1px groove #444;">
                    <div style="color: #ccc;" :style="mystyle">{{ article_zh }}</div>
                </div>
                
            </div>
            <div v-else>
                <div v-for="(item, index) in question" v-bind:key="index" :style="mystyle"
                    style="width: 99%;margin-bottom: 10px;background-color: #333;padding: 10px;border-radius: 8px;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);color:#CCC"
                    class="demo-card-square mdl-card">
                    <div style="font-weight: bold;">
                        <div style="color: #777;display: inline;margin-right: 5px;">
                            {{ 'Q ' + (parseInt(index) +
                                1).toString() + '. ' }}
                        </div>
                        <div style="display: inline;">{{ item }}</div>
                    </div>
                    <hr style="margin-bottom: 5px;margin-top: 8px;border: 1px groove #666;">
                    <div v-for="(it, x) in sel[index]" v-bind:key="x" @click="onSel(it, index, x)">
                        <div :style="styles[index][x]" style="padding: 3px;">
                            <div style="flex:1;justify-content: flex-start;align-items: center;">
                                <div style="color: #777;padding-right: 5px;display: inline;">{{ x == 0 ?
                                    'A. ' : x
                                        == 1 ? 'B. ' : x == 2 ? 'C. ' : 'D. ' }}</div>
                                <div style="display: inline;">{{ it }}</div>
                            </div>
                        </div>
                        <hr style="border: 1px groove #444;margin: 5px 5px 5px 5px;padding: 0;">
                    </div>
                    <div style="margin-top: 5px;" v-show="isExp">{{ $t("explanation") + ' : ' + exp[index] }}</div>
                </div>
            </div>
            <div style="height: 80px;"></div>
        </div>
        <div style="position: sticky;bottom:80px;z-index: 10;width:100%;height:55px;right:40px;background-color:rgb(0, 0, 0,0);
                                            color:#FFF;
                                            padding: 0;
                                            margin: 0;
                                            border-radius:50px;
                                            text-align:center;">
            <div v-if="!isExp && isAnswer || isNext"
                style="display: flex;justify-content: center;margin-left: 10px;margin-right: 10px;">
                <div style="flex:1;background-color: #252525;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
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
                <div style="flex:1;background-color: #252525;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
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
const SELECT = ['A', 'B', 'C', 'D']
const SELECT2 = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3
}
var number = 0
export default {
    name: 'ReadTest',
    data: () => {
        return {
            dialog: false,
            article: '',
            question: [],
            sel: [],
            isExp: false,
            answer: [],
            exp: [],
            picked: [],
            isStep: false,
            isNext: false,
            mystyle: '',
            article_zh: '',
            styles: [],
            top: 0,
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
        for (let i = 0; i < this.question.length; i++) {
            this.picked.push(null)
            this.styles.push([{ background: '#333' }, { background: '#333' }, { background: '#333' }, { background: '#333' }])
        }
    },
    methods: {
        toStep() {
            this.isStep ^= true
        },
        toAnswer() {
            let rs = r[number]
            this.sel = rs.q_sel
            this.answer = rs.q_a
            this.exp = rs.q_ex
            this.isExp = true
            this.isNext = true
            this.isStep = true
            for (let i = 0; i < this.sel.length; i++) {
                this.styles[i][SELECT2[this.answer[i].replace(' ', '')]] = { background: '#080' }
            }
            for (let i = 0; i < this.sel.length; i++) {
                if (SELECT[this.picked[i]] != this.answer[i].replace(' ', '')) {
                    this.styles[i][this.picked[i]] = { background: '#800' }
                }
            }

        },
        onEn(item) {

        },
        onSel(item, index, x) {
            if (!this.isExp) {
                for (let i = 0; i < this.sel.length; i++) {
                    if (i == index) {
                        this.styles[i] = [{ background: '#333' }, { background: '#333' }, { background: '#333' }, { background: '#333' }]
                        this.styles[i][x] = { background: '#444' }
                        this.picked[i] = x
                        break
                    }
                }
                let rs = r[number]
                this.question = []
                this.question = rs.q
            }
        },
        goHome() {
            window.location.hash = '/Main'
        },
        goNext() {
            number = Math.floor(Math.random() * r.length)
            let rs = r[number]
            this.article = rs.ar
            this.article_zh = rs.zh
            this.question = rs.q
            this.answer = rs.q_a
            this.exp = rs.q_ex
            this.sel = rs.q_sel
            this.isStep = false
            this.isExp = false
            this.isNext = false
            this.styles = []
            this.picked = []
            for (let i = 0; i < this.sel.length; i++) {
                this.styles.push([{ background: '#333' }, { background: '#333' }, { background: '#333' }, { background: '#333' }])
            }
            for (let i = 0; i < this.question.length; i++) {
                this.picked.push(null)
            }

        }
    }
}

</script>


<style scoped>
.demo-layout-waterfall .mdl-layout__header-row .mdl-navigation__link:last-of-type {
    padding-right: 0;
}

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

.v-select__selection,
.v-select__selection--comma,
.v-select.v-text-field input {
    color: #666 !important;
}

v-label {
    color: blue !important;
}

.v-icon {
    color: blue !important;
}

.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: #0C9;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.my-float {
    margin-top: 22px;
}
</style>