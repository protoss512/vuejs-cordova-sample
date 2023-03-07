<template>
  <div
    style="display: flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;justify-content: center;align-items: center;">
    <div style="flex:1"></div>
    <div style="flex:1;"><v-btn @click="to_Highschool_ke_leak">
        {{ $t("to_Ke_Leak") }}
      </v-btn></div>
    <div style="flex:1;"><v-btn @click="to_vocabulary">
        {{ $t("vocabulary") }}
      </v-btn></div>
    <div style="flex:1"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    to_Highschool_ke_leak: () => {
      window.location.hash = '/Highschool_ke_leak';
    },
    to_vocabulary: () => {
      window.location.hash = '/Vocabulary';
    }
  }
}
</script>

<style scoped></style>
