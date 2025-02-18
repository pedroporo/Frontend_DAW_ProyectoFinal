<script>
import { mapActions } from 'pinia';
import { RouterLink, RouterView , useRoute} from 'vue-router'
import AppMessages from './components/AppMessages.vue';
import { useAlarmsStore } from './stores/alarmsStore';
import { useContactsStore } from './stores/contactStore';
import { useZonesStore } from './stores/zonesStore';
import { useUsersStore } from './stores/usersStore';

export default {
  name: 'App',
  components: {
    AppMessages
  },
  computed: {
    route() {
      return useRoute();
    }
  },

  methods: {
    ...mapActions(useAlarmsStore, ['getAlarmas']),
    ...mapActions(useContactsStore, ['getContacts']),
    ...mapActions(useZonesStore, ['getZones']),
    ...mapActions(useUsersStore, ['getUsers'])
  },
  async mounted() {
    await this.getUsers();
    await this.getAlarmas();
    await this.getZones(),
    await this.getContacts()
  }
};
</script>

<template>
  <header>
    <div class="sidebar" v-if="route.path !== '/login'">
      <h1>Teleasistencia</h1>
      <nav class="nav">
        <RouterLink to="/">Mi Cuenta</RouterLink>
        <RouterLink to="/patients">Lista de Pacientes</RouterLink>
        <RouterLink to="/incoming_calls">Llamadas Entrantes</RouterLink>
        <RouterLink to="/outgoing_calls">Llamadas Salientes</RouterLink>
        <RouterLink to="/informes">Informes</RouterLink>
        <RouterLink to="/gestionUsers">Gestión de Operadores</RouterLink>
        <RouterLink to="/">Cerrar Sesion</RouterLink>
      </nav>
    </div>
  </header>
  <div class="main-content">
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
.main-content {
    margin-left: 250px;
    padding: 20px;
}
</style>
