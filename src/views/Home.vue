<template>
  <v-container text-center>
    <div class="home">
      
      <img class="logo" src="cordova_256.png" />
      <h4>{{$t("title")}}</h4>
      <v-btn @click="openMenu" class="mt-10">
        <img class="logo" src="vuejs.png" />
        <div style="color: #222;">{{$t("drawer.home")}}</div>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  methods: {
    openMenu: () => {
      // When user tap the button dispatch an event into the dom.
      // Its will trigger the drawer Open event in (componnents/Drawer.vue)
      //document.dispatchEvent(new CustomEvent("toggleDrawer", {}));
      console.log('push')
      window.location.hash = '/vibration';
    }
  }
}
</script>

<style scoped>
  img.logo{
    display: inline-block;
    width: 90px;
    padding: 20px;
  }
</style>
