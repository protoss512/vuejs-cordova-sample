<template>
  <v-app toolbar style="background-color: #222;color: #eee;">
    <!--myToolbar /-->
    <v-content>
      <v-slide-y-transition mode="out-in">
        <v-container pa-0 fluid fill-height align-content-center align-center>
          <router-view></router-view>
        </v-container>
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
}
</script>