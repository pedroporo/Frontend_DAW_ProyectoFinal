<script>
import { mapActions } from 'pinia';
import { useRoute } from 'vue-router';
import { useDataStore } from './stores/store';

export default {
  computed: {
    route() {
      return useRoute();
    }
  },

  methods: {
    ...mapActions(useDataStore, ["getUsers", "getPatients", 'getAlarmas']),
  },
  async mounted() {
    await this.getUsers();
    await this.getPatients();
    await this.getAlarmas();
  }
};
</script>

<template>
  <header>
    <div class="sidebar" v-if="route.path !== '/login'">
      <h1>Teleasistencia</h1>
      <nav>
        <RouterLink to="/">Mi Cuenta</RouterLink> |
        <RouterLink to="/patients">Lista de Pacientes</RouterLink> |
        <RouterLink to="/incoming_calls">Llamadas Entrantes</RouterLink> |
        <RouterLink to="/outgoing_calls">Llamadas Salientes</RouterLink> |
        <RouterLink to="/">Avisos y Alarmas</RouterLink> |
        <RouterLink to="/informes">Informes</RouterLink> |
        <RouterLink to="/">Calendario</RouterLink> |
        <RouterLink to="/">Gestión de Operadores</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style>
@import './assets/main.css';

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 5px;
  padding: 5px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar {
  background-color: #bcc9d6;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  align-items: center;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
}

nav a {
  color: #2c3e50;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover, nav a.router-link-active {
  background-color: #7091af;
}

main {
  flex-grow: 1;
  padding: 20px;
}

</style>
