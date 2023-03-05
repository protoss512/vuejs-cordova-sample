import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Highschool_ke_leak from '@/views/Highschool_ke_leak'
import Flash from '@/views/Flash'
import Report from '@/views/Report'
import Nfc from '@/views/Nfc'
import Localisation from '@/views/Localisation'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/Highschool_ke_leak',
      name: 'Highschool_ke_leak',
      component: Highschool_ke_leak
    },{
      path: '/flash',
      name: 'Flash',
      component: Flash
    },{
      path: '/Report',
      name: 'Report',
      component: Report
    },{
      path: '/nfc',
      name: 'Nfc',
      component: Nfc
    },{
      path: '/localisation',
      name: 'Localisation',
      component: Localisation
    }
  ]
})