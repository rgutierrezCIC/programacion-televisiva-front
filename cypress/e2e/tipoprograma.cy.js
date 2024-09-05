describe('Creación de un Tipo de Programa', () => {
  it('Debería poder crear un nuevo tipo de programa', () => {
    // Visitar la página de tipos de programas
    cy.visit('/programtypes');
    
    // Hacer clic en el botón de creación
    cy.get('.create-button').click();

    // Asegurarse de que el formulario está visible
    cy.get('form').should('be.visible');

    // Llenar el formulario con datos de ejemplo
    cy.get('input#nombre').type('Nuevo Tipo de Programa');
    cy.get('input#descripcion').type('Descripción del nuevo tipo de programa');

    // Guardar el nuevo tipo de programa
    cy.get('.save-button').click();

    // Verificar que el tipo de programa ha sido creado y está en la tabla
    cy.get('table tbody').should('contain', 'Nuevo Tipo de Programa');
  })
})
  describe('Eliminación de un Tipo de Programa', () => {
    it('Debería poder eliminar un tipo de programa existente', () => {
      // Visitar la página de tipos de programas
      cy.visit('/programtypes');
  // Seleccionar el primer programa de la lista
  cy.get('table tbody tr').first().click();

  // Hacer clic en el botón eliminar
  cy.get('.delete-button').click();


  // Confirmar la eliminación en el modal
  cy.get('.modal-content button').contains('Sí').click();

  // Verificar que el programa ha sido eliminado de la tabla
  cy.get('table tbody').should('not.contain', 'Tipo de Programa Eliminado');
    })
  })
    describe('Modificación de un Tipo de Programa', () => {
      it('Debería poder modificar un tipo de programa existente', () => {
        // Visitar la página de tipos de programas
        cy.visit('/programtypes');
    
        // Seleccionar el primer programa de la lista
        cy.get('table tbody tr').first().click();
    
        // Hacer clic en el botón editar
        cy.get('.edit-button').click();
    
     
    
        // Modificar los campos del formulario
        cy.get('input#nombre').clear().type('Tipo de Programa Modificado');
        cy.get('input#descripcion').clear().type('Descripción modificada del tipo de programa');
    
        // Guardar los cambios
        cy.get('.save-button').click();
    
        // Verificar que los cambios se reflejan en la tabla
        cy.get('table tbody').should('contain', 'Tipo de Programa Modificado');
      })
      });


  
