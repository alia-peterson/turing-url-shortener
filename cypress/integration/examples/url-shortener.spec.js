context('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'stored-urls'}, {statusCode: 200, body: 'nice'})
      .visit('http://localhost:3000/')
  })

  it('Should be able to view the page title and existing shortened URLs', () => {
    cy.get('.url').eq(0).find('h3').should('have.text', 'kitty number 1')
      .get('.url').eq(0).find('a').should('have.text', 'http://localhost:3001/useshorturl/1')
      .get('.url').eq(0).find('p').should('have.text', 'https://www.rd.com/wp-content/uploads/2019/05/American-shorthair-cat-scaled.jpg')

    cy.get('.url').eq(1).find('h3').should('have.text', 'kitty number 2')
      .get('.url').eq(1).find('a').should('have.text', 'http://localhost:3001/useshorturl/2')
      .get('.url').eq(1).find('p').should('have.text', 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9')
  })

  it('Should be able to view the form with the proper inputs', () => {
    cy.get('form').get('input[name=title]')
      .get('form').get('input[name=urlToShorten]')
  })
})
