const paymentPageElements = require("../PageElements/PaymentPageElements.json")

class PaymentPageActions {
    confirmPaymentMethod() {
        cy.log('Confirming payment method');
        try {
            // Click the continue button
            cy.get(paymentPageElements.confirm_payment_method)
                .should('exist')
                .should('be.visible')
                .should('not.be.disabled')
                .click();
        } catch (e) {
            cy.log(`Error confirming payment method: ${e.message}`);
            throw new Error(`Failed to confirm payment method. Original error: ${e.message}`);
        }
        return this;
    }

    confirmStripeRedirect() {
        cy.log('Verifying redirect to Stripe checkout');
        try {
            // Verify we've been redirected to Stripe checkout
            cy.url({ timeout: 15000 })
                .should('include', 'https://checkout.stripe.com/');
                
            // Additional verification for Stripe checkout page elements
            cy.get('body')
                .should('exist')
                .should('be.visible');
                
            cy.log('Successfully verified redirect to Stripe checkout');
        } catch (e) {
            cy.log(`Error verifying Stripe redirect: ${e.message}`);
            throw new Error(`Failed to verify redirect to Stripe checkout. Original error: ${e.message}`);
        }
        return this;
    }

    selectCashOnDelivery() {
        cy.log('Selecting Cash on Delivery payment option');
        try {
            // Select the COD radio button using the element from JSON
            cy.get(paymentPageElements.cash_payment_radio)
                .should('exist')
                .should('be.visible')
                .check();
                
            // Verify it's selected
            cy.get(paymentPageElements.cash_payment_radio).should('be.checked');
            
            cy.log('Successfully selected Cash on Delivery payment option');
        } catch (e) {
            cy.log(`Error selecting Cash on Delivery option: ${e.message}`);
            throw new Error(`Failed to select Cash on Delivery option. Original error: ${e.message}`);
        }
        return this;
    }
}

module.exports = PaymentPageActions;