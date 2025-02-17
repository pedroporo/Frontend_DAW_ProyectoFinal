<script>
import { mapActions } from 'pinia';
import { useContactsStore } from '../stores/contactStore';

export default {
    data() {
        return {
            contact: {}
        };
    },
    methods: {
       ...mapActions(useContactsStore, ['getContact']),
    },
    async mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.contact = await this.getContact(id);
        }
    }
};
</script>
<template>
    <table class="data-table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Teléfono</th>
        <th>Relación</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td>{{ contact.first_name }}</td>
        <td>{{ contact.last_name }}</td>
        <td>{{ contact.phone }}</td>
        <td>{{ contact.relationship }}</td>
      </tr>
    </tbody>
  </table>
  <button class="btn btn-secondary" @click="this.$router.back()">Volver</button>
</template>



<style>
.form-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
}

input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>