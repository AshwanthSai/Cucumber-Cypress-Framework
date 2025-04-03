const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { getPageObject } = require("../common/hooks");

Given('I have added "Wireless Headphones" to my cart', function() {
  cy.log('Adding wireless headphones to cart');
  getPageObject('cartPageActions').addHeadphonesToCart();
});

Given('I have completed the checkout process', function() {
  cy.log('Completing checkout process');
  getPageObject('cartPageActions').clickCart();
});

Then('I should be redirected to the shipping details page', function() {
  cy.log('Verifying redirect to shipping page');
  getPageObject('shippingPageActions').verifyShippingPage();
});

When('I enter my shipping details', function() {
  cy.log('Entering shipping details');
  getPageObject('shippingPageActions').enterShippingData();
});

When('I click continue to payment', function() {
  cy.log('Clicking continue to payment');
  getPageObject('shippingPageActions').clickContinuetoPayment();
});

Then('I should be redirected to the payment selection page', function() {
  cy.log('Verifying redirect to payment selection page');
  getPageObject('shippingPageActions').verifyPaymentPage();
});

When('I click proceed with payment', function() {
  cy.log('Clicking proceed with payment');
  getPageObject('shippingPageActions').verifyPaymentPage();
});

Then('I should be redirected to the Stripe payment page', function() {
  cy.log('Verifying redirect to Stripe payment page');
  getPageObject('shippingPageActions').confirmStripeRedirect();
});

When('I select Cash Payment as payment method', function() {
  cy.log('Selecting Cash on Delivery payment method');
  getPageObject('paymentPageActions').selectCashOnDelivery();
});

Then('I should be redirected to my orders page', function() {
  cy.log('Verifying redirect to order details page');
  getPageObject('orderDetailsPageActions').verifyRedirectToOrderDetailsPage();
});

Then('I click continue to confirm payment', function() {
  cy.log('Clicking continue to confirm payment');
  getPageObject('paymentPageActions').confirmPaymentMethod();
});