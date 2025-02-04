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
                <td><button @click="verInformes('emergencias')">Ver</button></td>
               </tr>
               <tr>
                <td>Pacientes</td>
                <td><button @click="verInformes('pacientes')">Ver</button></td>
               </tr>
                <td>Llamadas Previstas</td>
                <td><button @click="verInformes('llamadasPrevistas')">Ver</button></td>
                <tr>
                <td>Llamadas Realizadas</td>
                <td><button @click="verInformes('llamadasRealizadas')">Ver</button></td>
               </tr>
                <tr>
                <td>Histórico Paciente</td>
                <td><button @click="verInformes('historicoLlamdasPaciente')">Ver</button></td>
               </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
     verInformes(tipoInforme) {
        this.$router.push(`/informes/${tipoInforme}`);
     },
     async getInformePacientes() {
        //Substituir per metodo del store
         try {
            return listaPacientes = await axios.get('http://localhost:3000/pacientes');
         } catch (error) {
             console.error(error);
         }
     }   
    },
};
</script>

<style scoped>
/* Estilos generales de la tabla */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Encabezado de la tabla */
th {
    background-color: #007bff;
    color: white;
    padding: 12px;
    text-align: left;
    font-size: 16px;
}

/* Celdas de la tabla */
td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
}

/* Filas alternas */
tbody tr:nth-child(even) {
    background-color: #f8f9fa;
}

/* Efecto hover en filas */
tbody tr:hover {
    background-color: #e2e6ea;
}

/* Estilo del botón */
button {
    padding: 8px 12px;
    border: none;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    transition: background 0.3s ease;
}

button:hover {
    background-color: #218838;
}

</style>

