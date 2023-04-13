<template>
  <v-content>
    <myToolbar />
    <router-view></router-view>
  </v-content>
</template>
<script>
import i18n from './i18n';
import myToolbar from "@/components/MyToolbar"
export default {
  name: 'app',
  components: { myToolbar },
  data() {
    return {
      title: 'Home',
    }
  },
  beforeCreate() {

  },
  mounted() {
    i18n.locale = 'zh'
    let f = localStorage.getItem('Font_size')
    if (f == null) {
      localStorage.setItem('Font_size', i18n.t("small"))
    }

    let s = localStorage.getItem('Speech_rate')
    if (s == null) {
      localStorage.setItem('Speech_rate', i18n.t("low"))
    }
  },
  updated() {

  },
  methods: {
    goHome() {
      window.location.hash = '/Highschool_ke_leak'
    },
    openMenu() {
      console.log('open')
    }
  }
}
</script>



<style scoped>
body {
  display: flex;
  height: 100vh;
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
  position: relative;
}

.main-content {
  overflow: auto;
  height: 100%;
}

.app-bar {
  position: absolute;
}

.mdc-top-app-bar {
  z-index: 7;
}
</style>