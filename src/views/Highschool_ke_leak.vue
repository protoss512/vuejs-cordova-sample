
<template>
  <div style="display:flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;">
    <div style="flex:1;background-color: #222;margin: 10px;display:flex;">
      <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"><img
          style="background-color: #222;" src="../assets/arrow_back.svg" @click="goHome"></div>
      <div style="flex:1;display: flex;justify-content: center;align-items: center;color: #ccc;">{{
        $t("to_Ke_Leak") }}</div>
      <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"></div>
    </div>
    <hr style="margin-left: 10px;margin-right: 10px;margin-bottom: 10px;border: 1px groove #666;">
    <div style="flex:100;margin-left: 10px;margin-right: 10px;">
      <div v-if='!isExp' style="color: #ddd;">{{ question }}</div>
      <div v-else style="display: inline-block;" v-for="(item, index) in ques" v-bind:key="index">
        <div style="margin: 2px;padding: 3px;" @click="onEn(item)" :id="index" :class="{
          'correct_color': item.includes('_') && isCorrect,
          'error_color': item.includes('_') && !isCorrect,
          'normal_color': vocabularys.filter(e => e.e.toLowerCase() === item.toLowerCase()).length > 0,
        }">
          {{
            item.includes('_') ? selected : item }}</div>
      </div>
      <hr style="margin-top: 10px;border: 1px groove #666;margin-bottom: 10px;">
      <div v-if='isExp'>
        <div style="display: inline-block;" v-for="(item, index) in sels" v-bind:key="index">
          <div style="margin: 2px;padding: 3px;" @click="onEn(item)"
            :class="answer.toLowerCase() == item.toLowerCase() ? 'correct_color' : 'normal_color'">
            {{ index == 0 ? 'A. ' : index == 1 ? 'B. ' : index == 2 ? 'C. ' : 'D. ' }}{{ item }}</div>
        </div>
        <div style="padding-top: 5px;">{{ exp }}</div>
      </div>
      
      <v-list-item v-else v-for="item in sels" v-bind:key="item">
        <v-btn style="text-transform: initial !important;" block @click="onSel(item)">
          {{ item }}
        </v-btn>
      </v-list-item>
      <v-btn style="margin-top: 20px;" :disabled="selected == '' || answer != ''" block @click="anwser">{{
        $t("to_answer") }}</v-btn>

      <v-btn v-if='isExp' block @click="goNext">{{ $t("go_next") }}</v-btn>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import { q } from '../question.js'
import { a } from '../Vocabulary.js'
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
      answer: '',
      isReport: false,
      ques: [],
      cor_num: 1,
      tot_num: 1,
      qlist: [],
      vocabularys: []
    }
  },
  mounted() {
    number = Math.floor(Math.random() * q.length)
    i18n.locale = 'zh'
    this.id = 1
    this.vocabularys = a
    this.question = q[number].q
    this.sels.push(q[number].s[0])
    this.sels.push(q[number].s[1])
    this.sels.push(q[number].s[2])
    this.sels.push(q[number].s[3])
    this.exp = q[number].e
    if (localStorage.getItem('Total_num') == 'NaN') localStorage.setItem('Total_num', '1')
    if (localStorage.getItem('Correct_num') == 'NaN') localStorage.setItem('Correct_num', '1')
    this.cor_num = parseInt(localStorage.getItem('Correct_num'))
    this.tot_num = parseInt(localStorage.getItem('Total_num'))
    console.log(a[0], a[100])
  },
  methods: {
    onEn(item) {
      if (a.filter(e => e.e.toLowerCase() === item.toLowerCase()).length > 0) {
        let index = a.findIndex(x => x.e.toLowerCase() === item.toLowerCase())
        console.log(a[index].ex)
      } else {
        console.log(item)
      }

    },
    openReport() {
      this.isReport ^= true
    },
    goNext() {
      this.id += 1
      number = Math.floor(Math.random() * q.length)
      this.question = q[number].q
      this.ques = []
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
    anwser() {
      let tnum = parseInt(localStorage.getItem('Total_num'))
      tnum += 1
      this.tot_num = tnum
      localStorage.setItem('Total_num', tnum.toString())

      if (this.selected.toLowerCase() == q[number].a.toLowerCase()) {
        this.isCorrect = true
        let cnum = parseInt(localStorage.getItem('Correct_num'))
        cnum += 1
        this.cor_num = cnum
        localStorage.setItem('Correct_num', cnum.toString())
      } else {
        this.isCorrect = false
      }
      this.ques = q[number].q.split(" ")
      this.answer = q[number].a
      this.isExp = true
      //console.log(localStorage.getItem('Correct_num'), localStorage.getItem('Total_num'))
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