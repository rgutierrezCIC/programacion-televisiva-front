<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <h1 class="green">Programación Televisiva</h1>
      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/programtypes">Tipos de programa</router-link>
        <router-link to="/programs">Programas</router-link>
        <router-link to="/about">Acerca de</router-link>
      </nav>
    </div>
  </header>

  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  line-height: 1.5;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin: 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.content {
  margin-top: 5rem; /* Ajusta según la altura del header */
  padding-left: 1rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 0;
  }

  .content {
    margin-top: 6rem; /* Ajusta según la altura del header */
    padding-left: 2rem;
  }
}
</style>