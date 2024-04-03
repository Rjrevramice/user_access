import { createRouter, createWebHistory } from 'vue-router'
import login from '../components/login.vue'
import register from '../components/register.vue'
import employeeLayout from '../components/employee/employeeLayout.vue'
import employeeProfile from '../components/employee/employeeProfile.vue'
import adminLayout from '../components/admin/adminLayout.vue'
import allEmployees from '../components/admin/allEmployees.vue'
import teamLeadLayout from '../components/team_lead/teamLeadLayout.vue'
import teamLeadProfile from '../components/team_lead/teamLeadProfile.vue'
import adminProfile from '../components/admin/adminProfile.vue'

const routes = [
    { path: '/', component: login },
    { path: '/register', component: register },
    { 
      path: '/employee',
      component: employeeLayout,
      children: [
        { path: 'my-profile', component: employeeProfile }
        
      ]
    },
    {
      path:'/admin',
      component: adminLayout,
      children: [
        { path: 'all-employees', component: allEmployees },
        { path: 'my-profile', component: adminProfile }
        
      ]
    },
    {
      path:'/teamlead',
      component: teamLeadLayout,
      children: [
        { path: 'all-employees', component: allEmployees },
        { path: 'my-profile', component: teamLeadProfile }
        
      ]
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
