describe('Exibição do Dashboard', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/'); 
      })


    it('Deve mostrar corretamente os valores dos inshight', () => {

        cy.get('#cy-occurrences-list-preview').should('exist');

        cy.get('#cy-last-7-title').should('exist');
        cy.get('#cy-last-7').should('contain.text', '0');

        cy.get('#cy-last-15-title').should('exist');
        cy.get('#cy-last-15').should('contain.text', '1');

        cy.get('#cy-last-30-title').should('exist');
        cy.get('#cy-last-30').should('contain.text', '1');

        cy.get('#cy-occurrences-amount').should('contain.text', '3')
        
        cy.get('#cy-graphics').should('exist')
    })

})