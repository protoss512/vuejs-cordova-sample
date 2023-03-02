
<template>
  <div>
    <div>{{ $t("question") + id }}</div>
    <v-container>
      <div>{{ question }}</div>
      <div v-if='isExp'>
        <div>{{ isCorrect ? 'good' : 'bad' + ' ' + answer }}</div>
        <div>{{ exp }}</div>
      </div>
      <v-list-item v-else v-for="item in sels" v-bind:key="item">
        <v-btn style="text-transform: initial !important;" block @click="onSel(item)">
          {{ item }}
        </v-btn>
      </v-list-item>
      <v-btn v-if='isExp' block @click="goNext">{{ $t("go_next") }}</v-btn>
      <v-btn v-else-if="selected != ''" block @click="doVibrate">{{ $t("to_answer") }}</v-btn>
    </v-container>
  </div>
</template>

<script>
import i18n from '../i18n';
import { q } from '../question.js'
export default {
  name: 'vibration',
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
    i18n.locale = 'zh'
    this.id = '一'
    this.question = q[0].q
    this.sels.push(q[0].s[0])
    this.sels.push(q[0].s[1])
    this.sels.push(q[0].s[2])
    this.sels.push(q[0].s[3])
    this.exp = q[0].e
  },
  methods: {
    goNext() {
      window.location.hash = '/';
    },
    onSel(item) {
      this.selected = item
      let a = q[0].q
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
      if (this.selected == q[0].a) {
        this.isCorrect = true
      } else {
        this.isCorrect = false
      }
      this.answer = q[0].a
      this.isExp = true
      //window.location.hash = '/';
    }
  }
}
</script>
