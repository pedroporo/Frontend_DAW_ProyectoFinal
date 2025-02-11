<script>
import { mapActions } from 'pinia';
import AppMessages from './components/AppMessages.vue';
import { RouterLink, RouterView , useRoute} from 'vue-router'
import { useContactsStore } from './stores/contactStore';
import { useUsersStore } from './stores/usersStore';
import { useZonesStore } from './stores/zonesStore';
import { useAlarmsStore } from './stores/alarmsStore';
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
      <app-messages></app-messages>
    </div>
  </header>
  <RouterView />
</template>


<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");
</style>
