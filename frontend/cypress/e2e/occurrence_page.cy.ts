describe('Visualização de Ocorrência', () => {

    beforeEach(() => {
      cy.visit('http://localhost:5173/ocorrencia/657a56a47c5aed2b040771fa'); 
    })

    it('Deve visualizar detalhes de uma ocorrência', () => {

      cy.get("#cy-occurrence-title").should('contain.text', 'Dois caras em uma moto');
      cy.get('#cy-occurrence-type').should('contain.text', 'Assalto a estabelecimento comercial');
      cy.get('#cy-occurrence-description').should('contain.text', 'Descrição da nova ocorrência');
      cy.get('#cy-occurrence-date').should('contain.text', '21/05/2023');
      cy.get('#cy-occurrence-hour').should('contain.text', '12:00');

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
        cy.url().should('eq', 'http://localhost:5173/atualizar-ocorrencia/657a56a47c5aed2b040771fa');

        cy.get('#title').should('have.value', 'Dois caras em uma moto');
        //cy.get('#date-time').should('have.value', '2023-05-21T15:00:00.000Z')
        cy.get('#type').should('have.value', 'Assalto a estabelecimento comercial')
        cy.get('#description').should('have.value', 'Descrição da nova ocorrência');
    
    })
   
  });