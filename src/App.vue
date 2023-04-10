<template>
  <div style="height: 100vh;width: 100vw;margin: 0;padding: 0;max-width: 100%;
                                                                              overflow-x: hidden;">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">{{ title }}</span>
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <!--nav class="mdl-navigation">
            <a class="mdl-navigation__link" href="">Link</a>
          </nav-->
        </div>

      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Title</span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
        </nav>
      </div>
      <main class="mdl-layout__content">
        <div class="page-content"
          style="display: flex;justify-content: center;align-items: center;flex-direction:column;">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      title: 'Home',
    }
  },
  beforeCreate() {

  },
  mounted() {

  },
  updated() {

  }
}

</script>