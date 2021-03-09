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

  it('Should be able to fill out the form and the information should be reflected in the input fields', () => {
    cy.get('form').get('input[name=title]').type('hello')
      .should('have.value', 'hello')
      .get('form').get('input[name=urlToShorten]').type('something.jpg')
      .should('have.value', 'something.jpg')
  })

  it('Should be able to create a new post and have that information display on page', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        "long_url": "https://cdn.mos.cms.futurecdn.net/otjbibjaAbiifyN9uVaZyL.jpg",
        "title": "kitty number 3",
        "id": 3,
        "short_url": "http://localhost:3001/useshorturl/3"
      }
    })
    cy.get('form').get('input[name=title]').type('kitty number 3')
      .get('form').get('input[name=urlToShorten]').type('https://cdn.mos.cms.futurecdn.net/otjbibjaAbiifyN9uVaZyL.jpg')
      .get('button').click()
  })

  it('Should display an error message if the server gives a bad response', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500,
      body: 'something happened!'
    })
    cy.get('form').get('input[name=title]').type('kitty number 3')
      .get('form').get('input[name=urlToShorten]').type('https://cdn.mos.cms.futurecdn.net/otjbibjaAbiifyN9uVaZyL.jpg')
      .get('button').click()
      .get('.error').should('have.text', 'Something went wrong. Please refresh the page and try again.')
  })

  it('Should not be able to submit form with missing information', () => {
    cy.get('form').get('input[name=title]').type('kitty number 3')
      .get('button').click()
      .get('.error').should('have.text', 'Both fields must be filled out before submitting the form. Please try again.')
  })
})
