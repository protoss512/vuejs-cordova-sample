<template>
  <div>
    <v-navigation-drawer v-model="drawer" app floating>
      <myContentDrawer />
    </v-navigation-drawer>

    <v-app-bar clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">{{ $t("title") }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import myContentDrawer from "@/components/Drawer"

export default {
  name: "myToolbar",
  components: { myContentDrawer },
  data: function () {
    return {
      drawer: false
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
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}
</script>
