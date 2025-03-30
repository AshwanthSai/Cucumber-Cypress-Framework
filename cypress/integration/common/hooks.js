const { Before, After } = require("cypress-cucumber-preprocessor/steps");

// For one-time setup
before(() => {
  console.log('HOOK: before() executed for feature');
  cy.log('HOOK: before() executed for feature');
});

// For one-time teardown
after(() => {
  console.log('HOOK: after() executed for feature');
  cy.log('HOOK: after() executed for feature');
});

// Before each scenario
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
});

// Tag-specific hooks
Before({ tags: '@smoke' }, () => {
  console.log('HOOK: Smoke test detected');
  cy.log('HOOK: Smoke test detected');
});

Before({ tags: '@regression' }, () => {
  console.log('HOOK: Regression test detected');
  cy.log('HOOK: Regression test detected');
});


// Combining tags and order in the same object
Before({ tags: '@smoke', order: 10 }, () => {
  console.log('HOOK: Smoke test detected (Priority 10)');
  cy.log('HOOK: Smoke test detected (Priority 10)');
});

After({ tags: '@regression', order: 5 }, () => {
  console.log('HOOK: Regression test cleanup (Priority 5)');
  cy.log('HOOK: Regression test cleanup (Priority 5)');
});