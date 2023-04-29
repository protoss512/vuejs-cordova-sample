<template>
    <div style="height: 100%;" :class="isDark ? 'darkBack' : 'lightBack'">
        <div style="display:flex;flex-direction:column;overflow-y: auto;padding: 10px;">

            <div v-if="!isStep" class="demo-card-square mdl-card"
                style="width: 100%;border-radius: 8px;box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);"
                :class="isDark ? 'dark' : 'light'">
                <div style="width:100%;padding: 10px;" :class="isDark ? 'dark' : 'light'">
                    <div :class="isDark ? 'darkGray' : 'lightGray'" style="margin-bottom: 5px;font-size: 14px;">R{{ num +
                        '\t' + $t("read_article") }}.</div>
                    <div style="line-height:1.2" :style="mystyle">{{ article }}</div>
                    <div v-if="isExp">
                        <hr style="padding: 0;margin: 5px;" :class="isDark ? 'darkBorder' : 'lightBorder'">
                        <div style="line-height:1.2" :style="mystyle">{{ article_zh }}</div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-for="(item, index) in question" v-bind:key="index" :style="mystyle"
                    :class="isDark ? 'dark' : 'light'"
                    style="width: 100%;margin-bottom: 10px;padding: 10px;border-radius: 8px;box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);"
                    class="demo-card-square">
                    <div>
                        <div style="padding: 5px 0 10px 0;">
                            <div style="display: inline;margin-right: 5px;font-size: 14px;"
                                :class="isDark ? 'darkGray' : 'lightGray'">
                                {{ 'Q' + (parseInt(index) +
                                    1).toString() + '. ' }}
                            </div>
                            <div style="display: inline;line-height:1.2;font-weight: 300;" :class="isDark ? 'dark' : 'light'">{{ item }}
                            </div>
                        </div>
                        <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
                        <div v-for="(it, x) in sel[index]" v-bind:key="x" @click="onSel(it, index, x)">
                            <div :style="styles[index][x]" style="padding: 7px;">
                                <div style="flex:1;justify-content: flex-start;align-items: center;">
                                    <div style="padding-right: 5px;display: inline;font-size: 14px;">{{ x == 0 ?
                                        'A. ' : x
                                            == 1 ? 'B. ' : x == 2 ? 'C. ' : 'D. ' }}</div>
                                    <div style="display: inline;">{{ it }}</div>
                                </div>
                            </div>
                            <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
                        </div>
                        <div style="margin-top: 5px;line-height:1.2" v-show="isExp" :class="isDark ? 'dark' : 'light'">{{
                            $t("explanation") + ' : ' +
                            exp[index]
                        }}</div>
                    </div>
                </div>
            </div>
            <div style="height: 130px;"></div>
        </div>
        <div style="position: fixed;bottom:10px;z-index: 2;padding: 0;margin: 0;width: 100%;">
            <div v-if="!isExp && isAnswer || isNext"
                style="display: flex;justify-content: center;margin-left: 10px;margin-right: 10px;">
                <div :class="isDark ? 'dark' : 'light'"
                    style="font-size: 22px;flex:1;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;"
                    @click="toStep">
                    {{ isStep ? $t("look_read") : $t("read_answer") }}
                </div>
                <div :class="isDark ? 'dark' : 'light'" v-if="isNext" @click="goNext"
                    style="font-size: 22px;margin-left: 10px;flex:1;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;">
                    {{ $t("go_next") }}
                </div>
                <div :class="isDark ? 'dark' : 'light'" v-if="!isExp && isAnswer" @click="toAnswer"
                    style="font-size: 22px;flex:1;margin-left: 10px;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;">
                    {{ $t("to_answer") }}
                </div>
            </div>
            <div v-else style="display: flex;justify-content: center;margin-left: 10px;margin-right: 10px;">
                <div :class="isDark ? 'dark' : 'light'"
                    style="font-size: 22px;flex:1;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;"
                    @click="toStep">
                    {{ isStep ? $t("look_read") : $t("read_answer") }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '../i18n';
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
var rand = []
var qs = 0
export default {
    name: 'ReadTest',
    data: () => {
        return {
            num: 1,
            isDark: localStorage.getItem('Dark_mode') == '1' ? true : false,
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
        this.$emit('title', i18n.t("to_read") + ' ');
        setTimeout(() => {
            this.$emit('title', i18n.t("to_read"));
        }, 100)

        for (let i = 0; i < r.length; i++) {
            rand.push(i)
        }
        rand = tool.shuffle(rand)

        if (qs > r.length) qs = 0
        number = rand[qs]
        qs++

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
            if (this.isDark) this.styles.push([{ background: '#333', color: '#CCC' }, { background: '#333', color: '#CCC' }, { background: '#333', color: '#CCC' }, { background: '#333', color: '#CCC' }])
            else this.styles.push([{ background: '#EEE', color: '#222' }, { background: '#EEE', color: '#222' }, { background: '#EEE', color: '#222' }, { background: '#EEE', color: '#222' }])
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
            for (let i = 0; i < this.sel.length; i++) { //currect
                if (this.isDark) this.styles[i][SELECT2[this.answer[i].replace(' ', '')]] = { background: '#060', color: '#CCC' }
                else this.styles[i][SELECT2[this.answer[i].replace(' ', '')]] = { background: '#5F5', color: '#222' }
            }
            for (let i = 0; i < this.sel.length; i++) { //sel
                if (SELECT[this.picked[i]] != this.answer[i].replace(' ', '')) {
                    if (this.isDark) this.styles[i][this.picked[i]] = { background: '#B00', color: '#CCC' }
                    else this.styles[i][this.picked[i]] = { background: '#F55', color: '#222' }
                }
            }

        },
        onSel(item, index, x) {
            if (!this.isExp) {
                for (let i = 0; i < this.sel.length; i++) {
                    if (i == index) {
                        if (this.isDark) this.styles[i] = [{ background: '#333', color: '#CCC' }, { background: '#333', color: '#CCC' }, { background: '#333', color: '#CCC' }, { background: '#333', color: '#CCC' }]
                        else this.styles[i] = [{ background: '#EEE', color: '#222' }, { background: '#EEE', color: '#222' }, { background: '#EEE', color: '#222' }, { background: '#EEE', color: '#222' }]

                        if (this.isDark) this.styles[i][x] = { background: '#444', color: '#CCC' }
                        else this.styles[i][x] = { background: '#DDD', color: '#222' }
                        this.picked[i] = x
                        break
                    }
                }
                let rs = r[number]
                this.question = []
                this.question = rs.q
            }
        },
        goNext() {
            this.num = this.num + 1
            //number = Math.floor(Math.random() * r.length)
            if (qs > r.length) qs = 0
            number = rand[qs]
            qs++

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
                if (this.isDark) this.styles.push([{ background: '#333', color: '#CCC' }, { background: '#333', color: '#CCC' }, { background: '#333', color: '#CCC' }, { background: '#333', color: '#CCC' }])
                else this.styles.push([{ background: '#EEE', color: '#222' }, { background: '#EEE', color: '#222' }, { background: '#EEE', color: '#222' }, { background: '#EEE', color: '#222' }])
            }
            for (let i = 0; i < this.question.length; i++) {
                this.picked.push(null)
            }

        }
    }
}

</script>


<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: #0C9;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

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

.lightBorder1 {
    border: 1px groove #DDD;
    background-color: #EEE;
}

.darkBorder1 {
    border: 1px groove #444;
    background-color: #333;
}

.light {
    background-color: #EEE;
    color: #222;
}

.lightBack {
    background-color: #DDD;
}

.lightNoBack {
    color: #222;
}
</style>