const { Given, When, Then, And, But } = require("cypress-cucumber-preprocessor/steps");
const NavBarActions = require("../../../PageObjects/PageActions/NavBarActions");
const LoginPageActions = require("../../../PageObjects/PageActions/LoginPageActions");

const url = 'https://portfoliosai.link/sydneykart/';

let navBarAction = new NavBarActions();
let loginPageActions = new LoginPageActions();

// Simple global handler for uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Background steps
Given('I have opened my web browser', () => {
  cy.log('Web browser is open by default in Cypress');
});

Given('my internet connection is active', () => {
  cy.log('Internet connection is assumed to be active');
});

Given('I open Home Page', { timeout: 10000 }, () => {
  // Setup network interceptions
  cy.intercept('GET', '**/login*').as('loginPageLoad');
  cy.intercept('POST', '**/login*').as('loginRequest');
  
  cy.visit(url, { 
    timeout: 10000,
    failOnStatusCode: false,
  });
});

// Scenario: User authentication with different credentials
When('I click on the login button', () => {
  navBarAction.clickLogin();
  cy.url().should('include', '/login');
});

When('I enter {string} in the email field', (email) => {
  loginPageActions.formLoaded();
  loginPageActions.enterEmail(email);
});

When('I enter {string} in the password field', (password) => {
  loginPageActions.enterPassword(password);
});

When('I click the submit button', () => {
  loginPageActions.clickLogin();
});

Then('I should see message {string}', (message) => {
  loginPageActions.getMessage(message);
});

Then('the system should {string}', (redirect_action) => {
  loginPageActions.verifyRedirectAction(redirect_action);
});