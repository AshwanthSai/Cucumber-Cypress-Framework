const {Given} = require("@badeball/cypress-cucumber-preprocessor");
import { getPageObject } from "./hooks";

// Define base URL - get from environment or use default
const url = Cypress.env('BASE_URL') || 'https://portfoliosai.link/sydneykart';

Given('I have opened my web browser', function() {
  cy.log('Web browser is open by default in Cypress');
});

Given('my internet connection is active', function() {
  cy.log('Internet connection is assumed to be active');
});

Given('I open Home Page', function() {
  cy.log('Opening home page');
  // Setup network interceptions if needed
  cy.intercept('GET', '**/login*').as('loginPageLoad');
  
  // Visit the base URL
  cy.visit(url, { 
    timeout: 10000,
    failOnStatusCode: false,
  });

  cy.get('body').should('be.visible');
});

Given('I am logged in as a registered user', function() {
  cy.log('Logging in as registered user');
  getPageObject('navBarActions').clickLogin();
  getPageObject('loginPageActions').loginAsRegisteredUser();
});