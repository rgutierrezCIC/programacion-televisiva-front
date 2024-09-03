<template>
  <div>
    <h1>Home</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/programtypes">Tipos de programa</router-link>
      <router-link to="/programs">Programas</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
/* Estilos específicos para el componente HomeView */
</style>