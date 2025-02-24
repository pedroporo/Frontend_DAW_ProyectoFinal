<script>
import { useLoginStore } from "@/stores/loginStore";
import { mapActions } from "pinia";

const urlLoginGoogle = import.meta.env.VITE_API_LOGIN_GOOGLE_URL;

export default {
  methods: {
    ...mapActions(useLoginStore, ["handleGoogleLogin"]),

    loginWithGoogle() {
      window.location.href = import.meta.env.VITE_API_LOGIN_GOOGLE_URL;
    },
    
    async checkForGoogleCode() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      console.log(code, urlParams)
      if (code) {
        await this.handleGoogleLogin(code);
        window.history.replaceState({}, document.title, "/");
      }
    },
  },

  mounted() {
    this.checkForGoogleCode();
  },
};
</script>


<template>
  <div class="login-container">
    <button @click="loginWithGoogle">Iniciar sesión con Google</button>
  </div>
</template>

<style scoped>
.login-container {
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: 400px;
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #0056b3;
}
</style>
