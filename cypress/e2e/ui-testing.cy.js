// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
import '@4tw/cypress-drag-drop'
require('@4tw/cypress-drag-drop')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

it('TC01- Scenario A - Fill up a new registration form', () => {
  //Navigatew to the new registration forrm
  cy.visit('/elements')
  cy.url().should('contain', '/elements')
  cy.contains('Web Tables').click()
  cy.url().should('contain', '/webtables')
  cy.get('#addNewRecordButton').click()
  cy.get('.modal-header').should('be.visible')

  //Fiil in form
  cy.get('#firstName').type('Alden')
  cy.get('#lastName').type('Cantrell')
  cy.get('#userEmail').type('test@test.com')
  cy.get('#age').type('30')
  cy.get('#salary').type('12345')
  cy.get('#department').type('QA')
  cy.get('#submit').click()

  cy.get('#addNewRecordButton').should('be.visible')

  // Verify
  cy.get('.rt-tbody', { timeout: 3000 }).contains('.rt-tr', 'test@test.com')
})

it('TC01- Scenario B - Edit the user detail', () => {
  //Navigate to the web tables
  cy.visit('/elements')
  cy.url().should('contain', '/elements')
  cy.contains('Web Tables').click()
  cy.url().should('contain', '/webtables')

  //Find the row
  cy.get('.rt-tbody').contains('.rt-tr', 'Alden').find('[title="Edit"]').click()

  // Edit form
  cy.get('#firstName').clear().type('Gerimedica')
  cy.get('#lastName').clear().type('BV')
  cy.get('#submit').click()

  // Verify
  cy.get('.rt-tbody').contains('.rt-tr', 'Gerimedica').and('contain', 'BV')
})

it('TC02- Verify broken image', () => {
  //Navigate to the new registration forrm
  cy.visit('/elements')
  cy.wait(2000)
  cy.get(':nth-child(1) > .element-list > .menu-list > #item-6').click()
  cy.wait(2000)
  cy.get('[href="http://the-internet.herokuapp.com/status_codes/500"]').click()
  cy.wait(2000);
  cy.get('p').should('contain','This page returned a 500 status code.')
})

it('TC03 - Verify user can submit form', () => {
  //Navigate to Forms
  cy.visit('/elements')
  cy.url().should('contain', '/elements')
  cy.contains('Elements').click()
  cy.contains('Forms', { timeout: 10000 }).should('be.visible')
  cy.contains('Forms').click()
  cy.contains('ractice Form', { timeout: 10000 }).should('be.visible')
  cy.contains('Practice Form').click()

  //Fill in form
  cy.get('#firstName').type('Gerimedica')
  cy.get('#lastName').type('BV')
  cy.get('#userEmail').type('test@test.com')
  cy.get('#genterWrapper > .col-md-9 > :nth-child(1)').click()
  cy.get('#userNumber').type('0123456789')
  cy.get('.subjects-auto-complete__value-container').type('Cypress Assignment')
  cy.get('label').contains('Reading').click()
  cy.get('#currentAddress').type('Netherlands')

  // Select Picture

  //Select State
  cy.contains('Select State').click()
  cy.contains('NCR', { force: true }).click()
 
  cy.contains('Select City').click({ force: true })
  cy.contains('Delhi' ).click({ force: true })
 
  cy.contains('Submit').click({force:true})
  cy.wait(1000);

  cy.get('.modal-dialog').should('be.visible');
  cy.get('.modal-title').should('contain.text','Thanks for submitting the form' );
  
});

it('TC04 - Verify the progress bar', () => {
  //Navigate to Forrms
  cy.visit('/progress-bar')
  cy.url().should('contain', '/progress-bar')
  cy.contains('Start').click()
  cy.get('.progress-bar', { timeout: 10000 }).should('be.visible')
  cy.get('.progress-bar', { timeout: 10000 }).should(
    `have.attr`,
    `aria-valuenow`,
    '100',
  )
})

it('TC05 - Verify the tooltip', () => {
  //Navigatew to Forrms
  cy.visit('/tool-tips')
  cy.wait(2000)
  cy.contains('Tool Tips').click()
  cy.get('#toolTipButton').trigger('mouseover').invoke('show')
  cy.contains('You hovered over the Button').should('be.visible')
})

it('TC06 - Verify user can drag and drop', () => {
  //Navigate to Dragabble
  cy.visit('/elements')
  cy.url().should('contain', '/elements')
  cy.visit('/droppable')
  cy.url().should('contain', '/droppable')

  cy.get('#draggable').drag('#simpleDropContainer > #droppable', {
    force: true,
  })
  //Verify
  cy.get('#simpleDropContainer > #droppable > p', { timeout: 10000 }).should(
    'have.text',
    'Dropped!',
  )
})
