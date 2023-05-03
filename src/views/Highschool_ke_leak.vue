
<template>
  <div style="height: 100vh;" :class="isDark ? 'darkBack' : 'lightBack'">
    <div style="overflow-y: auto;padding: 10px;display:flex;flex-direction:column;">

      <div class="demo-card-square mdl-card"
        style="width:100%;border-radius: 8px;box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);margin-bottom: 60px;"
        :class="isDark ? 'dark' : 'light'">

        <div :style="mystyle" :class="isDark ? 'dark' : 'light'" style="width: 100%;padding: 10px;">
          <div :class="isDark ? 'darkGray' : 'lightGray'" style="margin-bottom: 5px;font-size: 14px;">Q{{ num }}.</div>
          <div v-if="isExp" style="line-height:1.2" :class="isDark ? 'darkGray' : 'lightGray'">{{ real }}</div>
          <div v-else style="line-height:1.2">{{ question }}</div>
          <div style="text-align: right;margin-top: 10px;" v-if='isExp'><v-icon
              style="padding: 0 5px 0 5px;margin-right: 10px;" @click="onEn"
              :class="isDark ? 'dark' : 'light'">mdi-translate</v-icon><v-icon style="padding: 0 5px 0 5px;"
              @click="speech(real)" :class="isDark ? 'dark' : 'light'">mdi-text-to-speech</v-icon></div>
        </div>
        <div v-if='isExp' :style="mystyle" :class="isDark ? 'dark' : 'light'">
          <div style="margin: 10px;line-height:1.2">
            {{ isCorrect ? $t("correct") : $t("fail") + sel }}</div>
          <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
          <div style="margin: 10px;line-height:1.2">{{ exp }}</div>
        </div>

        <div v-else v-for="(item, index) in sels" v-bind:key="index" :class="isDark ? 'dark' : 'light'">
          <button class="mdl-button mdl-js-button mdl-js-ripple-effect" @click="onSel(item, index)"
            style="text-transform: none;text-align: left;margin: 5px;padding: 5px 0 10px 0;width: 97%;">
            <div style="display: inline;margin-right: 5px;padding-left: 10px;font-size: 14px;"
              :class="isDark ? 'darkGray' : 'lightGray'">{{ index == 0
                ?
                'A. ' : index
                  == 1 ? 'B. ' : index == 2 ? 'C. ' : 'D. ' }}</div>
            <div :style="mystyle" style="display: inline;line-height:1.2;" :class="isDark ? 'darkNoBack' : 'lightNoBack'">
              {{
                item }}</div>
          </button>
          <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
        </div>
        <div class="mdl-card__actions mdl-card--border" :class="isDark ? 'dark' : 'light'">
          <button v-if='isExp' @click="goNext" class="mdl-button mdl-js-button mdl-button--primary"
            style="font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;">
            {{ $t("go_next") }}
          </button>
          <button v-else-if="selected != ''" @click="anwser" class="mdl-button mdl-js-button mdl-button--primary"
            style="font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;">
            {{ $t("to_answer") }}
          </button>
          <button v-else class="mdl-button mdl-js-button" disabled
            style="font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:#888;">
            {{ $t("to_answer") }}
          </button>
        </div>
      </div>

    </div>
    <div v-if="isDetail" @click="closeDetail"
      style="position: fixed;top:0;left:0;width:100vw;height:100vh;z-index:1;background-color:rgba(0,0,0,0.3);">
    </div>
    <div v-if="isDetail" class="demo-card-square" :class="isDark ? 'dark' : 'light'"
      style="position: fixed;top:30%;left: 5%;border-radius: 8px;width: 90%;z-index:2;display:flex;flex-direction:column;"
      :style="mystyle">
      <div style="width: 100%;padding: 10px;">
        <div style="margin-bottom: 5px;width: 100%;font-size: 12px;" :class="isDark ? 'darkGray' : 'lightGray'">{{
          $t("trans_not") }}</div>
        <div style="font-size: 20px;line-height:1.2;width: 100%;" :class="isDark ? 'dark' : 'light'">
          {{ onExp }}
        </div>
      </div>
      <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
      <div class="mdl-card__actions mdl-card--border">
        <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="closeDetail"
          style="padding: 0;font-size: 22px;display: flex;justify-content: center;align-items: center;width: 100%;text-transform: none;color:dodgerblue;">
          {{ $t(" close") }} </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as tool from '../tool';
import { q } from '../question.js'
import i18n from '../i18n';
var number = 0
var rand = []
var qs = 0
export default {
  name: 'Highschool_ke_leak',
  data: () => {
    return {
      num: 1,
      sels: [],
      isDark: localStorage.getItem('Dark_mode') == '1' ? true : false,
      question: '',
      selected: '',
      isCorrect: false,
      exp: '',
      isExp: false,
      answer: '',
      sel: '',
      isDetail: false,
      onExp: '',
      mystyle: '',
      real: '',
      speech_rate: 0.6,
    }
  },
  beforeDestroy() {
    this.$emit('title', 'exit');
  },
  mounted() {

    console.log(q.length)

    this.$emit('title', i18n.t("to_Ke_Leak") + ' ');
    setTimeout(() => {
      this.$emit('title', i18n.t("to_Ke_Leak"));
    }, 100)

    const [s, t] = tool.getLang()
    this.mystyle = s
    this.speech_rate = tool.getSpeechRate()

    for (let i = 0; i < q.length; i++) {
      rand.push(i)
    }
    rand = tool.shuffle(rand)

    if (qs > q.length) qs = 0
    number = rand[qs]
    qs++

    this.question = q[number].q

    this.sels.push(q[number].s[0])
    this.sels.push(q[number].s[1])
    this.sels.push(q[number].s[2])
    this.sels.push(q[number].s[3])
    this.exp = q[number].e

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
      this.num = this.num + 1
      if (qs > q.length) qs = 0
      number = rand[qs]
      qs++
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
    onSel(item, index) {
      this.selected = item
      let a = q[number].q
      a = a.replace('_', item)
      this.question = a.replace(/\_/g, '')
    },
    anwser() {

      let a = q[number].q
      a = a.replace('_', q[number].a)
      this.real = a.replace(/\_/g, '')

      let tnum = parseInt(localStorage.getItem('Total_num5'))
      tnum += 1
      localStorage.setItem('Total_num5', tnum.toString())

      if (this.selected.toLowerCase() == q[number].a.toLowerCase()) {
        this.isCorrect = true
        let cnum = parseInt(localStorage.getItem('Correct_num5'))
        cnum += 1
        localStorage.setItem('Correct_num5', cnum.toString())
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
    }
  }
}
</script>

<style scoped>
.darkGray {
  color: #999;
}

.lightGray {
  color: #777;
}

.darkBack {
  background-color: #222;
}

.dark {
  background-color: #333;
  color: #CCC;
}

.darkNoBack {
  color: #CCC;
}

.darkBorder {
  border: 1px groove #444;
}

.lightBorder {
  border: 1px groove #DDD;
}

.light {
  background-color: #EEE;
  color: #222;
}

.lightNoBack {
  color: #222;
}

.lightBack {
  background-color: #DDD;
}
</style>