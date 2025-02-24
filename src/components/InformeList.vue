<script>
export default {
    methods: {
        verInformes(tipoInforme) {
            this.$router.push(`/informe/${tipoInforme}`);
        },
    },
};
</script>

<template>
    <div class="container">
        <h1>📊 Informes Disponibles</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre del Informe</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Llamadas Realizadas</td>
                    <td><button @click="verInformes('calls_done')">Ver</button></td>
                </tr>
                <tr>
                    <td>Llamadas Planificadas</td>
                    <td><button @click="verInformes('calls_to_do')">Ver</button></td>
                </tr>
                <tr>
                    <td>Llamadas del Usuario</td>
                    <td><button @click="verInformes('calls_by_user')">Ver</button></td>
                </tr>
                <tr>
                    <td>Historial de Llamadas de Paciente</td>
                    <td><button @click="verInformes('pacient_history')">Ver</button></td>
                </tr>
                <tr>
                    <td>Emergencias por Zona</td>
                    <td><button @click="verInformes('zone_info')">Ver</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.container {
    max-width: 900px;
    margin: 100px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #007bff;
    color: white;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}

button {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
}

button:hover {
    background-color: #0056b3;
}
</style>
