Feature: SydneyKart Order Confirmation
  As a customer
  I want to receive confirmation of my order
  So that I can be assured my purchase was successful and track my delivery

  Background:
    Given I have opened my web browser
    And my internet connection is active
    And I open Home Page

  @order @smoke
  Scenario: View order confirmation after successful purchase
    Given I am logged in as a registered user
    And I have added "Wireless Headphones" to my cart
    And I have completed the checkout process
    Then I should be redirected to the shipping details page

    When I enter my shipping details    
    And I click continue to payment
    Then I should be redirected to the payment selection page

    When I select Cash Payment as payment method
    And I click continue to confirm payment
    Then I should be redirected to my orders page
    
    When I navigate to my most recent order
    And I click on it
    Then I should be redirected to the order detail page

    When I click Print Invoice
    Then I should be redirected to the order invoice page
    
    When I click "Download Invoice"
    Then I should see the invoice PDF with my Order ID downloaded 

  
  @order @stripe @smoke
  Scenario: Complete checkout with card payment through Stripe
    Given I am logged in as a registered user
    And I have added "Wireless Headphones" to my cart
    And I have completed the checkout process
    Then I should be redirected to the shipping details page

    When I enter my shipping details    
    And I click continue to payment
    Then I should be redirected to the payment selection page

    When I select Card Payment as payment method
    And I click continue to confirm payment
    Then I should be redirected to the Stripe payment page
    
    # Since we can't automate Stripe payment page, we stop the test here
    # and verify that the redirection to Stripe was successful
    Then I should see the Stripe payment form