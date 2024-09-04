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
        <tr v-for="programType in programTypes" :key="programType.id" @click="selectProgramType(programType)">
          <td>{{ programType.nombre }}</td>
          <td>{{ programType.descripcion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  props: ['programTypes'],
  methods: {
    selectProgramType(programType) {
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