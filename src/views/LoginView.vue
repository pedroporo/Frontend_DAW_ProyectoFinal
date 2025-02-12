<script>
import '../assets/main.css';

</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <form class="login-form">
        <h2>Login</h2>
        <input type="text" v-model="username" placeholder="Usuario" class="input-field" required>
        <input type="password" v-model="password" placeholder="Contraseña" class="input-field" required>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Asegurar que la página ocupe toda la pantalla y centrar el contenido */
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;
}

/* Contenedor principal del login */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 160px;
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form h2 {
  margin-bottom: 1rem;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
