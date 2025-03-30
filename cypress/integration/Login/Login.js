const { Given, When, Then, And, But } = require("cypress-cucumber-preprocessor/steps");
const NavBarActions = require("../../../PageObjects/PageActions/NavBarActions");

const url = 'https://portfoliosai.link/sydneykart/';

let navBarAction = new NavBarActions();
// Simple global handler for uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false prevents Cypress from failing the test when
  // uncaught exceptions occur in the application code
  return false;
});

// Background steps
Given('I have opened my web browser', () => {
  cy.log('Web browser is open by default in Cypress');
});

Given('my internet connection is active', () => {
  cy.log('Internet connection is assumed to be active');
});

Given('I open Home Page', { timeout: 10000 }, async () => {
  await cy.visit(url, { 
    timeout: 10000,
    failOnStatusCode: false, // Necessary for SPA, React Application
  })
});

// Scenario: Opening the Ecommerce Home Page

Then('I see "SydneyKart" in the title', async() => {
  await navBarAction.verifyLogo()
});

Then('the search field is visible', async() => {
  await cy.get('#search_field').should("exist");
});

Then('the home page is visible', async() => {
  await cy.get('#search_field').should("exist");
});
