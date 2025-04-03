const paginationComponentElements = require("../PageElements/PaginationComponentElements.json")

class PaginationElementActions {

    paginationExists(){
        cy.log('Verifying pagination exists');
        try {
            cy.get(paginationComponentElements.pagination_container).should("exist").and("be.visible");
            cy.log('Pagination exists and is visible');
        } catch (e) {
            cy.log(`Error verifying pagination exists: ${e.message}`);
            throw new Error(`Failed to verify pagination exists. Error: ${e.message}`);
        }
        return this;
    }

    currentPageIndicator() {
        cy.log('Getting current page indicator');
        try {
            // Get the text of the active page
            cy.get('.pagination .page-item.active .page-link')
                .invoke('text')
                .then(text => {
                    cy.wrap(text).as('activePageNumber');
                    cy.log(`Current active page is: ${text}`);
                    return text;
                });
        } catch (e) {
            cy.log(`Error getting current page indicator: ${e.message}`);
            throw new Error(`Failed to get current page indicator. Error: ${e.message}`);
        }
        return this;
    }

    verifyCurrentPage(expectedPageNumber) {
        cy.log(`Verifying current page is ${expectedPageNumber}`);
        try {
            // Page one does not have any changes in URL
            if(expectedPageNumber !== "1") {
                cy.url().should('include', `page=${expectedPageNumber}`);
                cy.log(`URL contains page=${expectedPageNumber}`);
            } else {
                cy.log('Page 1 does not include page parameter in URL');
            }
        } catch (e) {
            cy.log(`Error verifying current page: ${e.message}`);
            throw new Error(`Failed to verify current page is ${expectedPageNumber}. Error: ${e.message}`);
        }
        return this;
    }

    // Active Link Status
    verifyCurrentActivePage(expectedPageNumber){
        cy.log(`Verifying active page indicator shows page ${expectedPageNumber}`);
        try {
            // Check active page indicator by class
            cy.get('.pagination .page-item.active .page-link')
                .should("exist")
                .invoke('text')
                .should('eq', expectedPageNumber);
            cy.log(`Active page indicator confirmed as page ${expectedPageNumber}`);
        } catch (e) {
            cy.log(`Error verifying active page indicator: ${e.message}`);
            throw new Error(`Failed to verify active page indicator shows page ${expectedPageNumber}. Error: ${e.message}`);
        }
        return this;
    }

    // Page 2 + Multipage Navigation Buttons - First, Last, Next, Prev
    verifyMultiPageNavigation(){
        cy.log('Verifying multi-page navigation buttons exist');
        try {
            cy.get(paginationComponentElements.pagination_First)
                .should("exist").and("be.visible");
            cy.get(paginationComponentElements.pagination_Prev)
                .should("exist").and("be.visible");
            cy.get(paginationComponentElements.pagination_Next)
                .should("exist").and("be.visible");
            cy.get(paginationComponentElements.pagination_Last)
                .should("exist").and("be.visible");
            cy.log('All navigation buttons exist and are visible');
        } catch (e) {
            cy.log(`Error verifying multi-page navigation buttons: ${e.message}`);
            throw new Error(`Failed to verify multi-page navigation buttons. Error: ${e.message}`);
        }
        return this;
    }

    clickButton(button){
        cy.log(`Clicking pagination ${button} button`);
        try {
            if(button == "Next"){
                cy.get(paginationComponentElements.pagination_Next)
                    .should("exist").and("be.visible").click();
                cy.log('Clicked Next button');
            } else if(button == "Previous"){
                cy.get(paginationComponentElements.pagination_Prev)
                    .should("exist").and("be.visible").click();
                cy.log('Clicked Previous button');
            } else if(button == "3"){
                cy.get(paginationComponentElements.pagination_page3)
                    .should("exist").and("be.visible").click();
                cy.log('Clicked page 3 button');
            }
        } catch (e) {
            cy.log(`Error clicking ${button} button: ${e.message}`);
            throw new Error(`Failed to click ${button} button. Error: ${e.message}`);
        }
        return this;
    }
}

module.exports = PaginationElementActions;