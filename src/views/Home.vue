<template>
  <div
    style="display: flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;justify-content: center;align-items: center;">
    <div style="flex:1"></div>
    <div style="flex:1">
      <div style="margin-right: 50px;font-size: 50px;font-weight: bold;color:aqua">{{ $t("english") }}</div>
      <div style="margin-left: 50px;;font-size: 50px;font-weight: bold;color: orange;">{{ $t("explation") }}</div>
    </div>
    <div style="flex:1"></div>
    <div
      style="flex:2;display: flex;justify-content: flex-start;align-items: center;flex-direction:column;font-size: 25px;font-weight: bold;">
      <div style="color:yellow">{{ $t("easy") }}</div>
      <div style="color:chartreuse;">{{ $t("useful") }}</div>
      <div style="color:deeppink;">{{ $t("feel") }}</div>
    </div>
    <div style="flex:1;">
      <button style="width: 200px;height: 40px;" @click="to_main"
        class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
        {{ $t("start") }}
      </button>
      <!--div
        style="background-color:lightskyblue;border-radius: 15px;height: 60px;width: 300px;display: flex;justify-content: center;align-items: center;"
        @click="to_main" >
        <div style="color: #222;font-size: 25px;font-weight: bold;">{{ $t("start") }}</div>
      </div-->
    </div>
    <div style="flex:1"></div>
  </div>
</template>

<script>
import i18n from '../i18n';
export default {
  name: 'home',
  data: () => {
    return {
      v: '',
    }
  },
  mounted() {
    
  },
  methods: {
    to_main: () => {
      window.location.hash = '/Main';
    },
  }

}
</script>

<style scoped></style>
