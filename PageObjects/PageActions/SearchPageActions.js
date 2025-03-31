const searchPageElements = require("../PageElements/SearchPageElements.json")
const homePageElements = require("../PageElements/HomePageElements.json")


class SearchPageActions {
    verifyNoSearchAction(){
        cy.get(homePageElements.Home_Page_Banner).should("exist");
        return this;
    }

    verifySearchResults(keyword){
        cy.get(searchPageElements.product_quantity)
        .should('exist')
        .and('contain', keyword);
        return this;
    }

    verifyProductResults(minCount = 0){
        // cy.get(searchPageElements.product_heading)
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
        return this;
    }
}

module.exports = SearchPageActions;