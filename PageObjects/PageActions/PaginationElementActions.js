const navBarElements = require("../PageElements/NavBarElements.json")
const homePageElements = require("../PageElements/HomePageElements.json")
const paginationComponentElements = require("../PageElements/PaginationComponentElements.json")

class PaginationElementActions {
    // Regular synchronous function

    paginationExists(){
        cy.get(paginationComponentElements.pagination_container).should("exist").and("be.visible");;
        return this;
    }

    currentPageIndicator() {
        // Get the text of the active page
        cy.get('.pagination .page-item.active .page-link')
            .invoke('text')
            .then(text => {
                cy.wrap(text).as('activePageNumber');
                return text;
            });
        
        return this;
    }

    verifyCurrentPage(expectedPageNumber) {
        // Page one does not have any changes in URL
        if(expectedPageNumber !== "1") {
            cy.url().should('include', `page=${expectedPageNumber}`);
        }
        return this;
    }

    // Active Link Status
    verifyCurrentActivePage(expectedPageNumber){
          // Check active page indicator
        // No Specific Change to URL
        // Check active page indicator by class
        cy.get('.pagination .page-item.active .page-link')
        .should("exist")
        .invoke('text')
        .should('eq', expectedPageNumber);

    }

    // Page 2 + Multipage Navigation Buttons - First, Last, Next, Prev
    verifyMultiPageNavigation(){
        cy.get(paginationComponentElements.pagination_First)
            .should("exist").and("be.visible")
        cy.get(paginationComponentElements.pagination_Prev)
            .should("exist").and("be.visible")
        cy.get(paginationComponentElements.pagination_Next)
            .should("exist").and("be.visible")
        cy.get(paginationComponentElements.pagination_Last)
            .should("exist").and("be.visible")
        // cy.get(paginationComponentElements.pagination_secondPage)
        //     .should("exist").and("be.visible")
        return this
    }

    clickButton(button){
        if(button == "Next"){
            cy.get(paginationComponentElements.pagination_Next)
            .should("exist").and("be.visible").click()
        } else if(button == "Previous"){
            cy.get(paginationComponentElements.pagination_Prev)
            .should("exist").and("be.visible").click()
        } else if(button == "3"){
            cy.get(paginationComponentElements.pagination_page3)
            .should("exist").and("be.visible").click()
        }

        return this;
    }
}

module.exports = PaginationElementActions;