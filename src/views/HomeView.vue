<template>
  <div>
    <p class="welcome-message">
      ¡Bienvenido a nuestra página de programación televisiva! Aquí encontrarás todos los programas que te gustan, organizados de manera sencilla y fácil de navegar.
    </p>
    <p class="fun-facts">
      ¿Sabías que el primer control remoto para la televisión se llamaba "Lazy Bones" y fue inventado en 1950? ¡Descubre más curiosidades como esta en nuestros documentales!
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.welcome-message, .fun-facts {
  margin: 2rem;
  padding: 1rem;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.2rem;
  color: #333;
  font-style: italic;
  line-height: 1.5;
}

.welcome-message {
  background-color: #d3d3d3;
  /* Fondo gris claro */
}

.fun-facts {
  background-color: #f9f9f9;
  /* Fondo más claro */
}

nav {
  margin-top: 2rem;
}

router-link {
  margin-right: 1rem;
  font-weight: bold;
  color: #007bff;
}

router-link:hover {
  text-decoration: underline;
}

</style>
