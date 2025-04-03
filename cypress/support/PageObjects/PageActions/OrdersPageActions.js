const orderPageElements = require("../PageElements/OrderPageElements.json")
const orderDetailsElements = require("../PageElements/OrderDetailsPageElements.json")


class OrdersPageActions {

    navigateToLastPage() {
        cy.log('Navigating directly to the last page of orders');
        
        try {
            // First verify we're on the orders page
            cy.url()
                .should('include', '/me/orders');
                
            // Check if pagination exists
            cy.get('body').then($body => {
                const hasPagination = $body.find('[data-test="pagination"]').length > 0;
                
                if (!hasPagination) {
                    cy.log('No pagination found - all orders are on a single page');
                    return;
                }
                
                // Find the pagination component using the data-test attribute
                cy.get('[data-test="pagination"]')
                    .should('exist')
                    .then($pagination => {
                        cy.log('Found pagination component');
                        
                        // Get all page number buttons (excluding Previous/Next buttons)
                        cy.get('[data-test="pagination"] .page-item:not(:first-child):not(:last-child)')
                            .last()
                            .then($lastPageItem => {
                                const lastPageNumber = $lastPageItem.text().trim();
                                cy.log(`Found last page number: ${lastPageNumber}`);
                                
                                // Check if we're already on the last page
                                if (!$lastPageItem.hasClass('active')) {
                                    cy.wrap($lastPageItem.find('.page-link'))
                                        .scrollIntoView()
                                        .click();
                                        
                                    cy.log(`Clicked to navigate to page ${lastPageNumber}`);
                                    
                                    // Verify page changed
                                    cy.get('[data-test="pagination"] .page-item.active')
                                        .should('contain.text', lastPageNumber);
                                } else {
                                    cy.log(`Already on last page (${lastPageNumber})`);
                                }
                            });
                    });
            });
        } catch (e) {
            cy.log(`Error navigating to last page: ${e.message}`);
            throw new Error(`Failed to navigate to last page: ${e.message}`);
        }
        
        return this;
    }

    verifyRedirectToOrderDetailsPage(){
        cy.log('Verifying redirect to orders page');
        try {
            // Verify the URL is the orders page
            cy.url({ timeout: 10000 })
                .should('eq', 'https://portfoliosai.link/sydneykart/me/orders');
            
            cy.log('Successfully verified redirect to orders page');
            
            // Additional verification that key order page elements exist
            cy.get(orderPageElements.orders_table)
                .should('exist')
                .should('be.visible');
                
            cy.log('Order page content verified');
        } catch (e) {
            cy.log(`Error verifying redirect to orders page: ${e.message}`);
            throw new Error(`Failed to verify redirect to orders page. Original error: ${e.message}`);
        }
        return this;
    }

    clickLastOrder() {
        cy.log('Attempting to click the first order in the orders table');
        
        try {
            // First, verify that we're on the orders page
            cy.url()
                .should('include', '/me/orders')
                .then(() => {
                    // Check if the orders table exists and has orders
                    cy.get(orderPageElements.orders_table, { timeout: 10000 })
                        .should('exist')
                        .should('be.visible')
                        .then($table => {
                            // Check if there are any orders in the table
                            // Only header row
                            if ($table.find('tr').length <= 1) { 
                                cy.log('No orders found in the table');
                                throw new Error('No orders available to click');
                            }

                            cy.get(orderPageElements.order_details_last_order)
                                .should('be.visible')
                                .scrollIntoView()
                                .click({ force: true });
                                
                            cy.log('Successfully clicked on the first order');
                        });
                });
        } catch (e) {
            cy.log(`Error clicking first order: ${e.message}`);
            throw new Error(`Failed to click the first order. Original error: ${e.message}`);
        }
        
        // Wait for page transition after click
        cy.wait(2000);
        return this;
    }


    verifyProduct(productName) {
        cy.log(`Verifying product "${productName}" is in the order`);
        
        try {
            // First verify we're on the order details page
            cy.url()
                .should('include', '/orders/')
                .then(() => {
                    // Wait for the product element to be visible with a decent timeout
                    cy.get(orderDetailsElements.product_name, { timeout: 10000 })
                        .should('exist')
                        .should('be.visible')
                        .should('contain.text', productName);
                    
                    cy.log(`Successfully verified product "${productName}" is in the order`);
                });
        } catch (e) {
            cy.log(`Error verifying product in order: ${e.message}`);
            throw new Error(`Failed to verify product "${productName}" in order. Original error: ${e.message}`);
        }
        
        return this;
    }

    clickInvoiceButton() {
        cy.log('Attempting to click the invoice button');    
        try {
            // First verify we're on the order details page
            cy.url()
                .should('include', '/me/orders/')
                .then(() => {
                    // Look for the button with multiple fallback strategies
                    cy.get('.d-flex > .btn')
                        .should('exist')
                        .should('be.visible')
                        .should('contain.text', 'Invoice')
                        .click()
                    })
            
            // The click may open a new tab/window for the PDF
            cy.log('Invoice button clicked, PDF may have opened in a new tab');
            
        } catch (e) {
            cy.log(`Error clicking invoice button: ${e.message}`);
            throw new Error(`Failed to click invoice button. Original error: ${e.message}`);
        }
        
        return this;
    }
}


module.exports = OrdersPageActions;