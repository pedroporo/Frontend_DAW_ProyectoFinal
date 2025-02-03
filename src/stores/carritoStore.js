import { defineStore } from "pinia";
import api from "./api.js";

export const useCartStore = defineStore("carritoStore", {
  state() {
    return {
      carrito: [],
    };
  },
  actions: {
    populateCart() {
      if (!localStorage.carrito || localStorage.carrito.lenght === 0) {
        this.resetCart();
      }
      if (localStorage.carrito.lenght != 0) {
        this.carrito = Array.from(JSON.parse(localStorage.carrito));
      }
    },
    updateCart() {
      localStorage.carrito = JSON.stringify(this.carrito);
    },
    addGame(game) {
      try {
        game.uds=1;
        this.carrito.push(game);
        this.updateCart();
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    resetCart() {
      this.carrito = [];
      this.updateCart();
    },
    delGame(index) {
      try {
        const indice = this.carrito.findIndex((game) => game.id === index);
        this.carrito.splice(indice, 1);
        this.updateCart();
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
  },
});
