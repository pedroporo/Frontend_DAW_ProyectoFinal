<script>
import { useMessagesStore } from '@/stores/messagesStore';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'AppMessages',
  computed: {
    ...mapState(useMessagesStore, ['messages']),
  },
  methods: {
    ...mapActions(useMessagesStore, ['removeMessage'])
  },
}
</script>

<template>
  <div id="messages">
    <div v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
      <p>{{ message.text }}</p>
      <button @click="removeMessage(index)">X</button>
    </div>
  </div>
</template>

<style scoped>
.message {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  margin-left: 30px;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
}

.message.info {
  background-color: #d1ecf1;
  color: #0c5460;
}
</style>