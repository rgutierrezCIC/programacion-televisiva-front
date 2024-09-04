<template>
    <div>
        <form>
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="programType.nombre" />
            </div>
            <div>
                <label for="descripcion">Descripción:</label>
                <input type="text" id="descripcion" v-model="programType.descripcion" />
            </div>
            <!-- Otros campos -->
        </form>
    </div>
</template>

<script>
export default {
    props: {
        programType: {
            type: Object,
            required: true
        }
    }
}
</script>