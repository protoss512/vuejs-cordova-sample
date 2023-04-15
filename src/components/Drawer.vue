<template>
  <div>

    <!--v-list density="compact">
      <v-list-subheader>REPORTS</v-list-subheader>

      <v-list-item v-for="(item, i) in items" :key="i" :value="item" active-color="primary">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list-->
    <v-toolbar>{{ $t("app_name") }}</v-toolbar>
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
import i18n from '../i18n';
export default {
  name: "drawer",
  data: function () {
    return {
      items: [
        { icon: 'home', text: i18n.t("home"), action: '/' },
        { icon: 'search', text: i18n.t("to_Ke_Leak"), action: '/Highschool_ke_leak' },//action: 'nasa-search'
        { icon: 'vibration', text: '123', action: '/ReadTest' },
      ]
    }
  },
  methods: {
  }
}
</script>
