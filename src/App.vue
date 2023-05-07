<template>
  <v-main
    style="height: 100vh;width: 100vw;margin: 0;padding: 0;max-width: 100%;overflow-x: hidden;overflow-y: hidden;background-color: #222;">
    <myToolbar :title2="title" />
    <router-view style="overflow-y: auto;" @title="getTitle"></router-view>
  </v-main>
</template>
<script>
import i18n from './i18n';
import myToolbar from "@/components/MyToolbar"

export default {
  name: 'app',
  components: { myToolbar },
  data() {
    return {
      title: i18n.t("home"),
    }
  },
  beforeDestroy() {

  },
  beforeCreate() {

  },
  mounted() {
    if (localStorage.getItem('Use_time') == null) localStorage.setItem('Use_time', '1')

    setInterval(() => {
      let f = localStorage.getItem('Use_time')
      f = parseInt(f)
      f += 1
      localStorage.setItem('Use_time', f.toString())
    }, 60000)

    if (localStorage.getItem('language') == null) {
      localStorage.setItem('language', 'zh')
    }
    i18n.locale = localStorage.getItem('language')
    if (localStorage.getItem('language2') == null) {
      localStorage.setItem('language2', '繁體中文 ( zh )')
    }

    let f = localStorage.getItem('Font_size1')
    if (f == null) {
      localStorage.setItem('Font_size1', 0)
    }

    let s = localStorage.getItem('Speech_rate1')
    if (s == null) {
      localStorage.setItem('Speech_rate1', '0')
    }

    let d = localStorage.getItem('Dark_mode')
    if (d == null) {
      localStorage.setItem('Dark_mode', '0')
    }

    if (localStorage.getItem('Total_num5') == null) localStorage.setItem('Total_num5', '0')
    if (localStorage.getItem('Correct_num5') == null) localStorage.setItem('Correct_num5', '0')
    if (localStorage.getItem('Total_num6') == null) localStorage.setItem('Total_num6', '0')
    if (localStorage.getItem('Correct_num6') == null) localStorage.setItem('Correct_num6', '0')
    if (localStorage.getItem('Total_num7') == null) localStorage.setItem('Total_num7', '0')
    if (localStorage.getItem('Correct_num7') == null) localStorage.setItem('Correct_num7', '0')
  },
  updated() {
  },
  methods: {
    getTitle(text) {
      this.title = text
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