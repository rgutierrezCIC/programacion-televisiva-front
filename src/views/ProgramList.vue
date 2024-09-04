<template>
  <div class="program-list">
    <h1>Lista de Programas</h1>
    <button @click="createNewPrograma">Crear Nuevo Programa</button>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Clasificación</th>
          <th>Canal</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="programa in programas" :key="programa.id" @click="selectPrograma(programa)">
          <td>{{ programa.nombre }}</td>
          <td>{{ programa.descripcion }}</td>
          <td>{{ programa.clasificacion }}</td>
          <td>{{ programa.canal }}</td>
          <td>{{ formatDate(programa.fechaIni) }}</td>
          <td>{{ formatDate(programa.fechaFin) }}</td>
          <td>
            <button @click.stop="editPrograma(programa)">Editar</button>
            <button @click.stop="confirmDelete(programa)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ProgramDetails
      v-if="showNewForm || showDetails"
      :programa="editablePrograma"
      :isEditMode="showDetails"
      @save="handleSave"
      @cancel="handleCancel"
    />

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>¿Estás seguro de que deseas eliminar este programa?</p>
        <button @click="confirmDelete">Sí</button>
        <button @click="showModal = false">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProgramDetails from './ProgramDetails.vue'

export default {
  name: 'ProgramList',
  components: {
    ProgramDetails
  },
  data() {
    return {
      programas: [],
      selectedPrograma: null,
      showModal: false,
      showDetails: false,
      showNewForm: false,
      editablePrograma: null
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
    },
    selectPrograma(programa) {
      this.selectedPrograma = programa
      this.showDetails = true
      this.showNewForm = false
      this.editablePrograma = { ...programa }
    },
    createNewPrograma() {
      this.editablePrograma = {
        nombre: '',
        descripcion: '',
        clasificacion: '',
        canal: '',
        fechaIni: '',
        fechaFin: '',
        semanal: false,
        favorito: false,
        dias: [],
        tipoPrograma: null // Asegúrate de que el tipoPrograma está inicializado
      }
      this.showNewForm = true
      this.showDetails = false
    },
    async confirmDelete() {
      if (!this.selectedPrograma) return

      try {
        await axios.delete(`/api/programas/${this.selectedPrograma.id}`)
        this.programas = this.programas.filter(p => p.id !== this.selectedPrograma.id)
        this.selectedPrograma = null
        this.showModal = false
        this.showDetails = false
        this.showNewForm = false
      } catch (error) {
        console.error('Error al eliminar el programa:', error)
      }
    },
    async handleSave(programa) {
      try {
        if (this.showDetails) {
          const response = await axios.put('/api/programas', programa)
          const updatedPrograma = response.data
          const index = this.programas.findIndex(p => p.id === updatedPrograma.id)
          if (index !== -1) {
            this.programas.splice(index, 1, updatedPrograma)
          }
          this.selectedPrograma = updatedPrograma
        } else if (this.showNewForm) {
          const response = await axios.post('/api/programas', programa)
          const newPrograma = response.data
          this.programas.push(newPrograma)
        }
        this.showDetails = false
        this.showNewForm = false
      } catch (error) {
        console.error('Error al guardar el programa:', error)
      }
    },
    handleCancel() {
      this.showDetails = false
      this.showNewForm = false
      this.editablePrograma = null
    }
  },
  mounted() {
    this.fetchProgramas()
  }
}
</script>

<style scoped>
.program-list {
  margin: 2rem;
}

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

tr.selected {
  background-color: #d3d3d3;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  text-align: center;
}

.modal-content button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
}

.modal-content button:last-child {
  background-color: #ccc;
  color: black;
}
</style>