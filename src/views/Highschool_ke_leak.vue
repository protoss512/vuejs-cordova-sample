
<template>
  <div style="display:flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;">
    <div style="flex:1;background-color: #222;margin: 5px;display:flex;">
      <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"><img style="background-color: #222;" src="../../public/arrow_back.svg" @click="goHome"></div>
      <div style="flex:1;display: flex;justify-content: center;align-items: center;">{{ $t("question") + id }}</div>
      <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"><img style="background-color: #222;" src="../../public/report.svg" @click="goHome"></div>
    </div>
    <div style="flex:90;margin: 10px;padding-top: 10px;">
      <div>{{ question }}</div>
      <div v-if='isExp'>
        <div style="padding-top: 5px;">{{ isCorrect ? $t("correct") : $t("fail") + answer }}</div>
        <div style="padding-top: 5px;">{{ exp }}</div>
      </div>
      <v-list-item v-else v-for="item in sels" v-bind:key="item">
        <v-btn style="text-transform: initial !important;" block @click="onSel(item)">
          {{ item }}
        </v-btn>
      </v-list-item>
      <v-btn style="margin-top: 20px;" :disabled="selected == '' || answer != ''" block @click="doVibrate">{{
        $t("to_answer") }}</v-btn>
      <v-btn v-if='isExp' block @click="goNext">{{ $t("go_next") }}</v-btn>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import { q } from '../question.js'
var number = 0
export default {
  name: 'Highschool_ke_leak',
  data: () => {
    return {
      id: '',
      sels: [],
      question: '',
      selected: '',
      isCorrect: false,
      exp: '',
      isExp: false,
      answer: ''
    }
  },
  mounted() {
    number = Math.floor(Math.random() * q.length)
    i18n.locale = 'zh'
    this.id = 1
    this.question = q[number].q
    this.sels.push(q[number].s[0])
    this.sels.push(q[number].s[1])
    this.sels.push(q[number].s[2])
    this.sels.push(q[number].s[3])
    this.exp = q[number].e
  },
  methods: {
    goNext() {
      this.id += 1
      number = Math.floor(Math.random() * q.length)
      this.question = q[number].q
      this.sels = []
      this.sels.push(q[number].s[0])
      this.sels.push(q[number].s[1])
      this.sels.push(q[number].s[2])
      this.sels.push(q[number].s[3])
      this.exp = q[number].e
      this.isCorrect = false
      this.isExp = false
      this.selected = ''
      this.answer = ''
    },
    goHome() {
      window.location.hash = '/'
    },
    onSel(item) {
      this.selected = item
      let a = q[number].q
      a = a.replace('_', item)
      this.question = a.replace(/\_/g, '')
    },
    doVibrate() {
      // Do vibration if available
      /*if (navigator.vibrate){
        // S.O.S in Morse ;)
        navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]);
      }else{
        this.$vuetifyMessageDialog.open("Attention", "[cordova-plugin-vibration] Is required to use this function", "Ok", "red")
      }*/
      if (this.selected == q[number].a) {
        this.isCorrect = true
      } else {
        this.isCorrect = false
      }
      this.answer = q[number].a
      this.isExp = true
      //window.location.hash = '/';
    }
  }
}
</script>
