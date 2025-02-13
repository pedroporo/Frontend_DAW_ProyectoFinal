<script>
import { mapActions, mapState } from "pinia";
import { useUsersStore } from "@/stores/usersStore";
import { useZonesStore } from "@/stores/zonesStore";
import { useUserZonesStore } from "@/stores/usersZoneStore";

export default {
    computed: {
        ...mapState(useZonesStore, ['zones']),
        ...mapState(useUsersStore, ['users']),
        ...mapState(useUserZonesStore, ['usersZone']),

        usersWithZones() {
            if (!this.users.length || !this.zones.length || !this.usersZone?.length) {
                return [];
            }

            return this.users
                .filter(user => user.role !== "admin")
                .map(user => {
                    const userZoneIds = (this.usersZone || [])
                        .filter(uz => Number(uz.user_id) === Number(user.id))
                        .map(uz => Number(uz.zone_id));

                    const userZones = this.zones
                        .filter(zone => userZoneIds.includes(Number(zone.id)))
                        .map(zone => zone.name);

                    return {
                        ...user,
                        userZones: userZones.join(", ") || "Sin zona"
                    };
                });
        }


    },

    methods: {
        ...mapActions(useUsersStore, ["getUsers", 'removeUser']),
        ...mapActions(useZonesStore, ['getZones']),
        ...mapActions(useUserZonesStore, ['getUsersZones']),

        async deleteUser(id) {
            if (confirm("¿Seguro que quieres borrar este usuario?")) {
                await this.removeUser(id);
                this.loadData();
            }
        },

        edit(id) {
            this.$router.push(`/gestionUsersForm/${id}`);
        },

        async loadData() {
            await this.getUsers();
            await this.getZones();
            await this.getUsersZones();
        }
    },

    async mounted() {
        await this.loadData();
    }
};
</script>

<template>
    <div class="calls-history">
        <h2>Listado de Operadores</h2>
        <button @click="$router.push('/gestionUsersForm')" class="btn btn-primary">Añadir Usuario</button>
        <table class="calls-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Zonas</th>
                    <th>Fecha contratación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in usersWithZones" :key="user.id">
                    <td>{{ user.first_name + " " + user.last_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.userZones }}</td>
                    <td>{{ user.hire_date }}</td>
                    <td>
                        <button @click="edit(user.id)" class="btn btn-secondary btn-sm">Editar</button>
                        <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<style scoped>
/* Contenedor principal */
.calls-history {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
}

/* Título */
.calls-history h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2rem;
    color: #333;
}

/* Botón principal */
.btn {
    display: inline-block;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

/* Tabla */
.calls-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.calls-table th,
.calls-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 16px;
}

.calls-table th {
    background-color: #f1f1f1;
    font-weight: bold;
}

.calls-table tr:nth-child(even) {
    background-color: #fafafa;
}

.calls-table tr:hover {
    background-color: #f5f5f5;
}

/* Botones de acción en la tabla */
.btn-sm {
    padding: 5px 10px;
    font-size: 14px;
    margin-right: 10px;
}

.btn-secondary {
    background-color: #f0ad4e;
    color: #fff;
}

.btn-secondary:hover {
    background-color: #ec971f;
}

.btn-danger {
    background-color: #d9534f;
    color: #fff;
}

.btn-danger:hover {
    background-color: #c9302c;
}

/* Responsive */
@media (max-width: 768px) {

    .calls-table th,
    .calls-table td {
        padding: 8px 10px;
        font-size: 14px;
    }
}
</style>
