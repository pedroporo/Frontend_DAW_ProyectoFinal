import InformeList from '@/components/InformeList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 
    {
    path: '/informeList',
    name: 'informeList',
    component: InformeList
  }
  ],
})

export default router
