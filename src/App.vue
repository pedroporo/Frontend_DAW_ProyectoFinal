<script>
import { useRoute } from 'vue-router';

export default {
  computed: {
    route() {
      return useRoute();
    }
  }
};
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
        <RouterLink to="/informes">Informes</RouterLink>
        <RouterLink to="/">Calendario</RouterLink>
        <RouterLink to="/">Gestión de Operadores</RouterLink>
        <RouterLink to="/">Cerrar Sesión</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

