<template>
  <v-container text-center>
    <div class="home">
      <v-btn @click="openMenu" class="mt-10">
        <div>{{$t("to_Ke_Leak")}}</div>
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
      window.location.hash = '/Highschool_ke_leak';
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
