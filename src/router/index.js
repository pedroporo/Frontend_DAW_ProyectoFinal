import InformeList from '@/components/InformeList.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import InformeView from '@/views/InformeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/informes',
      name: 'informes',
      component: InformeList
    },
    {
      path: '/informe/:tipo',
      name: 'informe',
      component: InformeView,
      props: true
    },
  ],
})

export default router
