<script>
import '../assets/main.css';

</script>

<template>
    <div class="content">
      <div class="container">
        <form @submit.prevent="handleLogin">
          <h2>Login</h2>
          <input type="text" v-model="username" placeholder="Usuario" class="input-field" required>
          <input type="password" v-model="password" placeholder="Contraseña" class="input-field" required>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  </template>
 