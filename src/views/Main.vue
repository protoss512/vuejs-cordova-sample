<template>
  <!--div
    style="display: flex;flex-direction:column;height: 100vh;width: 100vw;margin: 0;padding: 0;justify-content: center;align-items: center;">
    <div style="flex:1"></div>
    <div style="flex:1;">
      <div
        style="background-color: #252525;border-radius: 15px;height: 60px;width: 300px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
        @click="to_Highschool_ke_leak">
        <div>{{ $t("to_Ke_Leak") }}</div>
      </div>
    </div>

    <div style="flex:1;">
      <div
        style="background-color: #252525;border-radius: 15px;height: 60px;width: 300px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
        @click="to_read">
        <div>{{ $t("to_read") }}</div>
      </div>
    </div>
    <div style="flex:1;">
      <div
        style="background-color: #252525;border-radius: 15px;height: 60px;width: 300px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
        @click="to_vocabulary">
        <div>{{ $t("vocabulary") }}</div>
      </div>
    </div>
    <div style="flex:1;">
      <div
        style="background-color: #252525;border-radius: 15px;height: 60px;width: 300px;border: 1px groove #777;display: flex;justify-content: center;align-items: center;color: #ccc;"
        @click="to_setting">
        <div>{{ $t("setting") }}</div>
      </div>
    </div>
    <div style="flex:1">
    </div>
  </div-->
  <!-- Always shows a header, even in smaller screens. -->



  <div style="display:flex;flex-direction:column;height: 100vh;">
    <div style="overflow-y: auto;margin: 10px;">
      <div class="demo-card-square mdl-card"
        style="background-color: #333;width: 100%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text" style="color: #CCC;">Update</h2>
        </div>
        <div class="mdl-card__supporting-text" style="color: #AAA;background-color: #333;width: 100%;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenan convallis.
        </div>
        <hr style="margin: 0;padding: 0;border: 1px groove #444;">
        <div class="mdl-card__actions mdl-card--border" style="background-color: #333;">
          <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="to_Highschool_ke_leak"
            style="color:dodgerblue;font-weight: bold;">
            View Updates
          </div>
        </div>
      </div>

      <div class="demo-card-square mdl-card"
        style="background-color: #333;width: 100%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text" style="color: #CCC;">Update</h2>
        </div>
        <div class="mdl-card__supporting-text" style="color: #AAA;background-color: #333;width: 100%;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenan convallis.
        </div>
        <hr style="margin: 0;padding: 0;border: 1px groove #444;">
        <div class="mdl-card__actions mdl-card--border" style="background-color: #333;">
          <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="to_Highschool_ke_leak"
            style="color:dodgerblue;font-weight: bold;">
            View Updates
          </div>
        </div>
      </div>

      <div class="demo-card-square mdl-card"
        style="background-color: #333;width: 100%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text" style="color: #CCC;">Update</h2>
        </div>
        <div class="mdl-card__supporting-text" style="color: #AAA;background-color: #333;width: 100%;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenan convallis.
        </div>
        <hr style="margin: 0;padding: 0;border: 1px groove #444;">
        <div class="mdl-card__actions mdl-card--border" style="background-color: #333;">
          <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="to_Highschool_ke_leak"
            style="color:dodgerblue;font-weight: bold;">
            View Updates
          </div>
        </div>
      </div>

      <div class="demo-card-square mdl-card"
        style="background-color: #333;width: 100%;margin-bottom: 10px;border-radius: 8px;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text" style="color: #CCC;">Update</h2>
        </div>
        <div class="mdl-card__supporting-text" style="color: #AAA;background-color: #333;width: 100%;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenan convallis.
        </div>
        <hr style="margin: 0;padding: 0;border: 1px groove #444;">
        <div class="mdl-card__actions mdl-card--border" style="background-color: #333;">
          <div class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="to_Highschool_ke_leak"
            style="color:dodgerblue;font-weight: bold;">
            View Updates
          </div>
        </div>
      </div>

      <div style="height: 60px;"></div>
    </div>

  </div>
</template>

<script>
import i18n from '../i18n';
export default {
  name: 'Main',
  mounted() {

  },
  methods: {
    to_Highschool_ke_leak() {
      this.$emit('title', i18n.t("to_Ke_Leak"));
      window.location.hash = '/Highschool_ke_leak';
    },
    to_vocabulary: () => {
      window.location.hash = '/Vocabulary';
    },
    to_read: () => {
      window.location.hash = '/ReadTest';
    },
    to_setting: () => {
      window.location.hash = '/Setting';
    }
  }
}
</script>

<style scoped>
.demo-layout-waterfall .mdl-layout__header-row .mdl-navigation__link:last-of-type {
  padding-right: 0;
}

.demo-card-square.mdl-card {
  height: 320px;
}

.demo-card-square>.mdl-card__title {
  color: #fff;
  background-size: contain;
  /* <------ */
  background-repeat: no-repeat;
  background-position: center center;
  background:
    url('../assets/toeic.jpg') bottom right 15% no-repeat #46B6AC;
}
</style>
