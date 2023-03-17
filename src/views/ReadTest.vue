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
            <div style="flex:1;overflow-y: auto;margin-left: 10px;margin-right: 10px;">
                <div style="color: #ccc;">{{ article }}</div>
                <div style="height: 20px;"></div>
            </div>
            <hr style="margin-bottom: 10px;border: 1px groove #666;margin-left: 10px;margin-right: 10px;">
            <div style="flex:1;overflow-y: auto;margin-left: 10px;margin-right: 10px;color: #ccc;">
                <div style="" v-for="(item, index) in question" v-bind:key="index">
                    <div> {{ 'Q ' + (parseInt(index) + 1).toString() + '. ' + item }}</div>

                    <input type="radio" :disabled="isExp" :id="index + 'A'" value="A" v-model="picked[index]">
                    <label :for="index + 'A'">{{ 'A. ' + sel[index][0] }}</label>
                    <br style="height: 10px;">
                    <input type="radio" :disabled="isExp" :id="index + 'B'" value="B" v-model="picked[index]">
                    <label :for="index + 'B'">{{ 'B. ' + sel[index][1] }}</label>
                    <br style="height: 10px;">
                    <input type="radio" :disabled="isExp" :id="index + 'C'" value="C" v-model="picked[index]">
                    <label :for="index + 'C'">{{ 'C. ' + sel[index][2] }}</label>
                    <br style="height: 10px;">
                    <input type="radio" :disabled="isExp" :id="index + 'D'" value="D" v-model="picked[index]">
                    <label :for="index + 'D'">{{ 'D. ' + sel[index][3] }}</label>
                    <br style="height: 10px;">
                    <div v-if="isExp" :class="{
                        'correct_color': answer[index][1] == picked[index],
                        'init_color': answer[index][1] != picked[index]
                    }">{{ $t("fail") + ' : ' + answer[index] }}</div>
                    <div v-if="isExp">{{ $t("explanation") + ' : ' + exp[index] }}</div>
                    <hr style="margin-top: 10px;margin-bottom: 10px;border: 1px groove #666;">
                </div>
                <div v-if="isExp" @click="goNext"
                    style="margin-bottom: 100px;margin-top: 20px;background-color: #252525 !important;border-radius: 5px;height: 50px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;">
                    {{ $t("go_next") }}
                </div>
                <div v-if="!isExp && isAnswer" @click="toAnswer"
                    style="margin-top:20px;background-color: #252525 !important;border-radius: 5px;height: 50px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;">
                    {{ $t("to_answer") }}
                </div>
                <div style="height: 100px;"></div>
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
            picked: []
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

    },
    methods: {
        toAnswer() {
            let rs = r[number]
            this.answer = rs.q_a
            this.exp = rs.q_ex
            this.isExp = true
            console.log(this.picked.length, this.picked, this.question.length)
        },
        onEn(item) {

        },
        closeDetail() {

        },
        onSel(item) {

        },
        goHome() {
            window.location.hash = '/'
        },
        goNext() {
            number = Math.floor(Math.random() * r.length)
            let rs = r[number]
            this.article = rs.ar
            this.question = rs.q
            this.sel = rs.q_sel
            this.isExp = false
            this.picked = []
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