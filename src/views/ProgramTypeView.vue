<template>
    <div class="container">
        <div class="left-panel">
            <ProgramTypeTable :programTypes="programTypes" @programType-selected="handleProgramTypeSelected"
                @programType-deleted="handleProgramTypeDeleted" />
            <div class="buttons">
                <button class="editbutton" @click="editProgramType">Editar</button>
                <button @click.stop="handleProgramTypeDeleted(selectedProgramType)">Borrar</button>
            </div>
        </div>
        <div class="right-panel" v-if="isEditing">
            <ProgramTypeForm :programType="selectedProgramType" />
            <div class="buttons">
                <button class="savebutton" @click="handleProgramTypeSaved">Guardar</button>
                <button @click.stop="cancelEdit">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import ProgramTypeTable from '@/components/ProgramTypeTable.vue';
import ProgramTypeForm from '@/components/ProgramTypeForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    components: {
        ProgramTypeTable,
        ProgramTypeForm
    },
    data() {
        return {
            programTypes: [],
            selectedProgramType: null,
            isEditing: false
        };
    },
    async created() {
        await this.fetchProgramTypes();
        const programTypeId = this.$route.params.id;
        if (programTypeId) {
            this.selectProgramTypeById(programTypeId);
        }
    },
    watch: {
        '$route.params.id': function (newId) {
            if (newId) {
                this.selectProgramTypeById(newId);
            }
        }
    },
    methods: {
        async fetchProgramTypes() {
            try {
                const response = await axios.get('/api/tipoprogramas');
                this.programTypes = response.data;

                const programTypeId = this.$route.params.id;
                if (programTypeId) {
                    this.selectProgramTypeById(programTypeId);
                }
            } catch (error) {
                toast.error(`Error cargando tipos de programa.`);
                console.error('Error cargando tipos de programa:', error);
            }
        },
        selectProgramTypeById(id) {
            const programType = this.programTypes.find(programType => programType.id === parseInt(id));
            if (programType) {
                this.selectedProgramType = programType;
            } else {
                console.error(`El tipo de programa ${programType.nombre} no se ha encontrado`);
            }
        },
        handleProgramTypeSelected(programType) {
            console.log('Selected ProgramType:', programType);
            this.selectedProgramType = programType;
            // this.$router.push(`/programtypes/${programType.id}`);
        },
        editProgramType() {
            if (this.selectedProgramType) {
                this.isEditing = true;
            }
        },
        cancelEdit() {
            this.isEditing = false;
        },
        async handleProgramTypeDeleted(programType) {
            const toast = useToast();
            try {
                await axios.delete(`/api/tipoprogramas/${programType.id}`);
                this.programTypes = this.programTypes.filter(u => u.id !== programType.id);
                if (this.selectedProgramType && this.selectedProgramType.id === programType.id) {
                    this.selectedProgramType = null;
                    // this.$router.push('/');
                }
                toast.success(`El tipo de programa ${programType.nombre} se ha borrado.`);
            } catch (error) {
                console.error('Error al borrar el tipo de programa:', error);
                toast.error(`Error al borrar el tipo de programa ${programType.nombre}.`);
            }
        },
        async handleProgramTypeSaved(updatedProgramType) {
            const toast = useToast();
            try {
                console.log('Tipo de programa a actualizar:', updatedProgramType);

                // Transformar los nombres de los parámetros
                // const transformedAuthor = {
                //     id: updatedProgramType.id,
                //     nombre: updatedProgramType.firstName,
                //     apellidos: updatedProgramType.lastName,
                //     annoNacimiento: updatedProgramType.anno
                // };

                const response = await axios.put(`/api/tipoprogramas`, updatedProgramType);
                const updatedProgramTypeData = response.data;
                const index = this.programTypes.findIndex(programType => programType.id === updatedProgramTypeData.id);
                if (index !== -1) {
                    this.programType.splice(index, 1, {
                        id: updatedProgramTypeData.id,
                        firstName: updatedProgramTypeData.nombre,
                        lastName: updatedProgramTypeData.apellidos,
                        anno: updatedProgramTypeData.annoNacimiento
                    });
                }
                toast.success(`ProgramType with id ${updatedProgramTypeData.id} updated successfully.`);
            } catch (error) {
                console.error('Error updating program type:', error);
                toast.error(`Error updating program type with id ${updatedProgramType.id}.`);
            }
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
}

.left-panel {
    flex: 1;
}

.right-panel {
    flex: 1;
}

.buttons {
    margin-top: 10px;
}
</style>


<!-- <style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    gap: 30px;
    padding: 20px;
    box-sizing: border-box;
    /* min-width: 900px; */
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: auto;
    }
}
</style> -->
