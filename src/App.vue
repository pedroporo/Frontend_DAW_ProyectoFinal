<script>
import { mapActions } from 'pinia';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import AppMessages from './components/AppMessages.vue';
import { useAlarmsStore } from './stores/alarmsStore';
import { useContactsStore } from './stores/contactStore';
import { useZonesStore } from './stores/zonesStore';
import { useUsersStore } from './stores/usersStore';
import LoginGoogle from './components/LoginGoogle.vue';
import { useLoginStore } from './stores/loginStore';
import { useMessagesStore } from './stores/messagesStore';

export default {
  name: 'App',
  components: {
    AppMessages,
    LoginGoogle
  },
  computed: {
    route() {
      return useRoute();
    }
  },
  data() {
    return {
      isNavVisible: false
    };
  },
  methods: {
    ...mapActions(useContactsStore, ['getContacts']),
    ...mapActions(useZonesStore, ['getZones']),
    ...mapActions(useUsersStore, ['getUsers']),
    ...mapActions(useLoginStore, ['logout']),
    ...mapActions(useMessagesStore, ['addMessage']),

    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    },

    closeNavOnMobile() {
      if (window.innerWidth <= 768) {
        this.isNavVisible = false;
      }

    },
    async cerrarSesion(){
      if (await this.logout()) {
        this.addMessage('Sesión cerrada exitosamente', 'success');
      }
    }

  },
  async mounted() {
    //await this.getUsers();
    await this.getZones(),
      await this.getContacts()
  }
};
</script>

<template>
  <header>
    <div class="sidebar" v-if="route.path !== '/login'">
      <h1>Teleasistencia</h1>
      <button @click="toggleNav" class="toggle-nav-btn"><i class="bi bi-list"></i></button>
      <nav class="nav" :class="{ 'nav-visible': isNavVisible }">
        <RouterLink to="/" @click="closeNavOnMobile">Mi Cuenta</RouterLink>
        <RouterLink to="/patients" @click="closeNavOnMobile">Listado de Pacientes</RouterLink>
        <RouterLink to="/incoming_calls" @click="closeNavOnMobile">Llamadas Entrantes</RouterLink>
        <RouterLink to="/outgoing_calls" @click="closeNavOnMobile">Llamadas Salientes</RouterLink>
        <!-- <RouterLink to="/gestionUsers" @click="closeNavOnMobile">Listado de Operadores</RouterLink> -->
        <RouterLink to="/informes" @click="closeNavOnMobile">Informes</RouterLink>
        <RouterLink to="/" @click="cerrarSesion(),closeNavOnMobile()">Cerrar Sesión</RouterLink>
        <LoginGoogle />
      </nav>
    </div>
  </header>
  <div class="main-content-app">
    <AppMessages />
    <RouterView />
  </div>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");

/* Estilos generales del sidebar */
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #007bff;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 30px;
  margin-bottom: 20px;
}

.toggle-nav-btn {
  background: none;
  border: none;
  color: white;
  font-size: 32px;
  /* Increased font size */
  cursor: pointer;
  padding: 0;
  display: none;
  /* Ocultar por defecto */
}

/* Navegación */
nav {
  display: flex;
  flex-direction: column;
  width: 100%;
}

nav a {
  text-decoration: none;
  color: white;
  padding: 12px 15px;
  border-radius: 5px;
  margin-bottom: 8px;
  font-size: 16px;
  transition: background 0.3s;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Contenido principal con margen para que no se solape con el sidebar */
.main-content-app {
  margin-left: 250px;
  padding: 20px;
}

/* Estilos para vista móvil */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    box-shadow: none;
  }

  .toggle-nav-btn {
    display: block;
    /* Mostrar botón en pantallas pequeñas */
  }

  nav {
    display: none;
    /* Ocultar navegación por defecto en pantallas pequeñas */
  }

  nav.nav-visible {
    display: flex;
    /* Mostrar navegación cuando isNavVisible es true */
    flex-direction: column;
    width: 100%;
  }

  nav a {
    margin: 5px;
    padding: 10px;
    font-size: 14px;
  }

  .main-content-app {
    margin-left: 0;
    padding: 10px;
  }
}
</style>
