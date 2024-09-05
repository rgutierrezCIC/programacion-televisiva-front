describe('Program List', () => {
  describe('Program List', () => {

    // Prueba para cargar la página correctamente
    it('Debería cargar la lista de programas', () => {
      cy.visit('http://localhost:5173/Programs')
  
      // Verifica que el título "Programas" esté presente
      cy.get('h1').should('contain', 'Programas')
  
      // Verifica que la tabla contenga un encabezado de nombre
      cy.get('table thead tr th').contains('Nombre')
    })
 // Prueba para crear un nuevo programa
 describe('ProgramDetails Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/Programs') 
  })

  it('Debería poder crear un nuevo programa', () => {
    // Abre el formulario para crear un nuevo programa
    cy.get('.create-button').click()

    // Completa el formulario
    cy.get('input[type="text"]').eq(0).type('Nuevo Programa')
    cy.get('input[type="text"]').eq(1).type('Descripción del nuevo programa')
    cy.get('input[type="text"]').eq(2).type('Clasificación A')
    cy.get('input[type="text"]').eq(3).type('Canal XYZ')

    // Simula la selección de días y tipo de programa
    cy.get('input[type="checkbox"]').check(['Lunes', 'Martes'])
    cy.get('select').select('Documental') 

    // Guarda el nuevo programa
    cy.get('.save-button').click()

    // Verifica que el nuevo programa se ha añadido a la lista
    cy.get('table tbody').should('contain', 'Nuevo Programa')
    cy.get('table tbody').should('contain', 'Descripción del nuevo programa')
  })

  it('Debería poder editar un programa existente', () => {
    // Selecciona el primer programa de la lista
    cy.get('table tbody tr').first().click()
  
    // Abre el formulario de edición
    cy.get('.edit-button').click()
  
    // Cambia el nombre del programa
    cy.get('input[type="text"]').first().clear().type('Programa Editado') // Usamos .first() para obtener el primer input de tipo text
  
    // Guarda los cambios
    cy.get('.save-button').click()
  
    // Verifica que el programa modificado aparece en la tabla con los cambios
    cy.get('table tbody').should('contain', 'Programa Editado')
  })
  it('Debería poder eliminar un programa existente', () => {
    // Almacena la cantidad inicial de programas en la tabla
    cy.get('table tbody tr').then(($rows) => {
      const initialRowCount = $rows.length
  
      // Selecciona el primer programa de la lista
      cy.get('table tbody tr').first().click()
  
      // Abre el modal de confirmación de eliminación
      cy.get('.delete-button').click()
  
      // Verifica que se muestra el modal de confirmación
      cy.get('.modal-content').should('be.visible')
  
      // Confirma la eliminación
      cy.get('.modal-content button').contains('Sí').click()
  
      // Espera a que la tabla se actualice
      cy.wait(2000)
  
      // Verifica que el número de filas se ha reducido en 1
      cy.get('table tbody tr').should('have.length', initialRowCount - 1)
    })
  })
  
  
  
})
  
}) })

