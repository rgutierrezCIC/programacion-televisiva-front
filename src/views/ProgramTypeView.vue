<template>
    <div class="program-list">
        <h1>Tipos de Programas</h1>

        <div class="left-panel">
            <ProgramTypeTable ref="programTypeTable" :programTypes="programTypes"
                :selectedProgramType="selectedProgramType" @selectProgramType="selectProgramType"
                @addProgramType="addProgramType" @editProgramType="editProgramType"
                @showDeleteModal="showDeleteModal" />
        </div>

        <div class="right-panel" v-if="isEditing || isAdding">
            <ProgramTypeForm :programType="selectedProgramType" :mode="isEditing ? 'edit' : 'add'" @save="handleSave"
                @cancel="cancelEdit" />
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
    // mounted() {
    //     document.addEventListener('click', this.handleClickOutside);
    // },
    // beforeUnmount() {
    //     document.removeEventListener('click', this.handleClickOutside);
    // },
    watch: {
        '$route.params.id': function (newId) {
            if (newId) {
                this.fetchProgramTypes();
                this.selectProgramTypeById(newId);
            } else {
                this.fetchProgramTypes();
                this.selectedProgramType = null;
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
                const toast = useToast();
                toast.error(`Error cargando tipos de programa.`);
            }
        },
        selectProgramTypeById(id) {
            const programType = this.programTypes.find(programType => programType.id === id);
            if (programType) {
                this.selectedProgramType = programType;
            } else {
                this.selectedProgramType = null;
            }
        },
        selectProgramType(programType) {
            this.selectedProgramType = programType;
            this.$router.push(`/programtypes/${programType.id}`);
        },
        addProgramType() {
            this.selectedProgramType = {};
            this.isAdding = true;
            this.isEditing = false;
            this.showModal = false;
        },
        editProgramType() {
            if (this.selectedProgramType) {
                this.isEditing = true;
                this.isAdding = false;
            }
        },
        cancelEdit() {
            this.fetchProgramTypes();
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
                toast.error(`Error al borrar el tipo de programa ${this.selectedProgramType.nombre}.`);
            } finally {
                this.fetchProgramTypes();
            }
        },

        showDeleteModal() {
            this.showModal = true
        },

        async saveProgramType(programType) {
            if (this.isEditing) {
                await axios.put(`/api/tiposprogramas/${programType.id}`, programType);
            } else if (this.isAdding) {
                await axios.post('/api/tiposprogramas', programType);
            }
            this.isEditing = false;
            this.isAdding = false;
            this.fetchProgramTypes();
        },


        async handleSave(programType) {
            const toast = useToast();
            try {
                if (this.isEditing) {
                    await axios.put('/api/tipoprogramas', programType);
                    toast.success(`El tipo de programa ${programType.nombre} se ha actualizado`);
                } else
                    if (this.isAdding) {
                        await axios.post('/api/tipoprogramas', programType);
                        toast.success(`El tipo de programa ${programType.nombre} se ha creado`);
                    }
                this.isEditing = false;
                this.isAdding = false;
                this.fetchProgramTypes();
            } catch (error) {
                toast.error(`Error al guardar el tipo de programa ${programType.nombre}`);
            }
        },

        async handleProgramTypeSaved(updatedProgramType) {
            const toast = useToast();
            try {
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
                toast.error(`Error updating program type with id ${updatedProgramType.id}.`);
            } finally {
                window.location.reload();
            }
        },

        // handleClickOutside(event) {
        //     const table = this.$refs.programTypeTable.$el;
        //     if (!table.contains(event.target)) {
        //         console.log('Evento Click fuera de la tabla');
        //         this.selectedProgramType = null;
        //         //this.$router.push('/programtypes');
        //     } else {
        //         console.log('Evento Click en la tabla');
        //     }
        // }
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
