const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { getPageObject } = require("../common/hooks");


When('I click on the login button', function() {
  cy.log('Clicking login button');
  getPageObject('navBarActions').clickLogin();
});

When('I enter {string} in the email field', function(email) {
  cy.log(`Entering email: ${email || '[empty]'}`);
  getPageObject('loginPageActions').formLoaded();
  getPageObject('loginPageActions').enterEmail(email);
});

When('I enter {string} in the password field', function(password) {
  cy.log(`Entering password: ${password ? '*******' : '[empty]'}`);
  getPageObject('loginPageActions').enterPassword(password);
});

When('I click the submit button', function() {
  cy.log('Clicking submit button');
  getPageObject('loginPageActions').clickLogin();
});

// Verification steps
Then('I should see message {string}', function(message) {
  cy.log(`Verifying message: "${message}"`);
  getPageObject('loginPageActions').getMessage(message);
});

Then('the system should {string}', function(redirect_action) {
  cy.log(`Verifying redirect action: ${redirect_action}`);
  getPageObject('loginPageActions').verifyRedirectAction(redirect_action);
});

Then('the user status should be {string}', function(status) {
  cy.log(`Verifying user status: ${status}`);
  getPageObject('navBarActions').verifyLoginStatus(status);
});