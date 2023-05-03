// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

const user = {
  USERNAME: 'mkhalsa6',
  PASSWORD: 'Garden18$',
}

const book = {
  TITLE: 'Designing Evolvable Web APIs with ASP.NET',
  ISBN: '9781449337711',
}

let userID;
let generatedToken;
it('API Testing - create a user account', () => {
  cy.request({
    method: 'POST',
    url: `https://demoqa.com/Account/v1/User`,
    body: {
      userName: user.USERNAME,
      password: user.PASSWORD,
    },
    failOnStatusCode: false
  }).then(($response) => {
    userID = $response.body.userID;
    expect($response.status).to.eq(201);
  })
})

it('API Testing - generate token', () => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/GenerateToken',
    body: {
      userName: user.USERNAME,
      password: user.PASSWORD,
    },
    failOnStatusCode: false
  }).then(($response) => {
    expect($response.status).to.eq(200)
    expect($response.body.token).to.exist
    expect($response.body.expires).to.exist
    expect($response.body.status).to.eq('Success')
    generatedToken = $response.body.token
  });
})

it('API Testing - Add a book to BookStore', () => {
    //Add a book
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/BookStore/v1/Books',
      headers: {
        Authorization: `Bearer ${generatedToken}`,
      },
      body: {
        userId: `${userID}`,
        collectionOfIsbns: [
          {
            isbn: book.ISBN,
            title: book.TITLE,
            subTitle: '.NET',
            author: 'John Smith',
            publish_date: '2023-05-02T07:55:28.057Z',
            publisher: 'Oxford Publisher',
            pages: 120,
            description: 'Designing Evolvable Web APIs with ASP.NET',
            website: 'www.oxford.press.co.uk',
          },
        ],
      },
      failOnStatusCode: false
    }).then(($response1) => {
      expect($response1.status).to.eq(201)
      cy.log('debug book added', $response1.body)
    })
})

it('API Testing - Get a list of books from BookStore', () => {
    cy.request({
      method: 'GET',
      url: 'https://demoqa.com/BookStore/v1/Books',
      headers: {
        Authorization: `Bearer ${generatedToken}`,
      },
      failOnStatusCode: false
    }).then(($response1) => {
      cy.log($response1.body)
      expect($response1.status).to.eq(200)
    })
})

it('API Testing - Get a books from BookStore using parameter ISBN', () => {
    cy.request({
      method: 'GET',
      url: `https://demoqa.com/BookStore/v1/Book?ISBN=${book.ISBN}`,
      headers: {
        Authorization: `Bearer ${generatedToken}`,
      },
      failOnStatusCode: false
    }).then(($response1) => {
      cy.log($response1.body)
      expect($response1.status).to.eq(200)
    })
})

it('API Testing - Delete books from BookStore using parameter userId', () => {
    cy.request({
      method: 'DELETE',
      url: `https://demoqa.com/BookStore/v1/Books?UserId=${userID}`,
      headers: {
        Authorization: `Bearer ${generatedToken}`,
      },
      failOnStatusCode: false
    }).then(($response1) => {
      cy.log($response1.body)
      expect($response1.status).to.eq(204)
    })
})

it('API Testing - Delete userId', () => {
      cy.request({
        method: 'DELETE',
        url: `https://demoqa.com/Account/v1/User/${userID}`,
        headers: {
          Authorization: `Bearer ${generatedToken}`,
        },
        failOnStatusCode: false
      }).then(($response1) => {
        cy.log($response1.body)
        expect($response1.status).to.eq(204)
      })
})
