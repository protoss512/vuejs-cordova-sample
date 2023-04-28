<template>
  <div style="height: 100%;" :class="dark_mode ? 'darkBack' : 'lightBack'">
    <div style="display:flex;flex-direction:column;overflow-y: auto;margin: 10px 10px 0px 10px;">

      <div class="demo-card-square mdl-card"
        style="width:99%;border-radius: 8px;box-shadow: 1px 0 6px 0 rgba(0, 0, 0, 0.3);font-size: 22px;"
        :class="dark_mode ? 'darkBorder1' : 'lightBorder1'">
        <div style="display: flex;justify-content: flex-start;align-items: center;margin: 10px;">
          <div style="margin-right: 10px;">{{ $t("font_rate") + ' : ' }}</div>
          <div style="flex:1"></div>
          <select @change="onChange($event)"
            style="padding: 5px;border: 1px groove #666;display: inline;text-align: right;" v-model="font_size" :class="dark_mode ? 'dark' : 'light'">
            <option selected>{{ $t("small") }}</option>
            <option>{{ $t("middle") }}</option>
            <option>{{ $t("large") }}</option>
          </select>
        </div>
        <hr style="padding: 0;margin: 0;" :class="dark_mode ? 'darkBorder' : 'lightBorder'">
        <div style="display: flex;justify-content: flex-start;align-items: center;margin: 10px;">
          <div style="margin-right: 10px;">{{ $t("speech_rate") + ' : ' }}</div>
          <div style="flex:1"></div>
          <select @change="onChangeSpeech($event)" style="padding: 5px;border: 1px groove #666;" v-model="speech_rate" :class="dark_mode ? 'dark' : 'light'">
            <option selected>{{ $t("low") }}</option>
            <option>{{ $t("normal") }}</option>
            <option>{{ $t("high") }}</option>
          </select>
        </div>
        <hr style="padding: 0;margin: 0;" :class="dark_mode ? 'darkBorder' : 'lightBorder'">
        <div style="display: flex;align-items: center;margin: 10px;">
          <div style="margin-right: 10px;">{{ $t("dark_switch") + ' : ' }}</div>
          <div style="flex:5"></div>
          <div style="flex:1;">
            <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="dark_mode" style="display: inline-block;">
              <input v-model="dark_mode" @change="onChangeDark($event)" type="checkbox" id="dark_mode"
                class="mdl-switch__input">
              <span class="mdl-switch__label"></span>
            </label>
          </div>
        </div>
        <hr style="padding: 0;margin: 0;" :class="dark_mode ? 'darkBorder' : 'lightBorder'">
      </div>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
export default {
  name: 'Vocabulary',
  data: () => {
    return {
      font_size: '',
      speech_rate: '',
      dark_mode: localStorage.getItem('Dark_mode') == '1' ? true : false
    }
  },
  mounted() {
    this.$emit('title', i18n.t("setting"));

    componentHandler.upgradeAllRegistered()
    let f = localStorage.getItem('Font_size')
    if (f == i18n.t("small")) {
      this.font_size = i18n.t("small")
    } else if (f == i18n.t("middle")) {
      this.font_size = i18n.t("middle")
    } else if (f == i18n.t("large")) {
      this.font_size = i18n.t("large")
    }
    this.speech_rate = localStorage.getItem('Speech_rate')
  },
  methods: {
    onChange(event) {
      let f = event.target.value
      if (f == i18n.t("small")) {
        this.font_size = i18n.t("small")
        localStorage.setItem('Font_size', i18n.t("small"))
      } else if (f == i18n.t("middle")) {
        this.font_size = i18n.t("middle")
        localStorage.setItem('Font_size', i18n.t("middle"))
      } else if (f == i18n.t("large")) {
        this.font_size = i18n.t("large")
        localStorage.setItem('Font_size', i18n.t("large"))
      }
    }, onChangeSpeech(event) {
      let f = event.target.value
      console.log(f)
      localStorage.setItem('Speech_rate', f)
    }, onChangeDark(event) {
      if (this.dark_mode) localStorage.setItem('Dark_mode', '1')
      else localStorage.setItem('Dark_mode', '0')
    },
  }
}

</script>

<style scoped>
.darkGray {
  color: #999;
}

.lightGray {
  color: #777;
}

.darkBack {
  background-color: #222;
}

.dark {
  background-color: #333;
  color: #CCC;
}

.darkNoBack {
  color: #CCC;
}

.darkBorder {
  border: 1px groove #444;
}

.lightBorder {
  border: 1px groove #DDD;
}

.lightBorder1 {
  border: 1px groove #DDD;
  background-color: #EEE;
  color: #222;
}

.darkBorder1 {
  border: 1px groove #444;
  background-color: #333;
  color: #CCC;
}

.light {
  background-color: #EEE;
  color: #222;
}

.lightBack {
  background-color: #DDD;
}

.lightNoBack {
  color: #222;
}
</style>