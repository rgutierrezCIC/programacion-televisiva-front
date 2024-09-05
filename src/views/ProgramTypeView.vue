<template>
    <div class="program-list">
        <h1>Tipos de Programas</h1>
        <div class="actions">
            <button class="create-button" @click="addProgramType">Crear nuevo Tipo Programa</button>
            <button class="edit-button" @click="editProgramType" :disabled="!selectedProgramType">Editar</button>
            <button class="delete-button" @click.stop="showDeleteModal"
                :disabled="!selectedProgramType">Eliminar</button>
        </div>
        <div class="left-panel">
            <ProgramTypeTable :programTypes="programTypes" @programType-selected="handleProgramTypeSelected" />
        </div>
        <div class="right-panel" v-if="isEditing || isAdding">
            <ProgramTypeForm :programType="selectedProgramType" :mode="isEditing ? 'edit' : 'add'" />
            <div class="details-buttons">
                <button class="save-button" @click="handleProgramTypeSaved">Guardar</button>
                <button class="cancel-button" @click.stop="cancelEdit">Cancelar</button>
            </div>
        </div>

        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <p>¿Estás seguro de que deseas eliminar este tipo de programa?</p>
                <button @click="confirmDelete">Sí</button>
                <button @click="showModal = false">No</button>
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
            isEditing: false,
            isAdding: false,
            selectedPrograma: null,
            showModal: false
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
        addProgramType() {
            this.selectedProgramType = {};
            this.isAdding = true;
            this.isEditing = false;
        },
        editProgramType() {
            if (this.selectedProgramType) {
                this.isAdding = false;
                this.isEditing = true;
            }
        },
        cancelEdit() {
            this.isEditing = false;
            this.isAdding = false;
        },
        async confirmDelete() {
            if (!this.selectedProgramType) return

            this.isEditing = false;
            const toast = useToast();
            try {
                await axios.delete(`/api/tipoprogramas/${this.selectedProgramType.id}`);
                this.programTypes = this.programTypes.filter(u => u.id !== this.selectedProgramType.id);
                toast.success(`El tipo de programa ${this.selectedProgramType.nombre} se ha borrado.`);
                this.selectedProgramType = null;
                this.showModal = false;
            } catch (error) {
                console.error('Error al borrar el tipo de programa:', error);
                toast.error(`Error al borrar el tipo de programa ${this.selectedProgramType.nombre}.`);
            }
        },
        showDeleteModal() {
            this.showModal = true
        },
        async confirmDelete2() {
            if (!this.selectedPrograma) return

            try {
                await axios.delete(`/api/programas/${this.selectedPrograma.id}`)
                this.programas = this.programas.filter(p => p.id !== this.selectedPrograma.id)
                this.selectedPrograma = null
                this.showModal = false
                this.showDetails = false
                this.showNewForm = false
            } catch (error) {
                console.error('Error al eliminar el programa:', error)
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
.program-list {
    margin: 2rem;
}

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

tr.selected {
    background-color: #d3d3d3;
}

.actions {
    margin-bottom: 1rem;
}

button {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    color: white;
    border: none;
    cursor: pointer;
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

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 5px;
    text-align: center;
}

.modal-content button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #ff4d4d;
    color: white;
    border: none;
    cursor: pointer;
}

.modal-content button:last-child {
    background-color: #ccc;
    color: black;
}
</style>
