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

When('I select Cash Payment as payment method', function() {
  cy.log('Selecting Cash on Delivery payment method');
  getPageObject('paymentPageActions').selectCashOnDelivery();
});

Then('I click continue to confirm payment', function() {
  cy.log('Clicking continue to confirm payment');
  getPageObject('paymentPageActions').confirmPaymentMethod();
});

Then('I should be redirected to the Stripe payment page', function() {
  cy.log('Verifying redirect to Stripe payment page');
  getPageObject('paymentPageActions').confirmStripeRedirect();
});

When('I click proceed with payment', function() {
  cy.log('Clicking proceed with payment');
  getPageObject('shippingPageActions').verifyPaymentPage();
});

Then('I should be redirected to my orders page', function() {
  cy.log('Verifying redirect to orders page');
  getPageObject('ordersPageActions').verifyRedirectToOrderDetailsPage();
});

When('I navigate to my most recent order', function() {
  cy.log('Navigating to my most recent order');
  getPageObject('ordersPageActions').navigateToLastPage();
});

When('I click on it', function() {
  cy.log('Clicking on latest order');
  getPageObject('ordersPageActions').clickLastOrder();
});

When('I click on the first order from the list', function() {
  cy.log('Clicking on first order in the list');
  getPageObject('ordersPageActions').clickFirstOrder();
});

Then('I should be redirected to the order detail page', function() {
  cy.log('Verifying headphone product appears in order');
  
  // Get the headphone product name from environment variables
  const headphoneName = Cypress.env('HEADPHONE_NAME');
  cy.log(`Looking for product: "${headphoneName}"`);
  
  // Verify the product appears in the order
  getPageObject('ordersPageActions').verifyProduct(headphoneName);
});

When('I click Print Invoice', function() {
  cy.log('Clicking on Print Invoice button');
  getPageObject('ordersPageActions').clickInvoiceButton();
});

Then('I should be redirected to the order invoice page', function() {
  cy.log('Verifying invoice page is loaded');
  getPageObject('invoicePageActions').verifyInvoicePage();
});

When('I click "Download Invoice"', function() {
  cy.log('Clicking on Download Invoice button');
  getPageObject('invoicePageActions').downloadInvoicePDF();
});

Then('the invoice should be downloaded to my computer', function() {
  cy.log('This step combined with "downloaded file should match the order number"');
});


When('I select Card Payment as payment method', function() {
  cy.log('Selecting Card Payment method');
  getPageObject('paymentPageActions').selectCardPayment();
});


Then('I should see the Stripe payment form', function() {
  cy.log('Verifying Stripe payment form is visible');
  getPageObject('paymentPageActions').confirmStripeRedirect()
});


Then('I should see the invoice PDF with my Order ID downloaded', function() {
  cy.log('Verifying invoice PDF');
  getPageObject('invoicePageActions').verifyInvoice()
});