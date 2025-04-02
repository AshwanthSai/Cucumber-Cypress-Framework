const navBarElements = require("../PageElements/NavBarElements.json")
const homePageElements = require("../PageElements/HomePageElements.json")
const loginPageElements = require("../PageElements/LoginPageElements.json")
const cartPageElements = require("../PageElements/CartPageElements.json")

const HEADPHONE_PRODUCT_LINK = Cypress.env('HEADPHONE_PRODUCT_LINK') || 'https://portfoliosai.link/sydneykart/product/wireless-headphones';


class CartPageActions {
    addHeadphonesToCart() {
        cy.log('Adding headphones to cart with quantity adjustments');
        try {
            cy.visit(HEADPHONE_PRODUCT_LINK);
            cy.log('Visited headphone product page');

            // Verify the element exists and is visible
            cy.get(cartPageElements.increase_quantity_button)
              .should("exist")
              .and("be.visible");
            
            cy.log('Increasing quantity 3 times');
            // Click multiple times with a slight delay between clicks
            cy.get(cartPageElements.increase_quantity_button).click({force: true});
            cy.wait(300); // Small delay to ensure click was processed
            cy.get(cartPageElements.increase_quantity_button).click({force: true});
            cy.wait(300);
            cy.get(cartPageElements.increase_quantity_button).click({force: true});

            cy.log('Decreasing quantity 1 time');
            cy.get(cartPageElements.decrease_quantity_button)
              .should("exist")
              .and("be.visible");
            cy.get(cartPageElements.decrease_quantity_button).click({force: true});
            cy.wait(300); // Small delay to ensure click was processed
            
            // Net 3 Products (assuming starting quantity is 1)
            cy.log('Adding final quantity to cart');
            cy.get(cartPageElements.add_to_cart_button)
              .should("exist")
              .and("be.visible")
              .click({force: true});
              
            cy.log('Successfully added headphones to cart');
        } catch (e) {
            cy.log(`Error in adding headphones to cart: ${e.message}`);
            throw new Error(`Error in Adding Headphone to Cart: Order Confirmation Feature. Original error: ${e.message}`);
        }
        
        return this;
    }
    
    clickCart(){
        cy.log('Navigating to checkout page');
        try {
            // Verify cart button exists and is visible
            cy.get(cartPageElements.cart_button)
                .should("exist")
                .and("be.visible")
                .click({force: true});
            cy.log('Clicked on cart button');
            
            // Wait for 2 seconds before clicking the checkout button
            cy.wait(5000); // 5000 milliseconds = 5 seconds
            cy.log('Waiting for 2 seconds before proceeding...');

            // Verify checkout button exists and is visible
            cy.get(cartPageElements.checkout_button)
                .should("exist")
                .and("be.visible")
                .click({force: true});
            cy.log('Clicked on checkout button');
        } catch (e) {
            cy.log(`Error navigating to checkout: ${e.message}`);
            throw new Error(`Failed to navigate to checkout page. Original error: ${e.message}`);
        }   
        return this;
    }

}

module.exports = CartPageActions;