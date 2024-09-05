<template>
  <div class="program-list">
    <h1>Programas</h1>
    <div class="actions">
      <!-- Botones deshabilitados cuando está activo el formulario de edición o creación -->
      <button class="create-button" @click="createNewPrograma" :disabled="showNewForm || showDetails">Crear Nuevo Programa</button>
      <button class="edit-button" @click="editPrograma" :disabled="!selectedPrograma || showNewForm || showDetails">Editar</button>
      <button class="delete-button" @click="showDeleteModal" :disabled="!selectedPrograma || showNewForm || showDetails">Eliminar</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Clasificación</th>
            <th>Canal</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Tipo de Programa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="programa in programas" :key="programa.id"
            @click="!showNewForm && !showDetails && selectPrograma(programa)"
            :class="{ selected: programa.id === selectedPrograma?.id }">
            <td>{{ truncateText(programa.nombre, 100) }}</td>
            <td>{{ truncateText(programa.descripcion, 100) }}</td>
            <td>{{ programa.clasificacion }}</td>
            <td>{{ truncateText(programa.canal, 100) }}</td>
            <td>{{ formatDate(programa.fechaIni) }}</td>
            <td>{{ formatDate(programa.fechaFin) }}</td>
            <td>{{ programa.tipoPrograma?.nombre }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulario de edición o creación de programas -->
    <ProgramDetails v-if="showNewForm || showDetails" ref="editForm" :programa="editablePrograma"
      :isEditMode="showDetails" @save="handleSave" @cancel="handleCancel" />

    <!-- Modal de confirmación para eliminar -->
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
      const formattedDate = date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      const formattedTime = date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      return `${formattedDate} ${formattedTime}`
    },
    truncateText(text, maxLength) {
      if (!text) return ''
      return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
    },
    selectPrograma(programa) {
      this.selectedPrograma = programa
      this.showDetails = false
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
        tipoPrograma: null
      }
      this.showNewForm = true
      this.showDetails = false

      this.$nextTick(() => {
        const editForm = this.$refs.editForm
        if (editForm) {
          editForm.$el.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },
    editPrograma() {
      if (this.selectedPrograma) {
        this.showDetails = true
        this.showNewForm = false
        this.editablePrograma = { ...this.selectedPrograma }

        this.$nextTick(() => {
          const editForm = this.$refs.editForm
          if (editForm) {
            editForm.$el.scrollIntoView({ behavior: 'smooth' })
          }
        })
      }
    },
    showDeleteModal() {
      this.showModal = true
    },
    async confirmDelete() {
  if (!this.selectedPrograma) return

  try {
    await axios.delete(`/api/programas/${this.selectedPrograma.id}`)
    this.selectedPrograma = null
    this.showModal = false
    this.showDetails = false
    this.showNewForm = false

    // Recargar completamente la página (como si presionara F5)
    window.location.reload()
  } catch (error) {
    console.error('Error al eliminar el programa:', error)
  }
}

,
    async handleSave(programa) {
      try {
        if (this.showDetails) {
          // Actualizar el programa existente
          const response = await axios.put('/api/programas', programa)
          const updatedPrograma = response.data
          const index = this.programas.findIndex(p => p.id === updatedPrograma.id)
          if (index !== -1) {
            this.programas.splice(index, 1, updatedPrograma)
          }
          this.selectedPrograma = updatedPrograma
        } else if (this.showNewForm) {
          // Crear un nuevo programa
          const response = await axios.post('/api/programas', programa)
          const newPrograma = response.data
          this.programas.push(newPrograma)
        }

        this.showDetails = false
        this.showNewForm = false

        // Recargar la lista de programas
        this.fetchProgramas()
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

.table-container {
  max-height: 400px;
  /* Altura máxima ajustable */
  overflow-y: auto;
  position: relative;
  /* Necesario para hacer que el sticky funcione correctamente */
}

th {
  position: sticky;
  top: 0;
  z-index: 2;
  /* Aumenta el z-index del encabezado */
  background-color: #f2f2f2;
  /* Asegúrate de que tenga un fondo sólido */
  color: #333;
  /* Color del texto */
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  /* Añade un ligero sombreado para mayor visibilidad */
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

tr.selected {
  background-color: #d3d3d3;
}

.actions {
  margin-bottom: 1rem;
}

button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  cursor: pointer;
}

button.create-button {
  background-color: #28a745;
  /* Verde */
}

button.edit-button {
  background-color: #007bff;
  /* Azul */
}

button.delete-button {
  background-color: #dc3545;
  /* Rojo */
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
  z-index: 1000;
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
