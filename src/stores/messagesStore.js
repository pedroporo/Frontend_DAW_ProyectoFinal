import { defineStore } from "pinia";

export const useMessagesStore = defineStore("messages", {
  state() {
    return {
      messages: [],
    };
  },

  actions: {
    addMessage(message, type = "info") {
      if (message === "Debes estar autenticado") {
        this.messages = [{ text: message, type }];
        return;
      }

      const exists = this.messages.some(
        (msg) => msg.text === message && msg.type === type
      );
      
      if (!exists && !this.messages.some((msg) => msg.text === "Debes estar autenticado")) {
        this.messages.push({ text: message, type });
        setTimeout(() => {
          const index = this.messages.findIndex(
            (msg) => msg.text === message && msg.type === type
          );
          if (index !== -1) {
            this.removeMessage(index);
          }
        }, 10000);
      }
    },
    removeMessage(index) {
      this.messages.splice(index, 1);
    },
  },
});
