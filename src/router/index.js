import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Highschool_ke_leak from '@/views/Highschool_ke_leak'
import Report from '@/views/Report'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/Highschool_ke_leak',
      name: 'Highschool_ke_leak',
      component: Highschool_ke_leak
    }, {
      path: '/Report',
      name: 'Report',
      component: Report
    }
  ]
})