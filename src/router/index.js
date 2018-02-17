import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from '@/components/LoginComponent'
import PeriodComponent from '@/components/PeriodComponent'
// import TopsComponent from '@/components/Tops/TopsComponent'
import TargetsComponent from '@/components/Targets/TargetsComponent'
import CalendarComponent from '@/components/Calendar/CalendarComponent'
import DoingsManagementComponent from '@/components/Doings/DoingsManagementComponent'
import UsersManagementComponent from '@/components/Users/UsersManagementComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent
    }, {
      path: '/targets',
      name: 'Targets',
      component: TargetsComponent
    }, {
      path: '/users',
      name: 'Users',
      component: UsersManagementComponent
    }, {
      path: '/targets/:id',
      name: 'Targets',
      component: TargetsComponent
    }, {
      path: '/doingsManagement',
      name: 'DoingsManagement',
      component: DoingsManagementComponent
    }, {
      path: '/calendar',
      name: 'Calendar',
      component: CalendarComponent
    }, {
      path: '/period/:date/:periodType',
      name: 'Period',
      component: PeriodComponent
      // children: [
      //   {
      //     path: 'tops',
      //     name: 'Tops',
      //     component: TopsComponent
      //   }
      // ]
    }
  ]
})
