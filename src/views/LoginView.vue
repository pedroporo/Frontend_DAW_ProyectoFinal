<script>
import LoginGoogle from '@/components/LoginGoogle.vue';
import { useLoginStore } from '@/stores/loginStore';
import { useRouter } from 'vue-router';

export default {
  components: { LoginGoogle },
  data() {
    return {
      username: '',
      password: '',
      loginStore: useLoginStore(),
      router: useRouter()
    };
  },
  methods: {
    async login() {
      // Simulación de inicio de sesión
      const success = await this.loginStore.handleLogin(this.username, this.password);
      if (success) {
        this.router.push('/'); // Redirige al dashboard o inicio
      } else {
        alert('Credenciales incorrectas');
      }
    }
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <form class="login-form" @submit.prevent="login">
        <h2>Iniciar Sesión</h2>
        <input type="text" v-model="username" placeholder="Usuario" class="input-field" required>
        <input type="password" v-model="password" placeholder="Contraseña" class="input-field" required>
        <button type="submit">Ingresar</button>
        <div class="divider">O</div>
        <LoginGoogle />
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para centrar login */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #007bff, #0056b3);
}

.login-container {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.input-field {
  width: 100%;
  padding: 14px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 14px;
  margin-top: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
