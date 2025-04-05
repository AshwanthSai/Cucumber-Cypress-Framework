const paymentPageElements = require("../PageElements/PaymentPageElements.json")

class PaymentPageActions {

    selectCardPayment(){
        cy.log('Selecting Cash on Delivery payment option');
        try {
            // Select the COD radio button using the element from JSON
            cy.get(paymentPageElements.card_payment_radio)
                .should('exist')
                .should('be.visible')
                .click();
                
            // Verify it's selected
            cy.get(paymentPageElements.card_payment_radio).should('be.checked');
            
            cy.log('Successfully selected Cash on Delivery payment option');
        } catch (e) {
            cy.log(`Error selecting Cash on Delivery option: ${e.message}`);
            throw new Error(`Failed to select Cash on Delivery option. Original error: ${e.message}`);
        }
        return this;
    }


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
            // Simply check if URL changes to include Stripe domain
            cy.url({ timeout: 20000 })
                .should('include', 'checkout.stripe.com')
                .then(url => {
                    cy.log(`Successfully redirected to Stripe: ${url}`);
                });
            
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