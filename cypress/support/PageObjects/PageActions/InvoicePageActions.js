const invoicePageElements = require("../PageElements/InvoicePageElements.json")

class InvoicePageActions {

    verifyInvoicePage() {
        cy.log('Verifying invoice page is loaded');
        try {
            cy.url().should('include', '/invoice/order/');
            cy.get(invoicePageElements.order_invoice).should('exist');
            
            // Store order ID
            cy.url().then(url => {
                const orderId = url.split('/').pop();
                if (orderId) Cypress.env('currentOrderId', orderId);
            });
        } catch (e) {
            cy.log(`Error verifying invoice page: ${e.message}`);
            throw e;
        }
        return this;
    }
    
    downloadInvoicePDF() {
        cy.log('Downloading invoice PDF');
        try {
            // Get the download URL
            cy.get(invoicePageElements.download_invoice_button).then($btn => {
                const downloadUrl = $btn.attr('href');
                
                if (downloadUrl) {
                    // Use the cypress-downloadfile plugin
                    cy.downloadFile(
                        downloadUrl,
                        'cypress/downloads',
                        'invoice.pdf'
                    ).then(result => {
                        cy.log(`Download result: ${result}`);
                        // Store the filename for verification
                        Cypress.env('invoiceFile', 'invoice.pdf');
                    });
                } else {
                    // If there's no href, try clicking the button
                    cy.get(invoicePageElements.download_invoice_button)
                        .click({force: true});
                    cy.wait(3000); // Wait for download to start
                }
            });
        } catch (e) {
            cy.log(`Error downloading PDF: ${e.message}`);
            throw e;
        }
        return this;
    }
    
    verifyInvoice() {
        cy.log('Verifying invoice was downloaded');
        
        // Simple verification using the Cypress task
        cy.task('listFiles').then(files => {
            cy.log(`Files in downloads folder: ${files.join(', ')}`);
            
            const hasPdf = files.some(file => file.endsWith('.pdf'));
            if (hasPdf) {
                cy.log('✓ PDF file found in downloads folder');
            } else {
                throw new Error('No PDF file found in downloads folder');
            }
        });
        
        return this;
    }
    
}

module.exports = InvoicePageActions;