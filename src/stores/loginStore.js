import { defineStore, mapActions } from "pinia";
import axios from "axios";
import { useMessagesStore } from "./messagesStore";
import router from "@/router"; // Importa el router
import api from "./api/axiosInstance";
const urlLoginGoogle = import.meta.env.VITE_API_LOGIN_GOOGLE_URL;
const urlNormal = import.meta.env.VITE_API_BASE_URL;

export const useLoginStore = defineStore("login", {
  state: () => ({
    user: {},
    token: null,
  }),
  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),
    async handleGoogleLogin(code) {
      if (!code) {
        this.addMessage("Error al autenticar con Google !code", "error");
        return;
      }

      try {
        const response = await axios.get(
          `${urlLoginGoogle}/callback?code=${code}`
        );

        const data = response.data;
        if (data.success) {
          this.user = data.data.user;
          this.token = data.data.token;
          localStorage.setItem("auth_token", data.data.token);

          router.push("/");
        }
      } catch (error) {
        this.addMessage("Error al autenticar con Google" + error, "error");
      }
    },

    async logout() {
      const response = await api.post(`${urlNormal}logout`);
    
      //console.log(`${urlNormal}logout`);
      console.log(response);

      this.user = {};
      this.token = null;

      localStorage.removeItem("auth_token");
    },
  },
});
