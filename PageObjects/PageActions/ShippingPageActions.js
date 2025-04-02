const shippingPageElements = require("../PageElements/ShippingPageElements.json")
const { faker } = require('@faker-js/faker');


class ShippingPageActions {

    generateShippingData() {
        return {
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            phone: faker.phone.number('##########'), // 10 digit phone number
            postalCode: faker.location.zipCode('#####'),
            country: 'Barbados' // Using a fixed country as dropdown options are limited
        };
    }
    
    enterShippingData() {
        cy.log('Entering shipping details');

        try {
            const data = this.generateShippingData();
           // Enter address
            cy.get(shippingPageElements.shipping_address_field)
                .should('be.visible')
                .clear()
                .type(data.address);
            cy.log(`Entered shipping address: ${data.address}`);
            
            // Enter city
            cy.get(shippingPageElements.shipping_city_field)
                .should('be.visible')
                .clear()
                .type(data.city);
            cy.log(`Entered city: ${data.city}`);
            
            // Enter phone
            cy.get(shippingPageElements.shipping_phone_field)
                .should('be.visible')
                .clear()
                .type(data.phone);
            cy.log(`Entered phone number: ${data.phone}`);
            
            // Enter postal code
            cy.get(shippingPageElements.shipping_postal_code_field)
                .should('be.visible')
                .clear()
                .type(data.postalCode);
            cy.log(`Entered postal code: ${data.postalCode}`);
            
            // Select country
            cy.get(shippingPageElements.shipping_country_field)
                .should('be.visible')
                .select(data.country);
            cy.log(`Selected country: ${data.country}`);

            cy.get(shippingPageElements.shipping_continue_button)
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .click();
        } catch (e) {
            cy.log(`Error entering shipping details: ${e.message}`);
            throw new Error(`Failed to enter shipping details. Original error: ${e.message}`);
        }
        
        return this;
    }

    verifyPaymentPage() {
        cy.log('Verifying payment method page is loaded');
        try {
            // Verify the URL is the payment method page
            cy.url({ timeout: 10000 })
                .should('eq', 'https://portfoliosai.link/sydneykart/payment_method');
            
            cy.log('Successfully verified payment method page URL');
            
            // Additional verification that key payment page elements exist
            cy.get('body').contains('Payment Method')
                .should('exist')
                .and('be.visible');
                
            cy.log('Successfully verified payment method page content');
        } catch (e) {
            cy.log(`Error verifying payment method page: ${e.message}`);
            throw new Error(`Failed to verify payment method page. Original error: ${e.message}`);
        }
        
        return this;
    }

    clickContinuetoPayment(){
        cy.log('Moving to Payment');
        try {
            cy.get(shippingPageElements.moveToCheckout)
                .should('exist')
                .should('be.visible')
                .should('not.be.disabled')
                .click();
                
            // Verify we've moved to the next step (payment method)
            cy.url().should('include', '/payment');
            cy.log('Successfully submitted shipping form');
        } catch (e) {
            cy.log(`Error submitting shipping form: ${e.message}`);
            throw new Error(`Failed to submit shipping form. Original error: ${e.message}`);
        }
        return this;;
    }

    verifyShippingPage() {
        cy.log('Verifying shipping page is loaded');
        try {
            // Verify the URL is the shipping page
            cy.url({ timeout: 30000 }).should('include', '/shipping');
        

            // Additional verification that key shipping page elements exist
            cy.get(shippingPageElements.shipping_form)
                .should('exist')
                .and('be.visible');
                
            cy.get(shippingPageElements.shipping_address_field)
                .should('exist')
                .and('be.visible');
                
            cy.log('Successfully verified shipping page');
        } catch (e) {
            cy.log(`Error verifying shipping page: ${e.message}`);
            throw new Error(`Failed to verify shipping page. Original error: ${e.message}`);
        }
        
        return this;
    }

    selectCardPayment() {
        cy.log('Selecting card payment method');
        try {
            // First check if we're on the payment method page
            cy.url().should('include', '/payment_method');
            
            cy.get(shippingPageElements.card_payment_radio)  
                .should('exist')
                .click();
                
        } catch (e) {
            cy.log(`Error selecting card payment: ${e.message}`);
            throw new Error(`Failed to select card payment. Original error: ${e.message}`);
        }
        return this;
    }

    selectCashPayment() {
        cy.log('Selecting card payment method');
        try {
            // First check if we're on the payment method page
            cy.url().should('include', '/payment_method');
            
            cy.get(shippingPageElements.cash_payment_radio)  
                .should('exist')
                .click();
                
        } catch (e) {
            cy.log(`Error selecting card payment: ${e.message}`);
            throw new Error(`Failed to select card payment. Original error: ${e.message}`);
        }
        return this;
    }

}

module.exports = ShippingPageActions;