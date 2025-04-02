const shippingPageElements = require("../PageElements/ShippingPageElements.json")
const { faker } = require('@faker-js/faker');


class ShippingPageActions {

    generateShippingData() {
        return {
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            phone: faker.phone.number('##########'), // 10 digit phone number
            postalCode: faker.location.zipCode('#####'),
            country: 'Andorra' // Using a fixed country as dropdown options are limited
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
            
            // Click continue button
            cy.get(shippingPageElements.shipping_continue_button)
                .should('be.visible')
                .click();
            cy.log('Clicked continue button');
            
            // Verify redirection to payment method page
            cy.url().should('include', '/payment_method');
            cy.log('Successfully submitted shipping details');
        } catch (e) {
            cy.log(`Error entering shipping details: ${e.message}`);
            throw new Error(`Failed to enter shipping details. Original error: ${e.message}`);
        }
        
        return this;
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

}

module.exports = ShippingPageActions;