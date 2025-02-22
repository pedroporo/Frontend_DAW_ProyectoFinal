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
                    const userZoneIds = this.usersZone
                        .filter(uz => Number(uz.user_id) === Number(user.id))
                        .map(uz => Number(uz.zone_id));

                    const userZones = this.zones
                        .filter(zone => userZoneIds.includes(Number(zone.id)))
                        .map(zone => zone.name);

                    return {
                        ...user,
                        userZones: userZones.length ? userZones.join(", ") : "Sin zona",
                        zoneIds: userZoneIds
                    };
                });
        }


    },

    methods: {
        ...mapActions(useUsersStore, ["getUsers", 'removeUser']),
        ...mapActions(useZonesStore, ['getZones']),
        ...mapActions(useUserZonesStore, ['getUsersZones']),


        async loadData() {
            await this.getUsers();
            await this.getZones();
            await this.getUsersZones();
        }
    },

    async mounted() {
        document.title = "Listado de Operadores";
        await this.loadData();
    }
};
</script>

<template>
    <div class="calls-history">
        <h2>Lista de Operadores</h2>
        <div class="table-container">
            <table class="calls-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Zonas</th>
                        <th>Fecha contratación</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in usersWithZones" :key="user.id">
                        <td>{{ user.first_name + " " + user.last_name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.userZones }}</td>
                        <td>{{ user.hire_date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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

/* Contenedor para la tabla con scroll si es necesario */
.table-container {
    width: 100%;
    overflow-x: auto;
    /* Permite desplazamiento horizontal en móviles */
}

/* Tabla */
.calls-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    min-width: 600px;
    /* Asegura que no se achique demasiado */
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

/* Responsive */
@media (max-width: 768px) {
    .calls-history {
        padding: 10px;
    }

    .calls-history h2 {
        font-size: 1.5rem;
    }

    .table-container {
        overflow-x: auto;
        /* Scroll horizontal en pantallas pequeñas */
    }

    .calls-table th,
    .calls-table td {
        padding: 8px 10px;
        font-size: 14px;
        white-space: nowrap;
        /* Evita que el texto se corte */
    }
}
</style>
