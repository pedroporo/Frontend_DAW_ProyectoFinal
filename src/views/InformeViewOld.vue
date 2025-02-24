<script>
import axios from 'axios';

export default {
  name: 'InformeView',
  props: ['tipo'],
  data() {
    return {
      informes: [],
      informesFiltrados: [],
      error: null,
      fechaFiltro: '',
      loading: true
    };
  },
  computed: {
    columnas() {
      if (this.informesFiltrados.length > 0) {
        if (this.tipo === 'patients') {
          return ['id', 'name', 'last_name', 'birth_date', 'phone', 'email'];
        }
        return Object.keys(this.informesFiltrados[0]);
      }
      return [];
    },
    mostrarFiltroFecha() {
      return this.tipo !== 'patients';
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`http://localhost:3000/${this.tipo}`);
        this.informes = response.data;
        if (this.tipo === 'patients') {
          this.informes.sort((a, b) => a.last_name.localeCompare(b.last_name));
        }
        this.informesFiltrados = this.informes;
        this.loading = false;
      } catch (err) {
        console.error('Error fetching data:', err);
        this.error = `Error al cargar los datos para: ${this.tipo}`;
        this.loading = false;
      }
    },
    filtrarPorFecha() {
      if (this.tipo !== 'patients' && this.fechaFiltro) {
        this.informesFiltrados = this.informes.filter(informe => {
          if (this.tipo === 'historicoLlamadasPaciente') {
            return informe.llamadas.some(llamada => llamada.fecha === this.fechaFiltro);
          } else {
            return informe.fecha === this.fechaFiltro || informe.birth_date === this.fechaFiltro;
          }
        });
      } else {
        this.informesFiltrados = this.informes;
      }
    },
    resetearFiltro() {
      this.fechaFiltro = '';
      this.informesFiltrados = this.informes;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<template>
  <div>
    <h1>Lista de {{ tipo }}</h1>
    <div v-if="loading" class="loading">Cargando datos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="mostrarFiltroFecha" class="filtro">
        <input type="date" v-model="fechaFiltro" />
        <button @click="filtrarPorFecha" class="btn btn-primary">Filtrar por fecha</button>
        <button @click="resetearFiltro" class="btn btn-secondary">Resetear filtro</button>
      </div>
      <table v-if="informesFiltrados.length > 0">
        <thead>
          <tr>
            <th v-for="columna in columnas" :key="columna">{{ columna }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="informe in informesFiltrados" :key="informe.id">
            <td v-for="columna in columnas" :key="columna">
              {{ Array.isArray(informe[columna]) ? informe[columna].join(', ') : informe[columna] }}
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay datos disponibles para {{ tipo }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
div {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
}

/* Título */
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

/* Estilo de la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

th {
  background-color: #007bff;
  color: white;
  padding: 12px;
  text-align: left;
  font-size: 16px;
}

td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}

tbody tr:nth-child(even) {
  background-color: #fafafa;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

/* Estilo para los botones */
button {
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.filtro {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

input[type="date"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

/* Botones del filtro */
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

/* Estilos de carga y error */
.loading,
.error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.loading {
  color: #007bff;
}

.error {
  color: #dc3545;
}

/* Responsive */
@media (max-width: 768px) {

  th,
  td {
    padding: 8px 10px;
    font-size: 14px;
  }

  button,
  .btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .filtro {
    flex-direction: column;
  }
}
</style>
