<script>
import { mapActions, mapState } from "pinia";
import { useUsersStore } from "@/stores/usersStore";
import { useZonesStore } from "@/stores/zonesStore";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    components: { Form, Field, ErrorMessage },
    data() {
        return {
            isEdit: false,
            user: {},
            schema: yup.object({
                first_name: yup.string().required("El nombre es obligatorio"),
                last_name: yup.string().required("El apellido es obligatorio"),
                email: yup.string().email("Email inválido").required("El email es obligatorio"),
                phone: yup.string().required("El teléfono es obligatorio").min(9, "Mínimo 9 dígitos"),
                role: yup.string().required("El rol es obligatorio"),
                username: yup.string().required("El usuario es obligatorio"),
                password: yup.string().min(6, "Mínimo 6 caracteres"),
                hire_date: yup.string().required("La fecha de contratación es obligatoria"),
                termination_date: yup.string().nullable(),
                zone_id: yup.string().required("La zona es obligatoria"),
            }),
        };
    },
    computed: {
        ...mapState(useUsersStore, ["users"]),
        ...mapState(useZonesStore, ["zones"]),
    },
    methods: {
        ...mapActions(useUsersStore, ["getUsersById", "addUser", "updateUser"]),
        async loadUser() {
            const userId = this.$route.params.id;
            if (userId) {
                this.isEdit = true;
                this.user = await this.getUsersById(userId);
            } else {
                this.isEdit = false;
                this.user = {};
            }
        },
        async saveUser() {
            if (this.isEdit) {
                await this.updateUser(this.user);
            } else {
                await this.addUser(this.user);
            }
            this.$router.push("/gestionUsers");
        },
    },
    async mounted() {
        await this.loadUser();
    },
};
</script>

<template>
    <h2>{{ isEdit ? "Editar Usuario" : "Registrar Usuario" }}</h2>
    <Form @submit="saveUser" :validation-schema="schema" class="user-form">
        <div class="form-group">
            <label for="first_name">Nombre:</label>
            <Field type="text" name="first_name" v-model="user.first_name" class="form-control" />
            <ErrorMessage class="error" name="first_name" />
        </div>

        <div class="form-group">
            <label for="last_name">Apellido:</label>
            <Field type="text" name="last_name" v-model="user.last_name" class="form-control" />
            <ErrorMessage class="error" name="last_name" />
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <Field type="email" name="email" v-model="user.email" class="form-control" />
            <ErrorMessage class="error" name="email" />
        </div>

        <div class="form-group">
            <label for="phone">Teléfono:</label>
            <Field type="text" name="phone" v-model="user.phone" class="form-control" />
            <ErrorMessage class="error" name="phone" />
        </div>

        <div class="form-group">
            <label for="role">Rol:</label>
            <Field as="select" name="role" v-model="user.role" class="form-control">
                <option value="" disabled>-- Seleccione un rol --</option>
                <option value="admin">Admin</option>
                <option value="operator">Operador</option>
            </Field>
            <ErrorMessage class="error" name="role" />
        </div>

        <div class="form-group">
            <label for="zone_id">Zona:</label>
            <Field as="select" name="zone_id" v-model="user.zone_id" class="form-control">
                <option value="" disabled>-- Seleccione una zona --</option>
                <option v-for="zone in zones" :key="zone.id" :value="zone.id">{{ zone.name }}</option>
            </Field>
            <ErrorMessage class="error" name="zone_id" />
        </div>

        <div class="form-group">
            <label for="username">Usuario:</label>
            <Field type="text" name="username" v-model="user.username" class="form-control" />
            <ErrorMessage class="error" name="username" />
        </div>

        <div class="form-group">
            <label for="password">Contraseña:</label>
            <Field type="password" name="password" v-model="user.password" class="form-control" />
            <ErrorMessage class="error" name="password" />
        </div>

        <div class="form-group">
            <label for="hire_date">Fecha de contratación:</label>
            <Field type="date" name="hire_date" v-model="user.hire_date" class="form-control" />
            <ErrorMessage class="error" name="hire_date" />
        </div>

        <div class="form-group">
            <label for="termination_date">Fecha de terminación:</label>
            <Field type="date" name="termination_date" v-model="user.termination_date" class="form-control" />
            <ErrorMessage class="error" name="termination_date" />
        </div>

        <div class="form-buttons">
            <button type="submit">{{ isEdit ? "Actualizar" : "Añadir" }}</button>
            <button type="button" class="btn-danger" @click="$router.push('/gestionUsers')">Cancelar</button>
        </div>
    </Form>
</template>

<style scoped>
h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #333;
}

.user-form {
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 8px;
    color: #555;
}

.form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    height: 40px;
}

textarea.form-control {
    height: auto;
    min-height: 100px;
}

input:focus,
textarea:focus,
select:focus {
    border-color: #007bff;
}

.error {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    transition: background 0.3s ease-in-out;
    width: 48%;
}

button[type="submit"] {
    background-color: #007bff;
    color: white;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}

button.btn-danger {
    background-color: #f44336;
    color: white;
}

button.btn-danger:hover {
    background-color: #d32f2f;
}
</style>
