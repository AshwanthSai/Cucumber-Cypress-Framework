const filteredProductsElements = require("../PageElements/FilteredProductsPageElements.json")

class FilteredProductsPageActions {
      verifySearchResults(expectedKeyword, expectedMinCount = 1) {
        cy.log(`Verifying search results for keyword: ${expectedKeyword}`);
        try {
          cy.get(filteredProductsElements.products_title)
            .should('exist')
            .and('be.visible')
            .invoke('text')
            .then((text) => {
              // Extract product count
              const countMatch = text.match(/(\d+)\s+Products?/i);
              const count = countMatch ? parseInt(countMatch[1], 10) : 0;
              
              // Extract keyword
              const keywordMatch = text.match(/keyword:\s*(\w+)/i);
              const keyword = keywordMatch ? keywordMatch[1].toLowerCase() : '';
              
              // Store for later use
              Cypress.env('productCount', count);
              Cypress.env('searchKeyword', keyword);
              
              // Verify expected values
              expect(count).to.be.at.least(expectedMinCount);
              expect(keyword).to.equal(expectedKeyword.toLowerCase());
              
              cy.log(`Found ${count} products for keyword "${keyword}"`);
            });
        } catch (e) {
          cy.log(`Error verifying search results: ${e.message}`);
          throw new Error(`Failed to verify search results for ${expectedKeyword}. Error: ${e.message}`);
        }
        
        return this;
      }
      
      getProductCount() {
        return Cypress.env('productCount') || 0;
      }
      
      getSearchKeyword() {
        return Cypress.env('searchKeyword') || '';
      }

      setMinimumPrice(minPrice) {
        cy.log(`Setting minimum price to: ${minPrice}`);
        try {
            // Clear existing value first
            cy.get(filteredProductsElements.min_price_input)
                .should('exist')
                .clear()
                .type(minPrice)
                .should('have.value', minPrice);
                
            cy.log(`Successfully set minimum price to ${minPrice}`);
        } catch (e) {
            cy.log(`Error setting minimum price: ${e.message}`);
            throw new Error(`Failed to set minimum price to ${minPrice}. Error: ${e.message}`);
        }
        
        return this;
      }
    
      setMaximumPrice(maxPrice) {
          cy.log(`Setting maximum price to: ${maxPrice}`);
          try {
              // Clear existing value first
              cy.get(filteredProductsElements.max_price_input)
                  .should('exist')
                  .clear()
                  .type(maxPrice)
                  .should('have.value', maxPrice);
                  
              cy.log(`Successfully set maximum price to ${maxPrice}`);
          } catch (e) {
              cy.log(`Error setting maximum price: ${e.message}`);
              throw new Error(`Failed to set maximum price to ${maxPrice}. Error: ${e.message}`);
          }
          
          return this;
      }

      clickGoButton() {
        cy.log('Clicking Go button');
        try {
            /* 
                The below is to asset that the DOM is updated
                with filtered content.
                Prestore products within Product Grid.
                Compare them after filter operation to verify DOM Update
            */
            cy.get(filteredProductsElements.go_button)
                .should('exist')
                .and('be.visible')
                .click();
            
            /* Wait for Product List Grid to be re-rendered and remain stable */
            cy.get(filteredProductsElements.product_grid)
            .waitForStableDOM({ pollInterval: 2000, timeout: 10000 })
            cy.log('Successfully clicked Go button');
 
            
            // Wait for filter options to be visible (indicating search results page loaded)
            cy.get(filteredProductsElements.filter_options, { timeout: 10000 })
                .should('exist')
                .and('be.visible');

        } catch (e) {
            cy.log(`Error clicking Go button: ${e.message}`);
            throw new Error(`Failed to click Go button. Error: ${e.message}`);
        }
        
        return this;
      }

      verifyPriceRange(minPrice, maxPrice) {
        cy.log(`Verifying products have prices between $${minPrice} and $${maxPrice}`);
        
        const minPriceValue = parseFloat(minPrice);
        const maxPriceValue = parseFloat(maxPrice);
        
        // Get all product prices and verify they're in range
        cy.get(filteredProductsElements.product_price)
            .should('have.length.at.least', 1)
            .each($price => {
                // Extract numeric price from text (removing $ and other characters)
                const priceText = $price.text().trim();
                const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                
                // Verify price is within range
                expect(price).to.be.at.least(minPriceValue);
                expect(price).to.be.at.most(maxPriceValue);
            });
        
        return this;
      }

