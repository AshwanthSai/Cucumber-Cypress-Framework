const { Before, After } = require("cypress-cucumber-preprocessor/steps");

// Define base URL
const url = Cypress.env('BASE_URL') || 'https://portfoliosai.link/sydneykart';

// Background steps available for all .feature files
const NavBarActions = require('../../../PageObjects/PageActions/NavBarActions');
const SearchPageActions = require('../../../PageObjects/PageActions/SearchPageActions');
const PaginationElementActions = require('../../../PageObjects/PageActions/PaginationElementActions');
const LoginPageActions = require('../../../PageObjects/PageActions/LoginPageActions');
const CartPageActions = require('../../../PageObjects/PageActions/CartPageActions');
const ShippingPageActions = require("../../../PageObjects/PageActions/ShippingPageActions");
const MyProfileActions = require("../../../PageObjects/PageActions/MyProfilePageActions");


// Create instances immediately
global.navBarActions = new NavBarActions();
global.searchPageActions = new SearchPageActions();
global.paginationElementActions = new PaginationElementActions();
global.loginPageActions = new LoginPageActions();
global.cartPageActions = new CartPageActions();
global.shippingPageActions = new ShippingPageActions();
global.myProfileActions = new MyProfileActions();

// Common Methods for all .feature files

Given ('I am logged in as a registered user', (keyword) => {
  navBarActions.clickLogin()
  loginPageActions.loginAsRegisteredUser();
});

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


// For one-time teardown
after(() => {
  console.log('HOOK: after() executed for feature');
  cy.log('HOOK: after() executed for feature');
});

// Before each scenario hook
Before(() => {
  console.log('HOOK: Before each scenario executed');
  cy.log('HOOK: Before each scenario executed');
  
  // Handle uncaught exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
});

// After each scenario
After(() => {
  console.log('HOOK: After each scenario executed');
  cy.log('HOOK: After each scenario executed');
  
  // Clear caches to maintain test isolation
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
    win.localStorage.clear();
  });
  
  // Clear any test-specific interceptors
  cy.intercept('**', (req) => {
    delete req.alias;
  });
  
  // Reset window size to default
  cy.viewport('macbook-15');
  console.log('HOOK: After each scenario executed');
  cy.log('HOOK: After each scenario executed');
});

// Tag-specific hooks
Before({ tags: '@smoke' }, () => {
  console.log('HOOK: Smoke test detected');
  cy.log('HOOK: Smoke test detected');
});

Before({ tags: '@regression' }, () => {
  console.log('HOOK: Regression test detected');
  cy.log('HOOK: Regression test detected');
  // Disable screenshots and videos for regression tests to improve performance
  Cypress.config('screenshotOnRunFailure', false);
  cy.log('HOOK: Disabled screenshots and videos for regression tests');
});


