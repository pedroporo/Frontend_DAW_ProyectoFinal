<script>
import { mapActions } from 'pinia';
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
    ...mapActions(useStore, ['getUsers', 'getZones', 'getContacts'])
  },
  mounted() {
    this.getUsers(),
    this.getZones(),
    this.getContacts()
  }
}
</script>

<template>
  <header>
    <div class="sidebar" v-if="route.path !== '/login'">
      <h1>Teleasistencia</h1>
      <nav>
        <RouterLink to="/">Mi Cuenta</RouterLink>
        <RouterLink to="/patients">Lista de Pacientes</RouterLink>
        <RouterLink to="/">Registro de Llamadas</RouterLink>
        <RouterLink to="/">Avisos y Alarmas</RouterLink>
        <RouterLink to="/">Informes</RouterLink>
        <RouterLink to="/">Calendario</RouterLink>
        <RouterLink to="/">Gestión de Operadores</RouterLink>
        <RouterLink to="/">Cerrar Sesión</RouterLink>
      </nav>    
    </div>
  </header>
  <RouterView />
</template>


<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");
</style>
