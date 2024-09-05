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
    cy.get('input[type="text"][placeholder="Nombre"]').type('Nuevo Programa')
    cy.get('input[type="text"][placeholder="Descripción"]').type('Descripción del nuevo programa')
    cy.get('input[type="text"][placeholder="Clasificación"]').type('Clasificación A')
    cy.get('input[type="text"][placeholder="Canal"]').type('Canal XYZ')
    cy.get('input[type="datetime-local"][placeholder="Fecha Inicio"]').type('2024-01-01T00:00')
    cy.get('input[type="datetime-local"][placeholder="Fecha Fin"]').type('2024-12-31T23:59')

    // Simula la selección de días y tipo de programa
    cy.get('input[type="checkbox"]').check(['Lunes', 'Martes'])
    cy.get('select').select('Tipo1') // Cambia 'Tipo1' por un valor válido

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
    cy.get('input[type="text"][placeholder="Nombre"]').clear().type('Programa Editado')

    // Guarda los cambios
    cy.get('.save-button').click()

    // Verifica que el programa modificado aparece en la tabla con los cambios
    cy.get('table tbody').should('contain', 'Programa Editado')
  })

  // Puedes agregar más pruebas para casos adicionales, como cancelación o eliminación
})
  
}) })

