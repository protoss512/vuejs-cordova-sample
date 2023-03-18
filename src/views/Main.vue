<template>
  <div
    style="display: flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;justify-content: center;align-items: center;">
    <div style="flex:1"></div>
    <div style="flex:1;">
      <div
        style="background-color: #252525 !important;border-radius: 15px;height: 60px;width: 300px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
        @click="to_Highschool_ke_leak">
        <div>{{ $t("to_Ke_Leak") }}</div>
      </div>
    </div>

    <div style="flex:1;">
      <div
        style="background-color: #252525 !important;border-radius: 15px;height: 60px;width: 300px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
        @click="to_read">
        <div>{{ $t("to_read") }}</div>
      </div>
    </div>
    <div style="flex:1;">
      <div
        style="background-color: #252525 !important;border-radius: 15px;height: 60px;width: 300px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
        @click="to_vocabulary">
        <div>{{ $t("vocabulary") }}</div>
      </div>
    </div>
    <div style="flex:1"></div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    to_Highschool_ke_leak: () => {
      window.location.hash = '/Highschool_ke_leak';
    },
    to_vocabulary: () => {
      window.location.hash = '/Vocabulary';
    },
    to_read: () => {
      window.location.hash = '/ReadTest';
    }
  }
}
</script>

<style scoped></style>
