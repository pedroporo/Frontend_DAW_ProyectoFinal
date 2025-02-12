<script>
import axios from 'axios';
export default {
    methods: {
        //Dependiendo del tipo de informe que nos manden
        //Pediremos unos informes u otros
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
                    <td>Emergencias</td>
                    <td><button @click="verInformes('alarms')">Ver</button></td>
                </tr>
                <tr>
                    <td>Pacientes</td>
                    <td><button @click="verInformes('patients')">Ver</button></td>
                </tr>
                <tr>
                    <td>Llamadas Previstas</td>
                    <td><button @click="verInformes('incoming_calls')">Ver</button></td>
                </tr>
                <tr>
                    <td>Llamadas Realizadas</td>
                    <td><button @click="verInformes('outgoing_calls')">Ver</button></td>
                </tr>
                <tr>
                    <td>Histórico Paciente</td>
                    <td><button @click="verInformes('patient_history')">Ver</button></td>
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
