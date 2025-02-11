<script>
import { mapActions, mapState } from 'pinia';
import { useContactsStore } from '@/stores/contactStore';

export default {
    name: 'ContactForm',
    computed: {
    },
    data() {
        return {
            contact: {
            },
            isEditing: false
        };
    },
    methods: {
        ...mapActions(useContactsStore, ['getContact', 'updateContact', 'addContact']),
        async loadForm() {
            const id = this.$route.params.id;
            const edit = this.$route.params.edit;
            if (edit) {
                const loadedContact = await this.getContact(id);
                this.contact = { ...loadedContact };
                this.isEditing = true;
            } else {
                this.isEditing = false;
                this.contact = {
                    patient_id: id
                };
            }
        },

        async addOrUpdateContact() {
            if (this.isEditing) {
                await this.updateContact(this.contact); 
            } else {
                await this.addContact(this.contact);
            }
            this.$router.push({ name: 'patients' }); 
        },

    },
    async mounted() {
        await this.loadForm();
    }
}
</script>

<template>
    <form @submit.prevent="addOrUpdateContact">
        <h2>{{ isEditing ? 'Editar Contacto' : 'Nuevo Contacto' }}</h2>
        <div class="mb-3">
            <label for="first_name" class="form-label">Nombre</label>
            <input type="text" id="first_name" v-model="contact.first_name" class="form-control" required>
        </div>

        <div class="mb-3">
            <label for="last_name" class="form-label">Apellidos</label>
            <input type="text" id="last_name" v-model="contact.last_name" class="form-control" required>
        </div>

        <div class="mb-3">
            <label for="phone" class="form-label">Teléfono</label>
            <input type="tel" id="phone" v-model="contact.phone" class="form-control" required>
        </div>

        <div class="mb-3">
            <label for="relationship" class="form-label">Relación</label>
            <input type="text" id="relationship" v-model="contact.relationship" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-primary">{{ isEditing ? 'Actualizar Contacto' : 'Añadir Contacto'
            }}</button>
    </form>
</template>

<style scoped>
.mb-3 {
    margin-bottom: 15px;
}
</style>
