<template>
    <div style="display:flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;">
        <div style="flex:1;background-color: #222;margin: 10px;display:flex;">
            <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"><img
                    style="background-color: #222;" src="../assets/arrow_back.svg" @click="goHome"></div>
            <div style="flex:1;display: flex;justify-content: center;align-items: center;color: #ccc;">{{
                $t("vocabulary") }}</div>
            <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"></div>
        </div>
        <hr style="border: 1px groove #666;margin-left: 10px;margin-right: 10px;">
        <div
            style="flex:90;margin: 10px;padding-top: 10px;display: flex;flex-direction:column;justify-content: center;align-items: center;">
            <div style="flex:1;display: flex;flex-direction:column;justify-content: center;align-items: center;">
                <div style="font-size: 30px;color:#ccc;margin-bottom: 10px;">{{ question }}</div>
                <div style="color: #ccc;">{{ anwser }}</div>
                <div style="margin-top: 20px;background-color: #252525 !important;border-radius: 15px;height: 60px;width: 300px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
                    @click="goNext">
                    <div>{{ $t("go_next") }}</div>
                </div>
            </div>
            <div style="flex:1"></div>
        </div>
    </div>
</template>

<script>
import { a } from '../Vocabulary'
var number = 0
export default {
    name: 'Vocabulary',
    data: () => {
        return {
            isReport: false,
            question: '',
            anwser: ''
        }
    },
    mounted() {
        number = Math.floor(Math.random() * a.length)
        this.question = a[number].e
        this.anwser = a[number].ex
    },
    methods: {
        goHome() {
            window.location.hash = '/'
        },
        openReport() {
            this.isReport ^= true
        },
        goNext() {
            number = Math.floor(Math.random() * a.length)
            this.question = a[number].e
            this.anwser = a[number].ex
        }
    }
}

</script>