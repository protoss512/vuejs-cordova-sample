<template>
    <div
        style="overflow:hidden;display:flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;margin-left: 10px;margin-right: 10px;">
        <div style="flex:1;background-color: #222;margin: 10px;display:flex;">
            <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"><img
                    style="background-color: #222;" src="../assets/arrow_back.svg" @click="goHome"></div>
            <div style="flex:1;display: flex;justify-content: center;align-items: center;color: #ccc;">{{
                $t("to_read") }}</div>
            <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"></div>
        </div>
        <hr style="margin-bottom: 10px;border: 1px groove #666;">
        <div style="flex:100;display: flex;flex-direction:column;height: 100vh;">
            <div style="flex:1;overflow-y: auto;">
                <div>{{ article }}</div>
                <div style="height: 20px;"></div>
            </div>
            <hr style="margin-bottom: 10px;border: 1px groove #666;">
            <div style="flex:1;overflow-y: auto;height: 100vh;">
                <div style="margin-left: 10px;margin-right: 10px;" v-for="(item, index) in question" v-bind:key="index">
                    <div> {{ 'Q ' + (parseInt(index) + 1).toString() + '. ' + item }}</div>

                    <input type="radio" :id="index + 'A'" value="A" v-model="picked[index]">
                    <label :for="index + 'A'">{{ 'A. ' + sel[index][0] }}</label>
                    <br>
                    <input type="radio" :id="index + 'B'" value="B" v-model="picked[index]">
                    <label :for="index + 'B'">{{ 'B. ' + sel[index][1] }}</label>
                    <br>
                    <input type="radio" :id="index + 'C'" value="C" v-model="picked[index]">
                    <label :for="index + 'C'">{{ 'C. ' + sel[index][2] }}</label>
                    <br>
                    <input type="radio" :id="index + 'D'" value="D" v-model="picked[index]">
                    <label :for="index + 'D'">{{ 'D. ' + sel[index][3] }}</label>
                    <br>
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
                <div v-if="!isExp && picked.length == question.length" @click="toAnswer"
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
            console.log(this.answer[0][1])
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