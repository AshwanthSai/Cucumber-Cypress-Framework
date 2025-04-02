// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('mockStripePayment', () => {
    cy.intercept('POST', 'https://api.stripe.com/v1/payment_intents/*', {
        statusCode: 200,
        body: {
            id: 'mock_payment_intent_id',
            object: 'payment_intent',
            status: 'succeeded',
            client_secret: 'mock_client_secret'
        }
    }).as('stripePaymentIntent');
    
    cy.intercept('POST', 'https://api.stripe.com/v1/payment_methods', {
        statusCode: 200,
        body: {
            id: 'mock_payment_method_id',
            object: 'payment_method',
            type: 'card'
        }
    }).as('stripePaymentMethod');
    
    cy.intercept('POST', '/api/create-payment', {
        statusCode: 200,
        body: {
            success: true,
            orderId: 'ORD12345678',
            redirect: '/order/confirmation'
        }
    }).as('createPayment');
});