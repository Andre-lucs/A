describe('Visualização de Ocorrência', () => {

    beforeEach(() => {
      cy.visit('http://localhost:5173/ocorrencia/656e7cdc2418ddba23459a1a'); 
    })

    it('Deve visualizar detalhes de uma ocorrência', () => {

      cy.get("#cy-occurrence-title").should('contain.text', 'Dois caras em uma moto');
      cy.get('#cy-occurrence-type').should('contain.text', 'Assalto a estabelecimento comercial');
      cy.get('#cy-occurrence-date').should('contain.text', '26/11/2023');
      cy.get('#cy-occurrence-description').should('contain.text', '...');
      cy.get('#cy-occurrence-hour').should('contain.text', '22:28');

    });

    it('Deve retornar para página inicial quando clicar no botão de voltar',  () => {
      
     cy.get('#cy-back-btn').click();

     cy.url().should('eq', 'http://localhost:5173/');
     cy.get('#cy-dashboard').should('exist');
    }); 

    it('Deve retornar mensagem ocorrência não encontrada para id inválido', () => {
      cy.visit('http://localhost:5173/ocorrencia/544354356');
      cy.get("#cy-not-found-message").should("exist");
    })

    it("Os valores do campos do formulário deve corresponder às informações da ocorreência", () => {
        cy.get("#cy-update-btn").click()
        cy.url().should('eq', 'http://localhost:5173/atualizar-ocorrencia/656e7cdc2418ddba23459a1a');

        cy.get('#title').should('have.value', 'Dois caras em uma moto');
        cy.get('#date-time').should('have.value', '2023-11-27T01:28')
        cy.get('#type').should('have.value', 'Assalto a estabelecimento comercial')
        cy.get('#description').should('have.value', '...');
    
    })
   
  });