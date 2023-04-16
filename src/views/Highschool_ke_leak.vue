
<template>
  <!--div
    style="overflow:hidden;display:flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;margin-left: 10px;margin-right: 10px;">
    
    <div style="flex:1;overflow-y: auto;height: 100vh;">
      <div v-if="isDetail"
        style="position: fixed;top:0;left:0;width:100vw;height:100vh;z-index:3;background-color:rgba(0,0,0,0.3);color:black;display:flex">
        <div
          style="background-color:#222;flex:1;display:flex;flex-direction:column;margin-top: 24vh;margin-bottom:24vh;margin-left: 2vw;margin-right: 2vw;border-radius: 3vw;"
          :style="mystyle">
          <div style="flex:1;background-color: #222;margin: 5px;display:flex;">
            <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"></div>
            <div style="flex:5;display: flex;justify-content: center;align-items: center;color: #ccc;font-weight: bold;">
              <div style="margin-right: 10px;">{{
                $t("translation") }}</div>
            </div>
            <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"><img style=""
                src="../assets/close.svg" @click="closeDetail"></div>
          </div>
          <hr style="margin-bottom: 10px;border: 1px groove #666;margin-left: 10px;margin-right: 10px;">
          <div style="flex:10;color: #ccc;margin: 10px;">
            {{ onExp }}
          </div>
        </div>
      </div>
      <div v-if='isExp' style="margin-left: 20px;display: inline-block;"><img style="" src="../assets/speech.svg"
          @click="speech(real)"></div>
      <div v-if='isExp' style="margin-left: 20px;display: inline-block;"><img style="" src="../assets/text.svg"
          @click="onEn"></div>
    </div>
    
    </div>
                                                                                                                                                                      </div-->

  <div style="display:flex;flex-direction:column;height: 100vh;">
    <div style="overflow-y: auto;margin: 10px;">
      <div class="demo-card-square mdl-card " style="width:100%;background-color: #333;">
        <div class="mdl-card__supporting-text" :style="mystyle" style="width:100%;">
          <div v-if="isExp" style="color:#AAA">{{ real }}</div>
          <div v-else style="color:#CCC">{{ question }}</div>
        </div>
        <hr style="margin: 0;padding: 0;border: 1px groove #444;">
        <div v-if='isExp' :style="mystyle">
          <div style="margin: 10px;color: #CCC;">
            {{ isCorrect ? $t("correct") : $t("fail") + sel }}</div>
          <hr style="margin-top: 10px;margin-bottom: 10px;border: 1px groove #444;">
          <div style="margin: 10px;color: #CCC;">{{ exp }}</div>
        </div>
        <div v-else v-for="(item, index) in sels" v-bind:key="index" :style="mystyle">
          <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-card__supporting-text"
            @click="onSel(item, index)"
            style="display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;">
            <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;color: #777;">{{ index == 0 ?
              'A. ' : index
                == 1 ? 'B. ' : index == 2 ? 'C. ' : 'D. ' }}</div>
            <div style="flex:100;display: flex;justify-content: center;align-items: center;color: #CCC;">{{
              item }}</div>
          </button>
          <hr style="margin: 0;padding: 0;border: 1px groove #444;">
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <button v-if='isExp' @click="goNext"
            class="mdl-button mdl-js-button mdl-card__supporting-text mdl-button--primary"
            style="display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;font-weight: bold;">
            {{ $t("go_next") }}
          </button>
          <button v-else-if="selected != ''" @click="anwser"
            class="mdl-button mdl-js-button mdl-card__supporting-text mdl-button--primary"
            style="display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;font-weight: bold;">
            {{ $t("to_answer") }}
          </button>
          <button v-else class="mdl-button mdl-js-button mdl-card__supporting-text" disabled
            style="display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:#444;font-weight: bold;">
            {{ $t("to_answer") }}
          </button>
        </div>
      </div>
    </div>
    <div style="height: 60px;"></div>
  </div>
</template>

<script>
import * as tool from '../tool';
import { q } from '../question.js'
import i18n from '../i18n';
var number = 0
export default {
  name: 'Highschool_ke_leak',
  data: () => {
    return {
      sels: [],
      question: '',
      selected: '',
      isCorrect: false,
      exp: '',
      isExp: false,
      answer: '',
      sel: '',
      cor_num: 1,
      tot_num: 1,
      isDetail: false,
      onExp: '',
      mystyle: '',
      real: '',
      speech_rate: 0.6,
      styles: ['background-color: #222;', 'background-color: #222;', 'background-color: #222;', 'background-color: #222;']
    }
  },
  mounted() {
    this.$parent.title = i18n.t("to_Ke_Leak")

    number = Math.floor(Math.random() * q.length)
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

    const [s, t] = tool.getLang()
    this.mystyle = s

    this.speech_rate = tool.getSpeechRate()
  },
  methods: {
    speech(t) {
      if (tool.checkVersion() == 'web') {
        const synth = window.speechSynthesis;
        if (synth.speaking) {
          console.error("speechSynthesis.speaking");
          return;
        }


        const utterThis = new SpeechSynthesisUtterance(t);

        utterThis.onend = function (event) {
          console.log("SpeechSynthesisUtterance.onend");
        };

        utterThis.onerror = function (event) {
          console.error("SpeechSynthesisUtterance.onerror");
        };
        console.log(this.speech_rate)
        utterThis.pitch = 0.8;
        utterThis.rate = this.speech_rate
        synth.speak(utterThis);
      } else {
        TTS
          .speak({
            text: t,
            locale: 'en-US',//en-US en-GB
            rate: this.speech_rate
          }).then(function () {
            alert('success');
          }, function (reason) {
            alert(reason);
          });
      }
    },
    onEn() {
      this.onExp = q[number].z
      this.isDetail = true
    },
    closeDetail() {
      if (this.isDetail) this.isDetail = false
    },
    goNext() {
      this.styles = ['background-color: #222;', 'background-color: #222;', 'background-color: #222;', 'background-color: #222;']
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
      //window.location.hash = '/Main'

    },
    onSel(item, index) {
      this.selected = item
      let a = q[number].q
      a = a.replace('_', item)
      this.question = a.replace(/\_/g, '')
      this.styles = ['background-color: #222;', 'background-color: #222;', 'background-color: #222;', 'background-color: #222;']
      this.styles[index] = 'background-color: #333;'
    },
    anwser() {

      let a = q[number].q
      a = a.replace('_', q[number].a)
      this.real = a.replace(/\_/g, '')

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
      this.answer = q[number].a
      for (let i = 0; i < this.sels.length; i++) {
        if (this.sels[i] == this.answer) {
          switch (i) {
            case 0:
              this.sel = 'A. ' + this.answer
              break
            case 1:
              this.sel = 'B. ' + this.answer
              break
            case 2:
              this.sel = 'C. ' + this.answer
              break
            case 3:
              this.sel = 'D. ' + this.answer
              break
          }

        }
      }

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

.demo-card-square.mdl-card {
  border-radius: 8px;

}
</style>