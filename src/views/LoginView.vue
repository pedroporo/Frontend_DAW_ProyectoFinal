<script>
import { useLoginStore } from "@/stores/loginStore";
import { mapActions, mapState } from "pinia";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const loginWithGoogle = async () => {
      try {
        const response = await axios.get("http://localhost/api/login/google", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Access-Control-Allow-Headers":
              "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
          },
        });
        console.log(response);

        //localStorage.setItem('token', response);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      loginWithGoogle,
    };
  },
};
</script>

<template>
  <button @click="loginWithGoogle">Login with Google</button>
</template>

<style scoped>
/* Asegurar que la página ocupe toda la pantalla y centrar el contenido */
html,
body {
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
