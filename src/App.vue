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
    <div class="top-bar" v-if="route.path !== '/login'">
      <h1>Teleasistencia</h1>
      <nav class="nav">
        <RouterLink to="/">Mi Cuenta</RouterLink>
        <RouterLink to="/patients">Lista de Pacientes</RouterLink>
        <RouterLink to="/incoming_calls">Llamadas Entrantes</RouterLink>
        <RouterLink to="/outgoing_calls">Llamadas Salientes</RouterLink>
        <RouterLink to="/informes">Informes</RouterLink>
        <RouterLink to="/">Gestión de Operadores</RouterLink>
        <RouterLink to="/">Cerrar Sesion</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>


<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  font-weight: bold;
}
.nav{
  display: flex;
  gap: 20px;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}
.nav a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}
</style>