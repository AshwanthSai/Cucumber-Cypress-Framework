const searchPageElements = require("../PageElements/SearchPageElements.json")


class SearchPageActions {
    verifySearchResults(keyword){
        cy.get(searchPageElements.product_quantity)
        .should('exist')
        .and('contain', keyword);
        return this;
    }

    verifyProductResults(minCount = 0){
        cy.get(searchPageElements.product_heading)
            .should('exist')
            .invoke('text')
            .then((text) => {
                // Extract the number from text like "8 Products found with keyword: camera"
                const match = text.match(/(\d+)\s+Products?/i);
                if (match && match[1]) {
                    const count = parseInt(match[1], 10);
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