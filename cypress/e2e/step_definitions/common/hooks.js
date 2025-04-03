import { Before, After, Given } from "@badeball/cypress-cucumber-preprocessor";

// Define base URL
const url = Cypress.env('BASE_URL') || 'https://portfoliosai.link/sydneykart';

// Import page objects with ES module syntax
import NavBarActions from '../../../support/PageObjects/PageActions/NavBarActions';
import SearchPageActions from '../../../support/PageObjects/PageActions/SearchPageActions';
import PaginationElementActions from '../../../support/PageObjects/PageActions/PaginationElementActions';
import LoginPageActions from '../../../support/PageObjects/PageActions/LoginPageActions';
import CartPageActions from '../../../support/PageObjects/PageActions/CartPageActions';
import ShippingPageActions from '../../../support/PageObjects/PageActions/ShippingPageActions';
import MyProfileActions from '../../../support/PageObjects/PageActions/MyProfilePageActions';
import PaymentPageActions from '../../../support/PageObjects/PageActions/PaymentPageActions';
import OrdersPageActions from '../../../support/PageObjects/PageActions/OrdersPageActions';
import InvoicePageActions from '../../../support/PageObjects/PageActions/InvoicePageActions';

// Initialize page objects for this context
// Use Cypress.env to share between tests instead of global
Before(function() {
  // Create page object instances
  Cypress.env('navBarActions', new NavBarActions());
  Cypress.env('searchPageActions', new SearchPageActions());
  Cypress.env('paginationElementActions', new PaginationElementActions());
  Cypress.env('loginPageActions', new LoginPageActions());
  Cypress.env('cartPageActions', new CartPageActions());
  Cypress.env('shippingPageActions', new ShippingPageActions());
  Cypress.env('myProfileActions', new MyProfileActions());
  Cypress.env('paymentPageActions', new PaymentPageActions());
  Cypress.env('ordersPageActions', new OrdersPageActions());
  Cypress.env('invoicePageActions', new InvoicePageActions());
});


export function getPageObject(name) {
  return Cypress.env(name);
}

// Before each scenario hook with updated syntax for Cypress 14
Before(function() {
  cy.log('HOOK: Before each scenario executed');
  
  // Handle uncaught exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
});

// After each scenario
After(function() {
  cy.log('HOOK: After each scenario executed');
  
  // Clear caches to maintain test isolation
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
  
  // Reset window size to default
  cy.viewport('macbook-15');
});

// Tag-specific hooks with updated syntax
Before({ tags: "@smoke" }, function() {
  cy.log('HOOK: Smoke test detected');
});

Before({ tags: "@regression" }, function() {
  cy.log('HOOK: Regression test detected');
  // Disable screenshots for regression tests to improve performance
  Cypress.config('screenshotOnRunFailure', false);
});

// Combined tag example
Before({ tags: "@smoke and @critical" }, function() {
  cy.log('HOOK: Critical smoke test detected');
});

// OR tag example
Before({ tags: "@mobile or @tablet" }, function() {
  cy.log('HOOK: Mobile or tablet test detected');
  cy.viewport('iphone-x');
});

// Using pickle data (enhanced for Cypress 14)
Before(function ({ pickle, gherkinDocument, testCaseStartedId }) {
  const scenarioName = pickle.name;
  cy.log(`Running scenario: ${scenarioName}`);
  
  // Log tags for better debugging
  if (pickle.tags && pickle.tags.length > 0) {
    const tags = pickle.tags.map(tag => tag.name).join(', ');
    cy.log(`Scenario tags: ${tags}`);
  }
  
  // Dynamically set up based on scenario content
  if (scenarioName.toLowerCase().includes("payment")) {
    cy.log("Payment-related test detected - setting up payment interceptors");
    cy.intercept('POST', '**/api/payments*').as('paymentRequest');
  }
  
  // You can also check specific steps within the scenario
  pickle.steps.forEach(step => {
    if (step.text.includes("cart")) {
      cy.log("Cart-related step detected");
      cy.intercept('POST', '**/api/cart*').as('cartRequest');
    }
  });
});