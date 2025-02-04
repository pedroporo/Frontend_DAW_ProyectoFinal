<script>
import { mapActions } from 'pinia';
import PatientsView from './views/PatientsView.vue';
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from './stores/patientStore';
export default {
  methods: {
    ...mapActions(useStore, ['getUsers','getContacts'])
  },
  mounted() {
    this.getUsers()
    this.getContacts()
  }
}
</script>

<template>
  <header>
   
    
  </header>

  <RouterView />
</template>


<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");</style>
