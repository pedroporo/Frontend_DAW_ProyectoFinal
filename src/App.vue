<script>
import { mapActions } from 'pinia';
import { RouterLink, useRoute } from 'vue-router';
import { useDataStore } from './stores/store';

import PatientsView from './views/PatientsView.vue';
import { RouterLink, RouterView , useRoute} from 'vue-router'
import { useStore } from './stores/patientStore';
export default {
  computed: {
    route() {
      return useRoute();
    }
  },

  methods: {
    ...mapActions(useDataStore, ["getUsers", "getPatients", 'getAlarmas','getContacts', 'getZones']),
  },
  async mounted() {
    await this.getUsers();
    await this.getPatients();
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
        <RouterLink to="/informes">Informes</RouterLink> |
        <RouterLink to="/">Gestión de Operadores</RouterLink> |
        <RouterLink to="/">Cerrar Sesión</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>


<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");
</style>
