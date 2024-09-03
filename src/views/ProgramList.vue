<template>
  <div>
    <h1>Lista de Programas</h1>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Clasificación</th>
          <th>Canal</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Semanal</th>
          <th>Favorito</th>
          <th>Días</th> <!-- Nueva columna -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="programa in programas" :key="programa.id">
          <td>{{ programa.nombre }}</td>
          <td>{{ programa.descripcion }}</td>
          <td>{{ programa.clasificacion }}</td>
          <td>{{ programa.canal }}</td>
          <td>{{ formatDate(programa.fechaIni) }}</td>
          <td>{{ formatDate(programa.fechaFin) }}</td>
          <td>{{ programa.semanal ? 'Sí' : 'No' }}</td>
          <td>{{ programa.favorito ? 'Sí' : 'No' }}</td>
          <td>{{ programa.dias.join(', ') }}</td> <!-- Nueva celda -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProgramList',
  data() {
    return {
      programas: []
    }
  },
  methods: {
    async fetchProgramas() {
      try {
        const response = await axios.get('/api/programas')
        // Asegúrate de que response.data es un array
        if (Array.isArray(response.data)) {
          this.programas = response.data
        } else {
          console.error('La respuesta no es un array:', response.data)
        }
      } catch (error) {
        console.error('Error al cargar los programas:', error)
      }
    },
    formatDate(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
  },
  mounted() {
    this.fetchProgramas()
  }
}
</script>

<style scoped>
/* Estilos específicos para el componente ProgramList */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>