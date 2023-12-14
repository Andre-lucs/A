// cypress/integration/create_occurrence_spec.js

 describe('Criação de Ocorrência', async () => {

     // Deve adicionar uma nova ocorrência
     it('Deve criar uma nova ocorrência', () => {
       cy.visit('http://localhost:5173/criar-ocorrencia');
  
       cy.get('#title').type('Nova Ocorrência');
       cy.get('#date-time').type('2023-11-30T12:00');
       cy.get('#type').select('Tentativa de homicídio');
       cy.get('#description').type('Descrição da nova ocorrência');
  
       cy.get('#form').submit();
  
       cy.url().should('eq', 'http://localhost:5173/');
       cy.get('#cy-dashboard-link').should('contain', 'Dashboard'); 
       cy.contains('Nova Ocorrência').should('exist');
     });
 });

describe('Atualização de ocorrência', () => {

  //Deve atualizar uma ocorrência
  it('Deve atualizar uma ocorrência', () => {
    
    // title: 'Três cara em uma moto',
    // type: 'Tentativa de homicídio',
    // date: 2023-12-14T01:22:00.000Z,
    // description: '...',
    // location: { type: 'Point', coordinates: [ -38.449, -6.7298 ] },
    // _id: new ObjectId('657a56a47c5aed2b040771fa'),

    cy.visit('http://localhost:5173/ocorrencia/657a5970d4bcc6a2bf0f98d1')

    cy.get('#cy-update-btn').click();

    cy.url().should('eq', 'http://localhost:5173/atualizar-ocorrencia/657a5970d4bcc6a2bf0f98d1');

    cy.get('#date-time').type('2023-05-21T12:00');
    cy.get("#description").clear();
    cy.get('#description').type('Descrição da nova ocorrência');

    cy.get('#form').submit();
  
    cy.url().should('eq', 'http://localhost:5173/');

    cy.visit('http://localhost:5173/ocorrencia/657a5970d4bcc6a2bf0f98d1');

    cy.get('#cy-occurrence-description').should('contain.text', 'Descrição da nova ocorrência');
    cy.get('#cy-occurrence-date').should('contain.text', '21/05/2023');
    cy.get('#cy-occurrence-hour').should('contain.text', '12:00');
  })
})