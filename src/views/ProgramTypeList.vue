<template>
  <div>
    <h1>Tipos de Programa</h1>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="programType in programTypes" :key="programType.id">
          <td>{{ programType.nombre }}</td>
          <td>{{ programType.descripcion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProgramTypeList',
  data() {
    return {
      programTypes: []
    }
  },
  methods: {
    async fetchProgramTypes() {
      try {
        const response = await axios.get('/api/tipoprogramas')
        // Asegúrate de que response.data es un array
        if (Array.isArray(response.data)) {
          this.programTypes = response.data
        } else {
          console.error('La respuesta no es un array:', response.data)
        }
      } catch (error) {
        console.error('Error al cargar los tipos de programas:', error)
      }
    },
    formatDate(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
  },
  mounted() {
    this.fetchProgramTypes()
  }
}
</script>

<style scoped>
/* Estilos específicos para el componente ProgramTypeList */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>