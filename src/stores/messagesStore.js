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
    },
    removeMessage(index) {
      this.messages.splice(index, 1);
    },
  },
});
