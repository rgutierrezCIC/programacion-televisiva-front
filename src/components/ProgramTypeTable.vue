<template>

  <div class="actions">
    <button class="create-button" @click="addProgramType">Crear nuevo Tipo de Programa</button>
    <button class="edit-button" @click="editProgramType" :disabled="!selectedProgramType">Editar</button>
    <button class="delete-button" @click.stop="showDeleteModal" :disabled="!selectedProgramType">Eliminar</button>
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="programType in programTypes" :key="programType.id"
          :class="{ 'selected-row': programType === selectedProgramType }" @click="selectProgramType(programType)">
          <td>{{ programType.nombre }}</td>
          <td>{{ programType.descripcion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  // data() {
  //   return {
  //     selectedProgramType: Object
  //   };
  // },
  props: {
    programTypes: Array,
    selectedProgramType: Object
  },
  emits: ['selectProgramType', 'addProgramType', 'editProgramType', 'showDeleteModal'],
  methods: {
    selectProgramType(programType) {
      //this.selectedProgramType = programType;
      this.$emit('selectProgramType', programType);
    },
    addProgramType() {
      this.$emit('addProgramType');
    },
    editProgramType() {
      this.$emit('editProgramType');
    },
    showDeleteModal() {
      this.$emit('showDeleteModal');
    }
  }
};
</script>


<style scoped>
.actions {
  margin-bottom: 1rem;
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

.details-buttons .save-button {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  /* Verde */
  color: white;
  border: none;
  cursor: pointer;
}

.details-buttons .cancel-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  /* Rojo */
  color: white;
  border: none;
  cursor: pointer;
}

button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}


.selected-row {
  background-color: #d3d3d3;
}

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
</style>