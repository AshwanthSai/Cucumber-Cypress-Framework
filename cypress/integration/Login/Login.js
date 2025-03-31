const { Given, When, Then, And, But, Before } = require("cypress-cucumber-preprocessor/steps");

// Form interaction steps
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

// Verification steps
Then('I should see message {string}', (message) => {
  loginPageActions.getMessage(message);
});

Then('the system should {string}', (redirect_action) => {
  loginPageActions.verifyRedirectAction(redirect_action);
});