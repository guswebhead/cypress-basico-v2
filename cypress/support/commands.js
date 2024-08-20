Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Gustavo')
    cy.get('#lastName').type('Caixeta')
    cy.get('#email').type('gustavo.caixeta42@gmail.com')
    cy.get('#phone').type('61982177518')
    cy.get('#open-text-area').type('longTEst', {delay: 0})
    cy.get('button[type="submit"]').click()
})