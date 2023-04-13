<template>
  <div>
    <v-toolbar class="indigo" />
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-divider dark v-if="item.divider" :key="i"></v-divider>
        <v-list-item :to="item.action" :key="i" v-else>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>


<script>
export default {
  name: "drawer",
  data: function () {
    return {
      items: [
        { icon: 'home', text: '123', action: '/Highschool_ke_leak' },
        { icon: 'search', text: '123', action: '/' },//action: 'nasa-search'
        { icon: 'vibration', text: '123', action: '/' },
        { icon: 'camera', text: '123', action: '/' },
        { icon: 'flash_on', text: '123', action: '/' },
        { icon: 'gps_fixed', text: '123', action: '/' },
        { icon: 'nfc', text: '123', action: '/' }
      ]
    }
  },
  methods: {
    goHome() {
      window.location.hash = "/";
    }
  }
}
</script>
