import { createRouter, createWebHistory } from 'vue-router'
import ProgramList from '../views/ProgramList.vue' // Importa el nuevo componente
import ProgramTypeView from '../views/ProgramTypeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/programs', // Nueva ruta
      name: 'programs',
      component: ProgramList
    },
    {
      path: '/programtypes',
      name: 'programtypes',
      component: ProgramTypeView
    }
  ]
})

export default router
