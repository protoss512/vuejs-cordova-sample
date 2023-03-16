<template>
    <div
        style="display:flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;margin-left: 10px;margin-right: 10px;">
        <div style="flex:1;background-color: #222;margin: 10px;display:flex;">
            <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"><img
                    style="background-color: #222;" src="../assets/arrow_back.svg" @click="goHome"></div>
            <div style="flex:1;display: flex;justify-content: center;align-items: center;color: #ccc;">{{
                $t("to_read") }}</div>
            <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"></div>
        </div>
        <hr style="margin-bottom: 10px;border: 1px groove #666;">
        <div style="flex:100;">
            {{ article }}
            {{ question }}
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
            question: '',

        }
    },
    mounted() {
        i18n.locale = 'zh'
        number = Math.floor(Math.random() * r.length)
        let rs = r[number]
        this.article = rs.ar
        for (let i = 0; i < rs.q.length; i++) {
            this.question += `\r\n${rs.q[i]}`
        }
    },
    methods: {
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

        }
    }
}

</script>