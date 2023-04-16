<template>
  <div style="display:flex;flex-direction:column;height: 100vh;">
    <div style="overflow-y: auto;margin: 10px;">

      <div class="demo-card-square mdl-card"
        style="background-color: #333;width: 99%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);">
        <div class="mdl-card__title mdl-card--expand img1">
          <h2 class="mdl-card__title-text" style="color: #DDD;">{{ $t("to_Ke_Leak") }}</h2>
        </div>
        <div class="mdl-card__supporting-text" style="color: #AAA;background-color: #333;width: 100%;">
          閱讀各種文本並回答幾種不同類型的閱讀理解問題，並且在四個選項中，選出正確答案。
        </div>
        <hr style="margin: 0;padding: 0;border: 1px groove #444;">
        <div class="mdl-card__actions mdl-card--border" style="background-color: #333;">
          <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="to_Highschool_ke_leak"
            style="color:dodgerblue;font-weight: bold;">
            {{ $t("start_study") }}
          </div>
        </div>
      </div>

      <div class="demo-card-square mdl-card"
        style="background-color: #333;width: 99%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);">
        <div class="mdl-card__title mdl-card--expand img2">
          <h2 class="mdl-card__title-text" style="color: #DDD;">{{ $t("to_read") }}</h2>
        </div>
        <div class="mdl-card__supporting-text" style="color: #AAA;background-color: #333;width: 100%;">
          閱讀精選的文本，例如雜誌和報紙文章、電子郵件和即時消息。 每篇課文或每組課文後面都有幾個問題。 為每個問題選擇最佳答案。
        </div>
        <hr style="margin: 0;padding: 0;border: 1px groove #444;">
        <div class="mdl-card__actions mdl-card--border" style="background-color: #333;">
          <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="to_read"
            style="color:dodgerblue;font-weight: bold;">
            {{ $t("start_study") }}
          </div>
        </div>
      </div>

      <div style="height: 60px;"></div>
    </div>

  </div>
</template>

<script>
import i18n from '../i18n';
export default {
  name: 'Main',
  mounted() {

  },
  methods: {
    to_Highschool_ke_leak() {
      this.$emit('title', i18n.t("to_Ke_Leak"));
      window.location.hash = '/Highschool_ke_leak';
    },
    to_vocabulary() {
      window.location.hash = '/Vocabulary';
    },
    to_read() {
      this.$emit('title', i18n.t("to_read"));
      window.location.hash = '/ReadTest';
    },
    to_setting() {
      window.location.hash = '/Setting';
    }
  }
}
</script>

<style scoped>
.demo-layout-waterfall .mdl-layout__header-row .mdl-navigation__link:last-of-type {
  padding-right: 0;
}

.demo-card-square.mdl-card {
  height: 320px;
}

.demo-card-square>.img1 {
  background:
    url('../assets/toeic.jpg') bottom right 15% no-repeat;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.demo-card-square>.img2 {
  background:
    url('../assets/toeic2.jpg') bottom right 15% no-repeat;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