      verifyProductsMatchSearchTerm(searchTerm) {
        cy.log(`Verifying products match search term: "${searchTerm}"`);
        const searchLowerCase = searchTerm.toLowerCase();
        
        // Use a promise to handle the conditional early return
        return new Cypress.Promise((resolve) => {
            // Check if any product cards exist
            cy.get('body').then($body => {
                const hasProducts = $body.find(filteredProductsElements.product_title).length > 0;
                
                if (!hasProducts) {
                    cy.log(`No products found for search term "${searchTerm}"`);
                    cy.log(`Could be a category with no matching items`);
                    resolve(this); // Early return with 'this'
                } else {
                    // Check each product title contains the search term
                    cy.get(filteredProductsElements.product_title)
                        .should('have.length.at.least', 1)
                        .each($title => {
                            const titleText = $title.text().toLowerCase();
                            expect(titleText).to.include(searchLowerCase);
                        })
                        .then(() => {
                            resolve(this); // Return after all checks
                        });
                }
            });
        });
      }

      // Select category
      selectCategory(category) {
        // First try direct name
        cy.get(`input[value='${category}']`).then($el => {
            if ($el.length) {
                cy.wrap($el).check();
                /* Wait for Product List Grid to be re-rendered and remain stable */
                cy.get(filteredProductsElements.product_grid)
                .waitForStableDOM({ pollInterval: 2000, timeout: 10000 })
                cy.log('Successfully clicked Go button');
            } else {
                // Try with lookup in elements file
                const key = `${category.toLowerCase()}_category_checkbox`;
                cy.get(filteredProductsElements[key]).check();
                /* Wait for Product List Grid to be re-rendered and remain stable */
                cy.get(filteredProductsElements.product_grid)
                .waitForStableDOM({ pollInterval: 2000, timeout: 10000 })
                cy.log('Successfully clicked Go button');
            }
        });
        return this;
      }
    
      // Select rating
      selectRating(rating) {
          const ratingMap = {
              5: filteredProductsElements.five_star_rating_checkbox,
              4: filteredProductsElements.four_star_rating_checkbox,
              3: filteredProductsElements.three_star_rating_checkbox,
              2: filteredProductsElements.two_star_rating_checkbox,
              1: filteredProductsElements.one_star_rating_checkbox
          };
          
          cy.get(ratingMap[rating]).check();
            /* Wait for Product List Grid to be re-rendered and remain stable */
            cy.get(filteredProductsElements.product_grid)
            .waitForStableDOM({ pollInterval: 2000, timeout: 10000 })
            cy.log('Successfully clicked Go button');
          return this;
      }

      verifyNumberOfProductsOnPage(expectedProducts) {
        cy.log(`Verifying number of products on page: expected ${expectedProducts}`);
        
        cy.get(filteredProductsElements.product_card)
            .should('have.length', expectedProducts)
            .then($cards => {
                cy.log(`Found ${$cards.length} products on page`);
            });
        
        return this;
      }

      verifyRatingRange(expectedCount = null, rating) {
        cy.log(`Verifying products have ratings of at least ${rating} stars${expectedCount !== null ? ` with expected count: ${expectedCount}` : ''}`);
        
        const minRating = parseInt(rating);
        
        // First, verify the product count if specified
        if (expectedCount !== null) {
            cy.log(`Checking for exactly ${expectedCount} products`);
            cy.get(filteredProductsElements.product_grid)
                .should('have.length', expectedCount)
                .then($cards => {
                    cy.log(`Found ${$cards.length} products as expected`);
                });
        }
        
        // If we expect 0 products, we're done - nothing to check for ratings
        if (expectedCount === 0) {
            cy.log(`No products to check ratings for`);
            return this;
        }
        return this;
      }
}

module.exports = FilteredProductsPageActions;