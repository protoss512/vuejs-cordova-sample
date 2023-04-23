<template>
  <div style="height: 100vh;" :class="isDark ? 'darkBack' : 'light'">
    <div style="display:flex;flex-direction:column;overflow-y: auto;margin: 10px;">

      <div class="demo-card-square mdl-card"
        style="width: 99%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 0 6px 0 rgba(0, 0, 0, 0.3);"
        :class="isDark ? 'darkBorder' : 'lightBorder'">
        <div class="mdl-card__title mdl-card--expand img1">
          <h2 class="mdl-card__title-text" style="color: #DDD;font-weight: bold;">{{ $t("to_Ke_Leak") }}</h2>
        </div>
        <div :class="isDark ? 'dark' : 'light'" class="mdl-card__supporting-text" style="width: 100%;">
          {{ $t("to_Ke_Leak_exp") }}
        </div>
        <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
        <div class="mdl-card__actions" :class="isDark ? 'dark' : 'light'">
          <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="to_Highschool_ke_leak"
            style="color:dodgerblue;font-size: 18px;">
            {{ $t("start_study") }}
          </div>
        </div>
      </div>
      <div class="demo-card-square mdl-card"
        style="width: 99%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 0 6px 0 rgba(0, 0, 0, 0.3);"
        :class="isDark ? 'darkBorder' : 'lightBorder'">
        <div class="mdl-card__title mdl-card--expand img3">
          <h2 class="mdl-card__title-text" style="color: #DDD;font-weight: bold;">{{ $t("sctor_space") }}</h2>
        </div>
        <div :class="isDark ? 'dark' : 'light'" class="mdl-card__supporting-text" style="width: 100%;">
          {{ $t("sctor_space_exp") }}
        </div>
        <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
        <div class="mdl-card__actions" :class="isDark ? 'dark' : 'light'">
          <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="to_SctorSpace"
            style="color:dodgerblue;font-size: 18px;">
            {{ $t("start_study") }}
          </div>
        </div>
      </div>

      <div class="demo-card-square mdl-card"
        style="width: 99%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 0 6px 0 rgba(0, 0, 0, 0.3);"
        :class="isDark ? 'darkBorder' : 'lightBorder'">
        <div class="mdl-card__title mdl-card--expand img2">
          <h2 class="mdl-card__title-text" style="color: #DDD;font-weight: bold;">{{ $t("to_read") }}</h2>
        </div>
        <div :class="isDark ? 'dark' : 'light'" class="mdl-card__supporting-text" style="width: 100%;">
          {{ $t("to_read_exp") }}
        </div>
        <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
        <div class="mdl-card__actions" :class="isDark ? 'dark' : 'light'">
          <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="to_read"
            style="color:dodgerblue;font-size: 18px;">
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
  components: {},
  data: function () {
    return {
      isDark: localStorage.getItem('Dark_mode') == '1' ? true : false,
      backColor: localStorage.getItem('Dark_mode') == '1' ? '#333' : '#33A',
    }
  },
  mounted() {

  },
  methods: {
    to_Highschool_ke_leak() {
      window.location.hash = '/Highschool_ke_leak';
    },
    to_vocabulary() {
      window.location.hash = '/Vocabulary';
    },
    to_read() {
      window.location.hash = '/ReadTest';
    },
    to_setting() {
      window.location.hash = '/Setting';
    },
    to_SctorSpace() {
      window.location.hash = '/SctorSpace';
    }
  }
}
</script>

<style scoped>
.dark {
  background-color: #333;
  color: #CCC;
}

.light {
  background-color: #EEE;
  color: #222;
}

.darkBack {
  background-color: #222;
}

.darkBorder {
  border: 1px groove #404040;
  background-color: #404040;
}

.lightBorder {
  border: 1px groove #CCC;
  background-color: #CCC;
}

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

.demo-card-square>.img3 {
  background:
    url('../assets/toeic3.jpg') bottom right 15% no-repeat;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
