// Require Cordova plugin : cordova-plugin-vibration

<template>
  <v-container text-center>
    <v-btn style="vertical-align: top;" @click="doVibrate">{{ $t("startVibration") }}</v-btn>
  </v-container>
</template>

<script>
import { q } from '../question.js'
export default {
  name: 'vibration',
  methods: {
    doVibrate() {
      // Do vibration if available
      /*if (navigator.vibrate){
        // S.O.S in Morse ;)
        navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]);
      }else{
        this.$vuetifyMessageDialog.open("Attention", "[cordova-plugin-vibration] Is required to use this function", "Ok", "red")
      }*/
      console.log(q[0].q,q[0].s,q[0].a,q[0].e)
      window.location.hash = '/';
    }
  }
}
</script>
