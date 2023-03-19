<template>
  <div style="display:flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;">
    <div style="flex:1;background-color: #222;margin: 10px;display:flex;">
      <div style="flex:1;display: flex;justify-content: flex-start;align-items: center;"><img
          style="background-color: #222;" src="../assets/arrow_back.svg" @click="goHome"></div>
      <div style="flex:1;display: flex;justify-content: center;align-items: center;color: #ccc;">{{
        $t("setting") }}</div>
      <div style="flex:1;display: flex;justify-content: flex-end;align-items: center;"></div>
    </div>
    <hr style="border: 1px groove #666;margin-left: 10px;margin-right: 10px;">
    <div
      style="flex:90;margin: 10px;padding-top: 10px;display: flex;flex-direction:column;justify-content: center;align-items: center;">
      <div style="flex:1;display: flex;justify-content: center;align-items: center;">
        <div style="margin-right: 10px;">{{ $t("font_rate") + ' : ' }}</div>
        <select @change="onChange($event)"
          style="color: #ccc;padding-left: 10px;padding-right: 10px;border: 1px groove #666;" v-model="font_size"
          :style="mystyle">
          <option selected style="background-color: #222;">{{ $t("small") }}</option>
          <option style="background-color: #222;">{{ $t("middle") }}</option>
          <option style="background-color: #222;">{{ $t("large") }}</option>
        </select>
      </div>
      <div style="flex:1"></div>
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
      mystyle: ''
    }
  },
  mounted() {
    let f = localStorage.getItem('Font_size')
    if (f == i18n.t("small")) {
      this.mystyle = "font-size: 100%;"
      this.font_size = i18n.t("small")
    } else if (f == i18n.t("middle")) {
      this.mystyle = "font-size: 125%;"
      this.font_size = i18n.t("middle")
    } else if (f == i18n.t("large")) {
      this.mystyle = "font-size: 150%;"
      this.font_size = i18n.t("large")
    }
  },
  methods: {
    goHome() {
      window.location.hash = '/Main'
    },
    onChange(event) {
      let f = event.target.value
      if (f == i18n.t("small")) {
        this.mystyle = "font-size: 100%;"
        this.font_size = i18n.t("small")
        localStorage.setItem('Font_size', i18n.t("small"))
      } else if (f == i18n.t("middle")) {
        this.mystyle = "font-size: 125%;"
        this.font_size = i18n.t("middle")
        localStorage.setItem('Font_size', i18n.t("middle"))
      } else if (f == i18n.t("large")) {
        this.mystyle = "font-size: 150%;"
        this.font_size = i18n.t("large")
        localStorage.setItem('Font_size', i18n.t("large"))
      }
      console.log(this.mystyle, this.font_size)
    }
  }
}

</script>