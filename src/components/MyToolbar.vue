<template>
  <div>
    <v-navigation-drawer v-model="drawer" app floating :class="isDark ? 'dark' : 'light'">
      <div :class="isDark ? 'dark' : 'light'"
        style="font-size: 22px;font-weight: bold;height: 50px;text-align: center;line-height: 50px;">Toeic+</div>
      <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
      <v-list dense>
        <template v-for="(  item, i  ) in   items  ">
          <v-divider v-if="item.divider" :key="i"></v-divider>
          <v-list-item :to="item.action" :key="i" v-else @click="onSel(item.text)">
            <v-list-item-action>
              <v-icon :class="isDark ? 'dark' : 'light'">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :class="isDark ? 'dark' : 'light'"
                style="margin-left: 10px;font-size: 22px;padding: 5px;">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
        </template>
      </v-list>
      <div style="display: flex;margin: 10px 20px 10px 20px;">
        <div :class="isDark ? 'darkGray' : 'lightGray'">{{ $t("version") }}</div>
        <div style="flex:1"></div>
        <div :class="isDark ? 'darkGray' : 'lightGray'">{{ version }}</div>
      </div>
      <hr style="padding: 0;margin: 0;" :class="isDark ? 'darkBorder' : 'lightBorder'">
    </v-navigation-drawer>

    <v-app-bar clipped-left :style="{ background: backColor }">
      <div v-if="icon == 'mdi-menu'">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color:#EEE"><v-app-bar-nav-icon icon>
            <v-icon style="color: #EEE;">{{ icon }}</v-icon>
          </v-app-bar-nav-icon></v-app-bar-nav-icon>
      </div>
      <div v-else>
        <v-app-bar-nav-icon @click="goHome" style="color:#EEE"><v-app-bar-nav-icon icon>
            <v-icon style="color: #EEE;">{{ icon }}</v-icon>
          </v-app-bar-nav-icon></v-app-bar-nav-icon>
      </div>
      <v-toolbar-title style="color:#EEE;margin-left: 10px;font-size: 22px;">{{ title }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import i18n from '../i18n';
export default {
  name: "myToolbar",
  components: {},
  props: [
    'title2'
  ],
  data: function () {
    return {
      version: '1.2.0',
      isDark: localStorage.getItem('Dark_mode') == '1' ? true : false,
      drawer: false,
      backColor: localStorage.getItem('Dark_mode') == '1' ? '#333' : '#333',
      title: i18n.t("home"),
      icon: 'mdi-menu',
    }
  },
  computed: {
    items() {
      return [
        { icon: 'home', text: i18n.t("home") },
        { icon: 'mdi-code-brackets', text: i18n.t("to_Ke_Leak") },
        { icon: 'mdi-relative-scale', text: i18n.t("sctor_space") },
        { icon: 'mdi-newspaper', text: i18n.t("to_read") },
        { icon: 'mdi-settings', text: i18n.t("setting") },
        { icon: 'mdi-contacts', text: i18n.t("contact") },
        { icon: 'mdi-google-analytics', text: i18n.t("statistics") },
        //{ icon: 'mdi-star', text: i18n.t("star") }
      ]
    },
  },
  watch: {
    title2() {
      if (this.title2 == 'exit') {
        this.title = i18n.t("home")
        this.icon = 'mdi-menu'
      }
      else if (this.title2 != i18n.t("home")) {
        this.title = this.title2
        this.icon = 'mdi-keyboard-backspace'
      }
      else {
        this.title = i18n.t("home")
        this.icon = 'mdi-menu'
      }
    }
  },
  mounted: function () {
    document.addEventListener("toggleDrawer", this.toggleDrawer);
    i18n.locale = localStorage.getItem('language')
    this.title = i18n.t("home")
  },
  beforeDestroy: function () {
    document.removeEventListener("toggleDrawer", this.toggleDrawer);
  },
  updated() {

  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    goHome() {
      if (this.title == i18n.t("setting")) {
        window.location = '/'
      }
      else {
        this.title = i18n.t("home")
        this.icon = 'mdi-menu'
        window.location.hash = '/'
      }
    },
    onSel(text) {
      console.log(text)
      switch (text) {
        case i18n.t("home"):
          window.location.hash = '/'
          this.icon = 'mdi-menu'
          this.title = text
          this.drawer = !this.drawer;
          break
        case i18n.t("to_Ke_Leak"):
          window.location.hash = '/Highschool_ke_leak'
          this.icon = 'mdi-keyboard-backspace'
          this.title = text
          break
        case i18n.t("sctor_space"):
          window.location.hash = '/SctorSpace'
          this.icon = 'mdi-keyboard-backspace'
          this.title = text
          break
        case i18n.t("to_read"):
          window.location.hash = '/ReadTest'
          this.icon = 'mdi-keyboard-backspace'
          this.title = text
          break
        case i18n.t("setting"):
          window.location.hash = '/Setting'
          this.icon = 'mdi-keyboard-backspace'
          this.title = text
          break
        case i18n.t("contact"):
          window.open('https://forms.gle/ujaeV2Cgv7CvJ5Av8');
          this.drawer = !this.drawer;
          break
        case i18n.t("statistics"):
          window.location.hash = '/Statistics'
          this.icon = 'mdi-keyboard-backspace'
          this.title = text
          break
        case i18n.t("star"):
          window.open('market://details?id=com.tony.english_app', '_system');
          //window.open('market://details?id=com.google.android.apps.translate', '_system');
          this.drawer = !this.drawer;
          break
      }
    }
  }
}
</script>

<style scoped>
.darkBorder {
  border: 1px groove #444;
}

.lightBorder {
  border: 1px groove #CCC;
}

.dark {
  background-color: #333;
  color: #CCC;
}

.light {
  background-color: #EEE;
  color: #222;
}

.lightTop {
  background-color: rgba(64, 64, 255, 1);
  color: #CCC;
}

.darkGray {
  color: #999;
}

.lightGray {
  color: #777;
}
</style>