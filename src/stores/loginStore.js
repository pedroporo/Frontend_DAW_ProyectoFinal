import { defineStore, mapActions } from "pinia";
import axios from "axios";
import { useMessagesStore } from "./messagesStore";

const urlLoginGoogle =
  "https://backend.worldmemistic.duckdns.org/api/login/google";

export const useLoginStore = defineStore("login", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),

    /*     async login() {
      try {
        const response = await axios.get(urlLoginGoogle);
        console.log(response);

        this.user = response.data;
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        return response.data;
      } catch (error) {
        this.addMessage("Error al Iniciar Sesión " + error, "error");
      }
    },
      async loginWithGoogle() {
        try {
          const googleAuth = googleOneTap();
          const googleUser = await googleAuth();

          if (!googleUser || !googleUser.credential) {
            throw new Error("No se pudo obtener el token de Google");
          }

          const response = await axios.post(urlLoginGoogle, {
            token: googleUser.credential,
          });

          console.log("Respuesta del backend:", response.data);

          this.user = response.data.user;
          this.token = response.data.token;
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);

          return response.data;
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
          this.addMessage(
            "Error al iniciar sesión: " +
              (error.response?.data?.message || error.message),
            "error"
          );
        }
      },

      async autoLogin() {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            // Opcional: verificar si el token aún es válido en el backend
            const response = await axios.get(
              "https://backend.worldmemistic.duckdns.org/api/auth/me",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            this.user = response.data.user;
            this.token = token;
          } catch (error) {
            console.warn(
              "El token ha expirado o es inválido, iniciando sesión nuevamente..."
            );
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            await this.loginWithGoogle();
          }
        } else {
          await this.loginWithGoogle();
        }
      },*/
     /*  async loginWithGoogle() {
        try {
          google.accounts.id.initialize({
            client_id: "372335971957-co69tfn66v1fgq3p1a15alj46mglf6f0.apps.googleusercontent.com",
            callback: async (response) => {
              const res = await axios.post(urlLoginGoogle, { token: response.credential });
              this.user = res.data.user;
              this.token = res.data.token;
              localStorage.setItem("user", JSON.stringify(this.user));
              localStorage.setItem("token", this.token);
            },
          });
      
          google.accounts.id.prompt();
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
        }
      }, */
      

      logout() {
        this.user = {};
        this.token = {};
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      },
    },
  
});
