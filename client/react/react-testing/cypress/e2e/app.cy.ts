/// <reference types="cypress" />

describe('AppComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should text a name and toggle a visibility of it', () => {
    const name = 'My name is Cypress';
    cy.get('input[type=text]').type(name);
    cy.get('button').click();
    cy.get('p').should('have.text', name);
  });
});
