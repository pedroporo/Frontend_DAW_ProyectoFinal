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
    <div class="content">
        <h2>{{ isEditing ? 'Editar Contacto' : 'Nuevo Contacto' }}</h2>
        <form @submit.prevent="addOrUpdateContact">
            <div class="form-group">
                <label for="first_name">Nombre</label>
                <input type="text" id="first_name" v-model="contact.first_name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="last_name">Apellidos</label>
                <input type="text" id="last_name" v-model="contact.last_name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="phone">Teléfono</label>
                <input type="tel" id="phone" v-model="contact.phone" class="form-control" />
            </div>
            <div class="form-group">
                <label for="relationship">Relación</label>
                <input type="text" id="relationship" v-model="contact.relationship" class="form-control" />
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn btn-primary">
                    {{ isEditing ? 'Actualizar Contacto' : 'Añadir Contacto' }}
                </button>
                <button type="button" @click="$router.back()" class="btn btn-danger">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.content {
    padding: 20px;
    max-width: 900px;
    margin: 85px auto;
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

.form-buttons {
    display: flex;
    /* Cambiar a display flex para alinear los botones horizontalmente */
    gap: 10px;
    /* Añadir un espacio de 10px entre los botones */
    margin-top: 20px;
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
button {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

input:focus {
    border-color: #007bff;
}

/* Aseguramos que las casillas de entrada tengan el mismo margen a ambos lados */
.form-control {
    width: 100%;
    box-sizing: border-box;
    /* Asegura que el padding no afecte el ancho total */
}

.btn-primary,
.btn-danger {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    margin-top: 10px;
}

.btn-danger {
    background-color: #f44336;
    color: white;
}

.btn-danger:hover {
    background-color: #d32f2f;
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

@media (max-width: 768px) {
    .content {
        padding: 15px;
        max-width: 100%;
    }

    .btn-primary,
    .btn-secondary {
        width: 100%;
    }
}
</style>