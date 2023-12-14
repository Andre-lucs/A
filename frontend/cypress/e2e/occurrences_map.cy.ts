describe('Exibições de elementos com interação do mapa', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/mapa'); 
      })

    it('exibir card de informações de uma ocorrência', () => {

        cy.get('#map').find('.leaflet-marker-icon').first().click({force:true});
        cy.get('#cy-occurrence-card').should('exist')
        cy.get('#cy-card-btn').click();
        cy.get('#cy-occurrence-card').should('be.hidden');
    })
})