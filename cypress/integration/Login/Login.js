const { When, Then } = require("cypress-cucumber-preprocessor/steps");

// Form interaction steps
When('I click on the login button', () => {
  cy.log('Clicking login button');
  navBarActions.clickLogin();
  cy.url().should('include', '/login');
});

When('I enter {string} in the email field', (email) => {
  cy.log(`Entering email: ${email || '[empty]'}`);
  loginPageActions.formLoaded();
  loginPageActions.enterEmail(email);
});

When('I enter {string} in the password field', (password) => {
  cy.log(`Entering password: ${password ? '*******' : '[empty]'}`);
  loginPageActions.enterPassword(password);
});

When('I click the submit button', () => {
  cy.log('Clicking submit button');
  loginPageActions.clickLogin();
});

// Verification steps
Then('I should see message {string}', (message) => {
  cy.log(`Verifying message: "${message}"`);
  loginPageActions.getMessage(message);
});

Then('the system should {string}', (redirect_action) => {
  cy.log(`Verifying redirect action: ${redirect_action}`);
  loginPageActions.verifyRedirectAction(redirect_action);
});

Then('the user status should be {string}', (status) => {
  cy.log(`Verifying user status: ${status}`);
  navBarActions.verifyLoginStatus(status);
});