import InformeList from '@/components/InformeList.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import InformeView from '@/views/InformeView.vue'
import IncomingCallsView from '@/views/IncomingCallsView.vue'
import OutgoingCallsView from '@/views/OutgoingCallsView.vue'
import IncomingCallForm from '@/views/IncomingCallForm.vue'
import OutgoingCallForm from '@/views/OutgoingCallForm.vue'


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
    {
      path: '/incoming_calls',
      name: 'incoming_calls',
      component: IncomingCallsView
    },
    {
      path: '/outgoing_calls',
      name: 'outgoing_calls',
      component: OutgoingCallsView
    },
    {
      path: '/incomingForm/:id?',
      name: 'incomingForm',
      component: IncomingCallForm
    },
    {
      path: '/outgoingForm/:id?',
      name: 'outgoingForm',
      component: OutgoingCallForm
    }
  ],
})

export default router
