<script>
import { mapActions, mapState } from 'pinia';
import { useStore } from '@/stores/patientStore';

export default {
  computed: {
    ...mapState(useStore, [])
  },
  data() {
    return {
      patient: {},
      isEditing: false
    }
  },
  methods: {
    ...mapActions(useStore, ['getPatient', 'updatePatient', 'deletePatient', 'addPatient']),
    async loadPatient() {
      const id = this.$route.params.id;
      if (id) {
        const loadedPatient = await this.getPatient(id);
        this.patient = { ...this.patient, ...loadedPatient };
        this.isEditing = true;
      }
    },
    async addOrUpdatePatient() {
        if (this.isEditing) {
          await this.updatePatient(this.patient);
        } else {
          await this.addPatient(this.patient);
        }
        this.$router.push({ name: 'patients' });
    },
    async deletePatient() {
      if (confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
          await this.deletePatient(this.patient.id);
          this.$router.push({ name: 'patientList' });
      }
    }
  },
  async mounted() {
    await this.loadPatient();
  }
}
</script>

<template>
  <div class="content">
    <h2>{{ isEditing ? 'Editar Paciente' : 'Nuevo Paciente' }}</h2>
    <form @submit.prevent="addOrUpdatePatient">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" class="form-control" id="name" v-model="patient.name">
      </div>
      <div class="form-group">
        <label for="last_name">Apellido</label>
        <input type="text" class="form-control" id="last_name" v-model="patient.last_name">
      </div>
      <div class="form-group">
        <label for="birth_date">Fecha de Nacimiento</label>
        <input type="date" class="form-control" id="birth_date" v-model="patient.birth_date">
      </div>
      <div class="form-group">
        <label for="address">Dirección</label>
        <input type="text" class="form-control" id="address" v-model="patient.address">
      </div>
      <div class="form-group">
        <label for="city">Ciudad</label>
        <input type="text" class="form-control" id="city" v-model="patient.city">
      </div>
      <div class="form-group">
        <label for="postal_code">Código Postal</label>
        <input type="text" class="form-control" id="postal_code" v-model="patient.postal_code">
      </div>
      <div class="form-group">
        <label for="dni">DNI</label>
        <input type="text" class="form-control" id="dni" v-model="patient.dni">
      </div>
      <div class="form-group">
        <label for="health_card_number">Número tarjeta sanitaria</label>
        <input type="text" class="form-control" id="health_card_number" v-model="patient.health_card_number">
      </div>
      <div class="form-group">
        <label for="phone">Teléfono</label>
        <input type="tel" class="form-control" id="phone" v-model="patient.phone">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="patient.email">
      </div>
      <div class="form-group">
        <label for="zone_id">Zona</label>
        <input type="text" class="form-control" id="zone_id" v-model="patient.zone_id">
      </div>
      <div class="form-group">
        <label for="personal_situation">Situación personal</label>
        <textarea class="form-control" id="personal_situation" v-model="patient.personal_situation"></textarea>
      </div>
      <div class="form-group">
        <label for="health_situation">Estado de salud</label>
        <textarea class="form-control" id="health_situation" v-model="patient.health_situation"></textarea>
      </div>
      <div class="form-group">
        <label for="housing_situation">Situación Vivienda</label>
        <textarea class="form-control" id="housing_situation" v-model="patient.housing_situation"></textarea>
      </div>
      <div class="form-group">
        <label for="personal_autonomy">Autonomía</label>
        <textarea class="form-control" id="personal_autonomy" v-model="patient.personal_autonomy"></textarea>
      </div>
      <div class="form-group">
        <label for="economic_situation">Situación económica</label>
        <textarea class="form-control" id="economic_situation" v-model="patient.economic_situation"></textarea>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="button" @click="$router.push({ name: 'patients' })" class="btn btn-secondary">Volver</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>

