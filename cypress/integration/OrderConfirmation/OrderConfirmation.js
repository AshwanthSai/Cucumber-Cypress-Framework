const { Given, When, Then, And, Before } = require("cypress-cucumber-preprocessor/steps");


Given ('I have added "Wireless Headphones" to my cart', () => {
  cartPageActions.addHeadphonesToCart();
});

Given ('I have completed the checkout process', () => {
  cartPageActions.clickCart();
});

Then ('I should be redirected to the shipping details page', () => {
  shippingPageActions.verifyShippingPage();
});

When ('I enter my shipping details', () => {
  shippingPageActions.enterShippingData();
});

When ('I click continue to payment', () => {
  shippingPageActions.clickContinuetoPayment();
});

Then ('I should be redirected to the payment selection page', () => {
  shippingPageActions.verifyPaymentPage();
});


When ('I click proceed with payment', () => {
  shippingPageActions.verifyPaymentPage();
});

Then ('I should be redirected to the Stripe payment page', () => {
  shippingPageActions.confirmStripeRedirect();
});

When ('I select Cash Payment as payment method', () => {
  paymentPageActions.selectCashOnDelivery();
});

Then ('I should be redirected to my orders page', () => {
  OrderDetailsPageActions.verifyRedirectToOrderDetailsPage();
});

Then ('I click continue to confirm payment', () => {
  paymentPageActions.confirmPaymentMethod();
});





