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
        <RouterLink to="/">Lista de Pacientes</RouterLink> |
        <RouterLink to="/incoming_calls">Llamadas Entrantes</RouterLink> |
        <RouterLink to="/outgoing_calls">Llamadas Salientes</RouterLink> |
        <RouterLink to="/">Avisos y Alarmas</RouterLink> |
        <RouterLink to="/">Informes</RouterLink> |
        <RouterLink to="/">Calendario</RouterLink> |
        <RouterLink to="/">Gestión de Operadores</RouterLink> |
        <RouterLink to="/">Cerrar Sesión</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
