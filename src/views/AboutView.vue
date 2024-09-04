<template>
  <div class="about">
    <div class="about-content">
      <h1>Aplicación desarrollada por el Grupo 1</h1>
      <ul class="team-list">
        <li>Pablo Sáinz</li>
        <li>Ramiro Gutiérrez</li>
        <li>Roberto López</li>
      </ul>
      <p class="bootcamp-info">
        En la realización de un Bootcamp impartido por la empresa <a href="https://www.cic.es/" target="_blank" rel="noopener noreferrer">CIC Consulting Informático</a> en el año 2024.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about {
  margin: 2rem;
  padding: 1rem;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

.about-content {
  margin: 0 auto;
}

h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #007bff;
}

.team-info, .bootcamp-info {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
}

.team-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 1rem;
}

.team-list li {
  font-size: 2rem;
  color: #555;
  padding: 0.5rem 0;
}

/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
} */
</style>

