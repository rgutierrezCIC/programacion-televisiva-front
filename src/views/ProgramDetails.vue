<template>
  <div class="details-form">
    <h2>{{ isEditMode ? 'Detalles del Programa' : 'Nuevo Programa' }}</h2>
    <label>
      Nombre:
      <input type="text" v-model="programa.nombre" />
    </label>
    <label>
      Descripción:
      <input type="text" v-model="programa.descripcion" />
    </label>
    <label>
      Clasificación:
      <input type="text" v-model="programa.clasificacion" />
    </label>
    <label>
      Canal:
      <input type="text" v-model="programa.canal" />
    </label>
    <label>
      Fecha Inicio:
      <input type="datetime-local" v-model="programa.fechaIni" />
    </label>
    <label>
      Fecha Fin:
      <input type="datetime-local" v-model="programa.fechaFin" />
    </label>
    <label>
      Semanal:
      <input type="checkbox" v-model="programa.semanal" />
    </label>
    <label>
      Favorito:
      <input type="checkbox" v-model="programa.favorito" />
    </label>
    <label>
      Días:
      <div v-for="day in daysOfWeek" :key="day">
        <input type="checkbox" :value="day" :checked="programa.dias.includes(day)" @change="toggleDay(day, $event)" /> {{ day }}
      </div>
    </label>
    <label>
      Tipo de Programa:
      <select v-model="programa.tipoPrograma">
        <option v-for="tipo in tiposPrograma" :key="tipo.id" :value="tipo">{{ tipo.nombre }}</option>
      </select>
    </label>
    <div class="details-buttons">
      <button @click="saveChanges">{{ isEditMode ? 'Guardar Cambios' : 'Crear Programa' }}</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProgramDetails',
  props: {
    programa: {
      type: Object,
      required: true
    },
    isEditMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      daysOfWeek: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      tiposPrograma: [] // Array para almacenar los tipos de programa
    }
  },
  methods: {
    async fetchTiposPrograma() {
      try {
        const response = await axios.get('/api/tipoprogramas')
        this.tiposPrograma = response.data
      } catch (error) {
        console.error('Error al cargar los tipos de programa:', error)
      }
    },
    toggleDay(day, event) {
      const isChecked = event.target.checked
      if (isChecked) {
        if (!this.programa.dias.includes(day)) {
          this.programa.dias.push(day)
        }
      } else {
        this.programa.dias = this.programa.dias.filter(d => d !== day)
      }
    },
    async saveChanges() {
      try {
        if (this.isEditMode) {
          // Emitir evento para guardar cambios en modo edición
          this.$emit('save', this.programa)
        } else {
          // Crear nuevo programa
          const response = await axios.post('/api/programas', this.programa)
          const newPrograma = response.data
          this.$emit('save', newPrograma)
        }
      } catch (error) {
        console.error('Error al guardar el programa:', error)
      }
    },
    cancelEdit() {
      this.$emit('cancel')
    }
  },
  mounted() {
    this.fetchTiposPrograma() // Llamar al método para obtener los tipos de programa cuando el componente se monta
  }
}
</script>

<style scoped>
.details-form {
  margin-top: 2rem;
}

.details-form label {
  display: block;
  margin-bottom: 1rem;
}

.details-form input[type="text"],
.details-form input[type="datetime-local"],
.details-form select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.details-form input[type="checkbox"] {
  margin-left: 0.5rem;
}

.details-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.details-buttons button {
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
}

.details-buttons button:last-child {
  background-color: #ccc;
  color: black;
}
</style>