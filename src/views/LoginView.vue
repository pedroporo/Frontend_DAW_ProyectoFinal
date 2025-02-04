<script>
import '../assets/main.css';

</script>

<template>
    <div class="content">
      <div class="container">
        <form v-if="!isLogin" @submit.prevent="handleLogin">
          <h2>Login</h2>
          <input type="text" v-model="username" placeholder="Usuario" class="input-field" required>
          <input type="password" v-model="password" placeholder="Contraseña" class="input-field" required>
          <button type="submit">Iniciar Sesión</button>
          <p class="toggle">¿No tienes cuenta? <a href="#" @click="toggleForm">Regístrate</a></p>
        </form>
        <form v-else @submit.prevent="handleRegister">
          <h2>Registro</h2>
          <input type="text" v-model="newUsername" placeholder="Usuario" class="input-field" required>
          <input type="email" v-model="email" placeholder="Correo Electrónico" class="input-field" required>
          <input type="password" v-model="newPassword" placeholder="Contraseña" class="input-field" required>
          <button type="submit">Registrarse</button>
          <p class="toggle">¿Ya tienes cuenta? <a href="#" @click="toggleForm">Inicia sesión</a></p>
        </form>
      </div>
    </div>
  </template>
