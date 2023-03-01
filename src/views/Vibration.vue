
<template>
  <v-container text-center>
    <div>{{ $t("question") + id }}</div>
    <div>{{ question }}</div>
    <div>{{ selA }}</div>
    <div>{{ selB }}</div>
    <div>{{ selC }}</div>
    <div>{{ selD }}</div>
    <div>{{ exp }}</div>
    <v-btn style="vertical-align: top;" @click="doVibrate">{{ $t("startVibration") }}</v-btn>
  </v-container>
</template>

<script>
import { q } from '../question.js'
export default {
  name: 'vibration',
  data: () => {
    return {
      id: '',
      question: '',
      selA: '',
      selB: '',
      selC: '',
      selD: '',
      exp: ''
    }
  },
  mounted() {
    this.id = '一'
    this.question = q[0].q
    this.selA = q[0].s[0]
    this.selB = q[0].s[1]
    this.selC = q[0].s[2]
    this.selD = q[0].s[3]
    this.exp = q[0].e
  },
  methods: {
    doVibrate() {
      // Do vibration if available
      /*if (navigator.vibrate){
        // S.O.S in Morse ;)
        navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]);
      }else{
        this.$vuetifyMessageDialog.open("Attention", "[cordova-plugin-vibration] Is required to use this function", "Ok", "red")
      }*/

      window.location.hash = '/';
    }
  }
}
</script>
