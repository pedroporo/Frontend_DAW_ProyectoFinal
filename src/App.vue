<script setup>
<<<<<<< HEAD
import { useRoute } from 'vue-router';

const route = useRoute();
=======
import { RouterLink, RouterView } from 'vue-router'
>>>>>>> 63146574865b7177b6659e82bc0012db81fe0d96
</script>

<template>
  <header>
<<<<<<< HEAD
    <div class="sidebar" v-if="route.path !== '/login'">
      <h1>Teleasistencia</h1>
      <nav>
        <RouterLink to="/">Mi Cuenta</RouterLink>
        <RouterLink to="/">Lista de Pacientes</RouterLink>
        <RouterLink to="/">Registro de Llamadas</RouterLink>
        <RouterLink to="/">Avisos y Alarmas</RouterLink>
        <RouterLink to="/">Informes</RouterLink>
        <RouterLink to="/">Calendario</RouterLink>
        <RouterLink to="/">Gestión de Operadores</RouterLink>
        <RouterLink to="/">Cerrar Sesión</RouterLink>
      </nav>
=======
   
    <div class="wrapper">

>>>>>>> 63146574865b7177b6659e82bc0012db81fe0d96
    </div>
  </header>

  <RouterView />
</template>
<<<<<<< HEAD
=======

<style scoped>

</style>
>>>>>>> 63146574865b7177b6659e82bc0012db81fe0d96
