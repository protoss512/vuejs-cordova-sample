<template>
    <div style="display:flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;">
        <div style="flex:1;background-color: #222;margin: 5px;display:flex;">
            <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"><img
                    style="background-color: #222;" src="../assets/arrow_back.svg" @click="goHome"></div>
            <div style="flex:1;display: flex;justify-content: center;align-items: center;">{{
                isReport ? $t("analysis") : $t("question") + id }}</div>
            <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"><img
                    style="background-color: #222;" src="../assets/report.svg" @click="openReport"></div>
        </div>
        <div v-if="isReport" style="flex:90;margin: 10px;padding-top: 10px;display: flex;flex-direction:column;">
            <div style="flex:1">{{ $t("correct_rate") }}</div>
            <div style="flex:1">{{ $t("total_question") }}</div>
            <div style="flex:1">{{ $t("total_correct") }}</div>
        </div>
        <div v-else
            style="flex:90;margin: 10px;padding-top: 10px;display: flex;flex-direction:column;justify-content: center;align-items: center;">
            <div style="flex:1;">
                <div>{{ question }}</div>
                <div>{{ anwser }}</div>
                <v-btn @click="goNext">{{ $t("go_next") }}</v-btn>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
import { QA } from '../assets/QA_TABLE'
var number = 0
export default {
    name: 'Vocabulary',
    data: () => {
        return {
            id: '1',
            isReport: false,
            question: '',
            anwser: ''
        }
    },
    mounted() {
        this.id = 1
        number = Math.floor(Math.random() * QA.length)
        this.question = QA[number].en
        this.anwser = QA[number].ch
    },
    methods: {
        goHome() {
            window.location.hash = '/'
        },
        openReport() {
            this.isReport ^= true
        },
        goNext() {
            this.id += 1
            number = Math.floor(Math.random() * QA.length)
            this.question = QA[number].en
            this.anwser = QA[number].ch
        }
    }
}

</script>