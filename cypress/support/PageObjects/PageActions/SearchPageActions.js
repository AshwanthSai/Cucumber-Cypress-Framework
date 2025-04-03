const searchPageElements = require("../PageElements/SearchPageElements.json")
const homePageElements = require("../PageElements/HomePageElements.json")


class SearchPageActions {
    verifyNoSearchAction(){
        cy.log('Verifying no search action performed');
        try {
            cy.get(homePageElements.Home_Page_Banner).should("exist");
            cy.log('Home page banner exists, confirming no search action');
        } catch (e) {
            cy.log(`Error verifying no search action: ${e.message}`);
            throw new Error(`Failed to verify no search action. Error: ${e.message}`);
        }
        return this;
    }

    verifySearchResults(keyword){
        cy.log(`Verifying search results for keyword: ${keyword}`);
        try {
            cy.get(searchPageElements.product_quantity)
                .should('exist')
                .and('contain', keyword);
            cy.log(`Search results found for keyword: ${keyword}`);
        } catch (e) {
            cy.log(`Error verifying search results for ${keyword}: ${e.message}`);
            throw new Error(`Failed to verify search results for ${keyword}. Error: ${e.message}`);
        }
        return this;
    }

    verifyProductResults(minCount = 0){
        cy.log(`Verifying at least ${minCount} products in search results`);
        try {
            cy.get('#products_heading')
                .should('exist')
                .invoke('text')
                .then((text) => {
                    // Extract the number from text like "8 Products found with keyword: camera"
                    const match = text.match(/(\d+)\s+Products?/i);
                    if (match && match[1]) {
                        //* Parse in Base 10 
                        const count = parseInt(match[1], 10);
                        window.alert(count)
                        window.alert(match[1])
                        expect(count).to.be.greaterThan(minCount);
                        cy.log(`Found ${count} products, which is greater than ${minCount}`);
                    } else {
                        throw new Error(`Could not extract product count from heading: "${text}"`);
                    }
                });
        } catch (e) {
            cy.log(`Error verifying product results count: ${e.message}`);
            throw new Error(`Failed to verify product results count. Error: ${e.message}`);
        }
        return this;
    }
}

module.exports = SearchPageActions;