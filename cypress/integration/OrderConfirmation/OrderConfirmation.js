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


