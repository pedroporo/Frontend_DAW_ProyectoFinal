import { defineStore } from "pinia";

export const useMessagesStore = defineStore("messages", {
  state() {
    return {
      messages: [],
    };
  },

  actions: {
    addMessage(message, type = "info") {
      this.messages.push({ text: message, type });
      setTimeout(() => {
        const index = this.messages.findIndex(
          (msg) => msg.text === message && msg.type === type
        );
        if (index !== -1) {
          this.removeMessage(index);
        }
      }, 12000);
    },
    removeMessage(index) {
      this.messages.splice(index, 1);
    },
  },
});
