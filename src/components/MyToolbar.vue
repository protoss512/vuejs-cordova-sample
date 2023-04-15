<template>
  <div>
    <v-navigation-drawer style="background-color: #333;" v-model="drawer" app floating>
      <v-toolbar style="background-color: #333;color:#CCC">{{ $t("app_name") }}</v-toolbar>
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-divider v-if="item.divider" :key="i"></v-divider>
          <v-list-item :to="item.action" :key="i" v-else @click="onSel(item.text)">
            <v-list-item-action>
              <v-icon style="color:#CCC">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="color:#CCC;margin-left: 10px;">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <hr style="margin: 0;padding: 0;border: 1px groove #444;">
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left style="background-color: #333;">
      <div v-if="icon == 'mdi-menu'">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color:#CCC"><v-app-bar-nav-icon icon>
            <v-icon style="color: #CCC;">{{ icon }}</v-icon>
          </v-app-bar-nav-icon></v-app-bar-nav-icon>
      </div>
      <div v-else>
        <v-app-bar-nav-icon @click="goHome" style="color:#CCC"><v-app-bar-nav-icon icon>
            <v-icon style="color: #CCC;">{{ icon }}</v-icon>
          </v-app-bar-nav-icon></v-app-bar-nav-icon>
      </div>
      <v-toolbar-title style="color:#CCC;margin-left: 10px;">{{ title }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
//mdi-keyboard-backspace
//mdi-menu
import i18n from '../i18n';
export default {
  name: "myToolbar",
  components: {},
  props: [
    'title2'
  ],
  data: function () {
    return {
      drawer: false,
      title: i18n.t("home"),
      icon: 'mdi-menu',
      items: [
        { icon: 'home', text: i18n.t("home") },
        { icon: 'search', text: i18n.t("to_Ke_Leak") },
        { icon: 'vibration', text: i18n.t("to_read") },
      ]
    }
  },
  watch: {
    title2() {
      console.log(this.title2)
      if (this.title2 != i18n.t("home")) {
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
    // Listen for event openDrawer (triggered by other component, like the button in the home)
    document.addEventListener("toggleDrawer", this.toggleDrawer);
  },
  beforeDestroy: function () {
    // If the component is unmount, unlisten the event.
    document.removeEventListener("toggleDrawer", this.toggleDrawer);
  },
  updated() {

  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    goHome() {
      this.title = i18n.t("home")
      this.icon = 'mdi-menu'
      window.location.hash = '/'
    },
    onSel(text) {
      this.title = text
      switch (text) {
        case i18n.t("home"):
          window.location.hash = '/'
          this.icon = 'mdi-menu'
          break
        case i18n.t("to_Ke_Leak"):
          window.location.hash = '/Highschool_ke_leak'
          this.icon = 'mdi-keyboard-backspace'
          break
        case i18n.t("to_read"):
          window.location.hash = '/ReadTest'
          this.icon = 'mdi-keyboard-backspace'
          break
      }
    }
  }
}
</script>

<style scoped></style>