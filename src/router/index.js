import Vue from 'vue'
import Router from 'vue-router'
import Highschool_ke_leak from '@/views/Highschool_ke_leak'
import Highschool_ke_leak_retest from '@/views/Highschool_ke_leak_retest'
import Vocabulary from '@/views/Vocabulary'
import ReadTest from '@/views/ReadTest'
import Main from '@/views/Main'
import Setting from '@/views/Setting'
import SctorSpace from '@/views/SctorSpace'
import Statistics from '@/views/Statistics'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }, {
      path: '/Highschool_ke_leak',
      name: 'Highschool_ke_leak',
      component: Highschool_ke_leak
    }, {
      path: '/Highschool_ke_leak_retest',
      name: 'Highschool_ke_leak_retest',
      component: Highschool_ke_leak_retest
    }, {
      path: '/Vocabulary',
      name: 'Vocabulary',
      component: Vocabulary
    }, {
      path: '/ReadTest',
      name: 'ReadTest',
      component: ReadTest
    }, {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    }, {
      path: '/SctorSpace',
      name: 'SctorSpace',
      component: SctorSpace
    }, {
      path: '/Statistics',
      name: 'Statistics',
      component: Statistics
    }
  ]
})