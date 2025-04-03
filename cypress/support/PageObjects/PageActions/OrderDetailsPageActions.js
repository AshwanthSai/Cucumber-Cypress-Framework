class OrderDetailsPageActions {
    verifyRedirectToOrderDetailsPage(){
        cy.log('Verifying redirect to orders page');
        try {
            // Verify the URL is the orders page
            cy.url({ timeout: 10000 })
                .should('eq', 'https://portfoliosai.link/sydneykart/me/orders');
            
            cy.log('Successfully verified redirect to orders page');
            
            // Additional verification that key order page elements exist
            cy.get('body').contains('My Orders')
                .should('exist')
                .should('be.visible');
                
            cy.log('Order page content verified');
        } catch (e) {
            cy.log(`Error verifying redirect to orders page: ${e.message}`);
            throw new Error(`Failed to verify redirect to orders page. Original error: ${e.message}`);
        }
        return this;
    }

    verifyOrderList(){
        
    }
}

module.exports = OrderDetailsPageActions;