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
        // Clear downloads folder
        cy.task('deleteDownloads');
        
        // Get download button and either download via URL or click
        cy.get(invoicePageElements.download_invoice_button).then($btn => {
            $btn.attr('href') ? 
                cy.downloadFile($btn.attr('href'), 'cypress/downloads', 'invoice.pdf') : 
                $btn.click();
                
            // Wait for download and store filename
            cy.task('waitForDownload', '.pdf', 15000)
                .then(file => Cypress.env('invoiceFile', file));
        });
        
        return this;
    }
    
    verifyInvoice() {
        cy.log('Verifying invoice was downloaded');
        
        // Get the stored filename (default to invoice.pdf if not set)
        const filename = Cypress.env('invoiceFile') || 'invoice.pdf';
        
        // Use task to check if file exists
        cy.task('checkFileExists', filename).then((exists) => {
            expect(exists, `Invoice file "${filename}" should exist`).to.be.true;
            cy.log(`✓ Invoice file "${filename}" exists`);
        });
        
        // Use task to check file size
        cy.task('getFileSize', filename).then((size) => {
            expect(size, `Invoice file size should be greater than 1KB`).to.be.greaterThan(1000);
            cy.log(`✓ Invoice file size: ${size} bytes`);
        });
        
        // Optionally use task to get file checksum for data integrity check
        cy.task('getFileChecksum', filename).then((checksum) => {
            cy.log(`✓ Invoice file checksum: ${checksum}`);
            // Store checksum if you need to verify it later
            Cypress.env('invoiceChecksum', checksum);
        });
        
        return this;
    }
    
    /**
     * Verify invoice contains expected order information
     * Note: This would require PDF parsing which is beyond the scope of these changes
     */
    verifyInvoiceContents(orderDetails) {
        cy.log('Verifying invoice contents');
        // This would require additional setup to read and parse PDF content
        // For a complete solution, consider using a Node.js library like pdf-parse
        // and implementing it as a Cypress task
        
        // Example of what this might look like:
        /*
        const filename = Cypress.env('invoiceFile') || 'invoice.pdf';
        cy.task('parsePdfContent', filename).then((pdfText) => {
            // Check for order ID
            expect(pdfText).to.include(orderDetails.orderId);
            // Check for product details
            expect(pdfText).to.include(orderDetails.productName);
            // Check for price
            expect(pdfText).to.include(orderDetails.totalPrice);
        });
        */
        
        return this;
    }
    
    /**
     * Clean up downloaded files after test
     */
    cleanupDownloads() {
        cy.log('Cleaning up downloaded files');
        cy.task('deleteDownloads').then(() => {
            cy.log('✓ Downloads folder cleaned');
        });
        return this;
    }
}

module.exports = InvoicePageActions;