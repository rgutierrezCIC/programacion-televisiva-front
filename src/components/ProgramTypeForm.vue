<template>
    <div class="details-form">
        <h2>{{ title }}</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for="nombre">Nombre:
                    <input type="text" id="nombre" v-model="programType.nombre" />
                </label>
            </div>
            <div>
                <label for="descripcion">Descripción:
                    <input type="text" id="descripcion" v-model="programType.descripcion" />
                </label>
            </div>
            <div class="details-buttons">
                <button class="save-button" type="submit">Guardar</button>
                <button class="cancel-button" type="button" @click="cancelForm">Cancelar</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        programType: {
            type: Object,
            required: true
        },
        mode: String
    },
    computed: {
        title() {
            return this.mode === 'edit' ? 'Detalles del Tipo de Programa' : 'Nuevo Tipo de Programa';
        }
    },
    methods: {
        submitForm() {
            this.$emit('save', this.programType);
        },
        cancelForm() {
            this.$emit('cancel');
        }
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
</style>