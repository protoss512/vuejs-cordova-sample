<template>
  <div style="margin: 10px;border-radius: 8px;">
    <div class="demo-card-square mdl-card" style="background-color: #333;width: 100%;font-size: 22px;">
      <div style="display: flex;justify-content: flex-start;align-items: center;margin: 10px;color:#CCC">
        <div style="margin-right: 10px;">{{ $t("font_rate") + ' : ' }}</div>
        <select @change="onChange($event)"
          style="color: #ccc;padding: 5px;border: 1px groove #666;display: inline;text-align: right;" v-model="font_size">
          <option selected style="background-color: #222;">{{ $t("small") }}</option>
          <option style="background-color: #222;">{{ $t("middle") }}</option>
          <option style="background-color: #222;">{{ $t("large") }}</option>
        </select>
      </div>
      <hr style="margin: 0;padding: 0;border: 1px groove #444;">
      <div style="display: flex;justify-content: flex-start;align-items: center;color:#CCC;margin: 10px;">
        <div style="margin-right: 10px;">{{ $t("speech_rate") + ' : ' }}</div>
        <select @change="onChangeSpeech($event)" style="color: #ccc;padding: 5px;border: 1px groove #666;"
          v-model="speech_rate">
          <option selected style="background-color: #222;">{{ $t("low") }}</option>
          <option style="background-color: #222;">{{ $t("normal") }}</option>
          <option style="background-color: #222;">{{ $t("high") }}</option>
        </select>
      </div>
      <hr style="margin: 0;padding: 0;border: 1px groove #444;">
    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
export default {
  name: 'Vocabulary',
  data: () => {
    return {
      font_size: '',
      speech_rate: ''
    }
  },
  mounted() {
    this.$emit('title', i18n.t("setting"));
    let f = localStorage.getItem('Font_size')
    if (f == i18n.t("small")) {
      this.font_size = i18n.t("small")
    } else if (f == i18n.t("middle")) {
      this.font_size = i18n.t("middle")
    } else if (f == i18n.t("large")) {
      this.font_size = i18n.t("large")
    }
    this.speech_rate = localStorage.getItem('Speech_rate')
  },
  methods: {
    goHome() {
      window.location.hash = '/Main'
    },
    onChange(event) {
      let f = event.target.value
      if (f == i18n.t("small")) {
        this.font_size = i18n.t("small")
        localStorage.setItem('Font_size', i18n.t("small"))
      } else if (f == i18n.t("middle")) {
        this.font_size = i18n.t("middle")
        localStorage.setItem('Font_size', i18n.t("middle"))
      } else if (f == i18n.t("large")) {
        this.font_size = i18n.t("large")
        localStorage.setItem('Font_size', i18n.t("large"))
      }
    }, onChangeSpeech(event) {
      let f = event.target.value
      console.log(f)
      localStorage.setItem('Speech_rate', f)
    },
  }
}

</script>