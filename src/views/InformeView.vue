<script>
import { ref, onMounted } from 'vue';
//Estos datos se recogerán de la api de momento es para ver la funcionalidad
const informesData = {
  "pacientes": [
    { "id": 1, "nombre": "Juan Pérez", "edad": 45 },
    { "id": 2, "nombre": "María García", "edad": 32 },
    { "id": 3, "nombre": "Carlos López", "edad": 58 }
  ],
  "emergencias": [
    { "id": 1, "tipo": "Accidente de tráfico", "fecha": "2023-05-15" },
    { "id": 2, "tipo": "Incendio", "fecha": "2023-05-16" }
  ],
  "llamadasPrevistas": [
    { "id": 1, "paciente": "Ana Martínez", "fecha": "2023-05-20" },
    { "id": 2, "paciente": "Pedro Sánchez", "fecha": "2023-05-21" }
  ],
  "llamadasRealizadas": [
    { "id": 1, "paciente": "Luisa Fernández", "fecha": "2023-05-10", "duracion": "15 min" },
    { "id": 2, "paciente": "Antonio Ruiz", "fecha": "2023-05-11", "duracion": "20 min" }
  ],
  "historicoLlamdasPaciente": [
    { "id": 1, "paciente": "Elena Gómez", "fechas": ["2023-04-01", "2023-04-15", "2023-05-01"] },
    { "id": 2, "paciente": "Roberto Díaz", "fechas": ["2023-04-05", "2023-04-20", "2023-05-05"] }
  ]
};

export default {
  name: 'InformeView',
  props: ['tipo'],
  setup(props) {
    const informes = ref([]);
    const error = ref(null);

    onMounted(() => {
      if (informesData[props.tipo]) {
        informes.value = informesData[props.tipo];
      } else {
        error.value = `No se encontraron datos para el tipo: ${props.tipo}`;
      }
    });

    return { informes, error };
  }
}
</script>

<template>
  <div>
    <h1>Lista de {{ tipo }}</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <table v-else-if="informes.length > 0">
      <thead>
        <tr>
          <th v-for="(value, key) in informes[0]" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="informe in informes" :key="informe.id">
          <td v-for="(value, key) in informe" :key="key">
            {{ Array.isArray(value) ? value.join(', ') : value }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay datos disponibles para {{ tipo }}</p>
  </div>
</template>

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
    font-size: 20px;
}

/* Celdas de la tabla */
td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    font-size: 20px;
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
    font-size: 19px;
    transition: background 0.3s ease;
}

button:hover {
    background-color: #218838;
}
</style>