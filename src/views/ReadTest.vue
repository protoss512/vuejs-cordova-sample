<template>
    <div style="overflow: hidden;display:flex;flex-direction:column;height: 100vh;width: 100vw;margin:0;padding: 0;">
        <div style="flex:1;background-color: #222;margin: 10px;display:flex;">
            <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"><img
                    style="background-color: #222;" src="../assets/arrow_back.svg" @click="goHome"></div>
            <div style="flex:1;display: flex;justify-content: center;align-items: center;color: #ccc;">{{
                $t("to_read") }}</div>
            <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"></div>
        </div>
        <hr style="margin-bottom: 10px;border: 1px groove #666;margin-left: 10px;margin-right: 10px;">
        <div style="flex:100;display: flex;flex-direction:column;height: 100vh;width: 100vw;">
            <div v-show="!isStep" v-if="!isReset" style="flex:100;overflow-y: auto;margin-left: 10px;margin-right: 10px;">
                <div style="color: #ccc;">{{ article }}</div>
                <div style="height: 20px;"></div>
                <div style="flex:1"></div>
            </div>
            <div v-show="isStep" style="flex:100;overflow-y: auto;margin-left: 10px;margin-right: 10px;color: #ccc;">
                <div v-if="!isReset" v-for="(item, index) in question" v-bind:key="index">
                    <div style="font-weight: bold;font-size: 18px;margin-bottom: 5px;"> {{ 'Q ' + (parseInt(index) +
                        1).toString() + '. ' + item }}</div>
                    <input style="margin-bottom: 15px;margin-left: 10px;" type="radio" :disabled="isExp" :id="index + 'A'"
                        value="A" v-model="picked[index]">
                    <label style="" :for="index + 'A'">{{ ' A. ' + sel[index][0] }}</label>
                    <br>
                    <input style="margin-bottom: 15px;margin-left: 10px;" type="radio" :disabled="isExp" :id="index + 'B'"
                        value="B" v-model="picked[index]">
                    <label :for="index + 'B'">{{ ' B. ' + sel[index][1] }}</label>
                    <br>
                    <input style="margin-bottom: 15px;margin-left: 10px;" type="radio" :disabled="isExp" :id="index + 'C'"
                        value="C" v-model="picked[index]">
                    <label :for="index + 'C'">{{ ' C. ' + sel[index][2] }}</label>
                    <br style="height: 10px;">
                    <input style="margin-left: 10px;" type="radio" :disabled="isExp" :id="index + 'D'" value="D"
                        v-model="picked[index]">
                    <label :for="index + 'D'">{{ ' D. ' + sel[index][3] }}</label>
                    <br style="height: 10px;">
                    <div style="margin-top: 5px;" v-show="isExp" :class="{
                        'correct_color': answer[index][1] == picked[index],
                        'init_color': answer[index][1] != picked[index]
                    }">{{ $t("fail") + ' ' + answer[index] }}</div>
                    <div style="margin-top: 5px;" v-show="isExp">{{ $t("explanation") + ' : ' + exp[index] }}</div>
                    <hr v-show="(index + 1) != question.length"
                        style="margin-top: 10px;margin-bottom: 10px;border: 1px groove #666;">
                </div>
                <div style="flex:1"></div>
            </div>
            <hr style="margin-bottom: 20px;margin-top:20px;border: 1px groove #666;margin-left: 10px;margin-right: 10px;">
            <div v-if="!isExp && isAnswer || isNext"
                style="height: 150px;display: flex;justify-content: center;margin-left: 10px;margin-right: 10px;">
                <div style="flex:1;background-color: #252525 !important;border-radius: 15px;height: 60px;width: 100%;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
                    @click="toStep">
                    {{ isStep ? $t("look_read") : $t("read_answer") }}
                </div>
                <div v-if="isNext" @click="goNext"
                    style="margin-left: 10px;flex:1;background-color: #252525 !important;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;">
                    {{ $t("go_next") }}
                </div>
                <div v-if="!isExp && isAnswer" @click="toAnswer"
                    style="flex:1;margin-left: 10px;background-color: #252525 !important;border-radius: 15px;height: 60px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;">
                    {{ $t("to_answer") }}
                </div>
            </div>
            <div v-else style="height: 150px;display: flex;justify-content: center;margin-left: 10px;margin-right: 10px;">
                <div style="flex:1;background-color: #252525 !important;border-radius: 15px;height: 60px;width: 100%;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
                    @click="toStep">
                    {{ isStep ? $t("look_read") : $t("read_answer") }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '../i18n';
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
            isNext: false
        }
    },
    computed: {
        // a computed getter
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
        i18n.locale = 'zh'
        number = Math.floor(Math.random() * r.length)
        let rs = r[number]
        this.article = rs.ar
        this.question = rs.q
        this.sel = rs.q_sel
        this.answer = rs.q_a
        this.exp = rs.q_ex
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
            }, 5)
        },
        onEn(item) {

        },
        onSel(item) {

        },
        goHome() {
            window.location.hash = '/'
        },
        goNext() {
            number = Math.floor(Math.random() * r.length)

            this.article = ''
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
                this.question = rs.q
                this.answer = rs.q_a
                this.exp = rs.q_ex
                this.sel = rs.q_sel
                this.isReset = false
                this.isStep = false
                this.isExp = false
                this.isNext = false
            }, 5)
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