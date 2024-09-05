<template>
  <div>
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
  data() {
    return {
      selectedProgramType: null
    };
  },
  props: ['programTypes'],
  methods: {
    selectProgramType(programType) {
      this.selectedProgramType = programType;
      this.$emit('programType-selected', programType);
    },
    deleteProgramType(programType) {
      this.$emit('programType-deleted', programType);
    },
    confirmDelete(programType) {
      if (confirm('¿Seguro que quieres eliminar este tipo de programa?')) {
        this.deleteProgramType(programType);
      }
    }
  }
};
</script>


<style scoped>
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
</style>