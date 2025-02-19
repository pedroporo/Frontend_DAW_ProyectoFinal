import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import vue3GoogleLogin from 'vue3-google-login'
const app = createApp(App)

app.use(createPinia())
app.use(router)

/* app.use(vue3GoogleLogin({
    clientId: '372335971957-co69tfn66v1fgq3p1a15alj46mglf6f0.apps.googleusercontent.com',
  })); */

  app.component('GoogleLogin', vue3GoogleLogin.GoogleLogin)

app.mount('#app')
