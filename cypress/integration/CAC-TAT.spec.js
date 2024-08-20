/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function(){
      cy.visit('./src/index.html') 
   })
    it('verifica o título da aplicação', function() {
       cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
      // cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
      const longTEst = 'LOREMINASPIRJKAHSDIOUHEASFUHASDHUIASHDASDASDASDASDASDASDASDE'
      cy.get('#firstName').type('Gustavo')
      cy.get('#lastName').type('Caixeta')
      cy.get('#email').type('gustavo.caixeta42@gmail.com')
      cy.get('#phone').type('61982177518')
      cy.get('#open-text-area').type(longTEst, {delay: 0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
   })

   it('exibe mensagem de erro ao submeter o formulario com email errado', function (){
      const longTEst = 'LOREMINASPIRJKAHSDIOUHEASFUHASDHUIASHDASDASDASDASDASDASDASDE'
      cy.get('#firstName').type('Gustavo')
      cy.get('#lastName').type('Caixeta')
      cy.get('#email').type('gustavo.caixeta42@gmail,com')
      cy.get('#phone').type('61982177518')
      cy.get('#open-text-area').type(longTEst, {delay: 0})
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
   })

   it('campo telefone continua vazio quando preenchemos com valor não-numerico', function(){
      cy.get('#phone').type('aushduiahsd').should('have.value', '')
   })
   it('exibe mensagem de erro quando o telefone se torna obrigatório mas está vazio', function(){
      cy.get('#firstName').type('Gustavo')
      cy.get('#lastName').type('Caixeta')
      cy.get('#email').type('gustavo.caixeta42@gmail,com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('teste', {delay: 0})
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
   })

   it('envia o formulario com sucesso usando comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
   })
   it('seleciona o produto Youtube por texto', function(){
      cy.get('#product').select('YouTube').should('have.value', 'youtube')

      // cy.get('.success').should('be.visible')
   })
   it('seleciona o produto Mentoria por value', function(){
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')

      // cy.get('.success').should('be.visible')
   })
   it('seleciona o produto BLoco por index', function(){
      cy.get('#product').select(1).should('have.value', 'blog')
   })

   it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
   })
   it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]').should('have.length', 3).each(function($radio){
         cy.wrap($radio).check()
         cy.wrap($radio).should('be.checked')
      })
   })
   it('marca mais de um checkbox', function(){
      cy.get('input[type="checkbox"]')
      .check()
      .last().uncheck().should('not.be.checked')
   })
   it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
         expect($input[0].files[0].name).to.equal('example.json')
      })
   })
   it('seleciona um arquivo da pasta fixtures simulando drag and drop', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
         expect($input[0].files[0].name).to.equal('example.json')
      })
   })
   it('seleciona um arquivo da pasta fixtures uitilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture("example.json").as('sampleFile')
      cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
         expect($input[0].files[0].name).to.equal('example.json')
      })
   })
   it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
   })
  })
  