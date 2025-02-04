import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
=======
>>>>>>> 63146574865b7177b6659e82bc0012db81fe0d96

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
<<<<<<< HEAD
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
=======
    
>>>>>>> 63146574865b7177b6659e82bc0012db81fe0d96
  ],
})

export default router
