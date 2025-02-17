<script>
import { mapActions, mapState } from 'pinia';
import { usePatientsStore } from '@/stores/patientStore';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useContactsStore } from '@/stores/contactStore';
import { useZonesStore } from '@/stores/zonesStore';
import { useUsersStore } from '@/stores/usersStore';
export default {
  components: {
    Field,
    Form,
    ErrorMessage
  },
  computed: {
    ...mapState(useUsersStore, ['userNames', 'users']),
    ...mapState(useContactsStore, ['contactNames', 'contacts']),
    ...mapState(useZonesStore, ['zones'])
  },
  data() {
    const schema = yup.object({
      name: yup.string().required('El nombre es requerido'),
      last_name: yup.string().required('El apellido es requerido'),
      birth_date: yup.date().max(new Date(), 'La fecha de nacimiento no puede ser en el futuro').required('La fecha de nacimiento es requerida'),
      address: yup.string().required('La dirección es requerida'),
      city: yup.string().required('La ciudad es requerida'),
      postal_code: yup.string().matches(/^\d{5}$/, 'El código postal debe tener 5 dígitos').required('El código postal es requerido'),
      dni: yup.string().matches(/^\d{8}[A-Z]$/, 'El DNI debe tener 8 números seguidos de una letra mayúscula').required('El DNI es requerido'),
      health_card_number: yup.string().required('El número de tarjeta sanitaria es requerido'),
      phone: yup.string().matches(/^\d{9}$/, 'El teléfono debe tener 9 dígitos').required('El teléfono es requerido'),
      email: yup.string().email('Introduce un email válido').required('El email es requerido'),
      zone_id: yup.string().required('La zona es requerida'),
    });

    return {
      patient: {},
      isEditing: false,
      schema
    }
  },
  methods: {
    ...mapActions(usePatientsStore, ['getPatient', 'updatePatient', 'addPatient']),
    ...mapActions(useContactsStore, ['deleteContact']),
    async loadPatient() {
      const id = this.$route.params.id;
      if (id) {
        const loadedPatient = await this.getPatient(id);
        this.patient = { ...loadedPatient };
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
    editContact(id) {
      this.$router.push({ name: 'contactForm', params: { id, edit: true } });
    },
    addContact(id) {
      this.$router.push({ name: 'contactForm', params: { id } });
    },
    async removeContact(id) {
      if (confirm('Estas seguro de eliminar el contacto?')) {
        await this.deleteContact(id);
      }
    },
    viewContact(id) {
      this.$router.push(`/contact/${id}`);
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
    <Form @submit="addOrUpdatePatient" :validation-schema="schema">
      <div class="form-group">
        <label for="name">Nombre</label>
        <Field name="name" type="text" class="form-control" id="name" v-model="patient.name" />
        <ErrorMessage name="name" class="error-message" />
      </div>
      <div class="form-group">
        <label for="last_name">Apellido</label>
        <Field name="last_name" type="text" class="form-control" id="last_name" v-model="patient.last_name" />
        <ErrorMessage name="last_name" class="error-message" />
      </div>
      <div class="form-group">
        <label for="birth_date">Fecha de Nacimiento</label>
        <Field name="birth_date" type="date" class="form-control" id="birth_date" v-model="patient.birth_date" />
        <ErrorMessage name="birth_date" class="error-message" />
      </div>
      <div class="form-group">
        <label for="address">Dirección</label>
        <Field name="address" type="text" class="form-control" id="address" v-model="patient.address" />
        <ErrorMessage name="address" class="error-message" />
      </div>
      <div class="form-group">
        <label for="city">Ciudad</label>
        <Field name="city" type="text" class="form-control" id="city" v-model="patient.city" />
        <ErrorMessage name="city" class="error-message" />
      </div>
      <div class="form-group">
        <label for="postal_code">Código Postal</label>
        <Field name="postal_code" type="text" class="form-control" id="postal_code" v-model="patient.postal_code" />
        <ErrorMessage name="postal_code" class="error-message" />
      </div>
      <div class="form-group">
        <label for="dni">DNI</label>
        <Field name="dni" type="text" class="form-control" id="dni" v-model="patient.dni" />
        <ErrorMessage name="dni" class="error-message" />
      </div>
      <div class="form-group">
        <label for="health_card_number">Número tarjeta sanitaria</label>
        <Field name="health_card_number" type="text" class="form-control" id="health_card_number"
          v-model="patient.health_card_number" />
        <ErrorMessage name="health_card_number" class="error-message" />
      </div>
      <div class="form-group">
        <label for="phone">Teléfono</label>
        <Field name="phone" type="tel" class="form-control" id="phone" v-model="patient.phone" />
        <ErrorMessage name="phone" class="error-message" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <Field name="email" type="email" class="form-control" id="email" v-model="patient.email" />
        <ErrorMessage name="email" class="error-message" />
      </div>
      <div class="form-group">
        <label for="zone_id">Zona</label>
        <Field name="zone_id" as="select" class="form-control" id="zone_id" v-model="patient.zone_id">
          <option value="">Selecciona una zona</option>
          <option v-for="zone in zones" :key="zone.id" :value="zone.id">
            {{ zone.name }}
          </option>
        </Field>
        <ErrorMessage name="zone_id" class="error-message" />
      </div>
      <div class="form-group">
        <label for="user_id">Operador Asignado</label>
        <Field name="user_id" as="select" class="form-control" id="user_id" v-model="patient.user_id">
          <option value="">Sin Asignar</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.first_name + ' ' + user.last_name }}
          </option>
        </Field>
        <ErrorMessage name="user_id" class="error-message" />
      </div>
      <div class="form-group" v-if="isEditing">
        <label v-if="contactNames(patient.id).length" for="">Contactos</label>
        <ul>
          <li v-for="contact in contactNames(patient.id)" :key="contact.id">
            {{ contact.name }}
            <button @click="editContact(contact.id)" class="btn btn-primary">Editar</button>
            <button @click="removeContact(contact.id)" class="btn btn-danger">Eliminar</button>
            <button @click="viewContact(contact.id)">Info</button>
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label for="personal_situation">Situación personal</label>
        <Field name="personal_situation" as="textarea" class="form-control" id="personal_situation"
          v-model="patient.personal_situation" />
        <ErrorMessage name="personal_situation" class="error-message" />
      </div>
      <div class="form-group">
        <label for="health_situation">Estado de salud</label>
        <Field name="health_situation" as="textarea" class="form-control" id="health_situation"
          v-model="patient.health_situation" />
        <ErrorMessage name="health_situation" class="error-message" />
      </div>
      <div class="form-group">
        <label for="housing_situation">Situación Vivienda</label>
        <Field name="housing_situation" as="textarea" class="form-control" id="housing_situation"
          v-model="patient.housing_situation" />
        <ErrorMessage name="housing_situation" class="error-message" />
      </div>
      <div class="form-group">
        <label for="personal_autonomy">Autonomía</label>
        <Field name="personal_autonomy" as="textarea" class="form-control" id="personal_autonomy"
          v-model="patient.personal_autonomy" />
        <ErrorMessage name="personal_autonomy" class="error-message" />
      </div>
      <div class="form-group">
        <label for="economic_situation">Situación económica</label>
        <Field name="economic_situation" as="textarea" class="form-control" id="economic_situation"
          v-model="patient.economic_situation" />
        <ErrorMessage name="economic_situation" class="error-message" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="button" @click="$router.back()" class="btn btn-danger">Cancelar</button>
        <button @click="addContact(patient.id)" class="btn btn-primary" v-if="isEditing">Añadir Contacto</button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
button[type="button"].btn-danger {
  background-color: #f44336;
  color: white;
}

.error-message {
  color: red;
}

.content {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input,
textarea,
select,
button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #007bff;
}

textarea {
  min-height: 100px;
}

.form-control {
  width: 100%;
}

.error-message {
  color: #d9534f;
  font-size: 0.875rem;
  margin-top: 5px;
}

.btn-primary,
.btn-danger {
  padding: 12px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  border: none;
  margin-top: 15px;
  /* Espaciado adicional entre los botones */
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #555;
  border: 1px solid #ccc;
}

.btn-secondary:hover {
  background-color: #e2e2e2;
}

.form-group button {
  margin-top: 10px;
}

@media (min-width: 768px) {

  /* A partir de tablet en adelante */
  .form-group {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .form-group label {
    width: 150px;
  }

  .form-group input,
  .form-group select,
  .form-group button {
    flex: 1;
  }

  /* Separación de botones en pantallas más grandes */
  .form-group button+button {
    margin-left: 15px;
    /* Espacio entre los botones */
  }
}

@media (max-width: 576px) {

  /* Pantallas pequeñas (móviles) */
  .form-group {
    flex-direction: column;
  }

  .form-group label {
    width: 100%;
  }

  .form-group button {
    margin-top: 10px;
  }
}

@media (max-width: 768px) {

  /* Para dispositivos más pequeños (tabletas) */
  .content {
    padding: 15px;
    max-width: 100%;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    /* Botones de ancho completo en dispositivos móviles y tablets */
  }
}
</style>