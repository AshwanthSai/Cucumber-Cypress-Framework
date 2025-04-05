const navBarElements = require("../PageElements/NavBarElements.json")
const homePageElements = require("../PageElements/HomePageElements.json")
const filteredProductsElements = require("../PageElements/FilteredProductsPageElements.json")
const loginPageElements = require("../PageElements/LoginPageElements.json")

class NavBarActions {
    verifyLogo() {
        cy.log('Verifying logo');
        try {
            cy.get(navBarElements.logo).should("exist");
            cy.log('Logo verified successfully');
        } catch (e) {
            cy.log(`Error verifying logo: ${e.message}`);
            throw new Error(`Failed to verify logo. Original error: ${e.message}`);
        }
        return this;
    }
    
    verifySearchBar() {
        cy.log('Verifying search bar');
        try {
            cy.get(navBarElements.search_bar).should("exist");
            cy.log('Search bar verified successfully');
        } catch (e) {
            cy.log(`Error verifying search bar: ${e.message}`);
            throw new Error(`Failed to verify search bar. Original error: ${e.message}`);
        }
        return this;
    }
    
    verifyHomePage() {
        cy.log('Verifying home page');
        try {
            cy.get(homePageElements.Home_Page_Banner).should("exist");
            cy.log('Home page verified successfully');
        } catch (e) {
            cy.log(`Error verifying home page: ${e.message}`);
            throw new Error(`Failed to verify home page. Original error: ${e.message}`);
        }
        return this;
    }
    
    verifyLogin() {
        cy.log('Verifying login button');
        try {
            cy.get(loginPageElements.login_form, { timeout: 10000 })
            .should('exist')
            .should('be.visible')
            .within(() => {
                // Verify critical elements within the form exist
                cy.get(loginPageElements.email_field)
                .should('exist')
                .should("be.visible");
                cy.get(loginPageElements.password_field)
                .should('exist')
                .should("be.visible")
                cy.get(loginPageElements.login_button)
                .should('exist')
                .should("be.visible")
            });
            cy.log('Login button verified successfully');

        } catch (e) {
            cy.log(`Error verifying login button: ${e.message}`);
            throw new Error(`Failed to verify login button. Original error: ${e.message}`);
        }
        return this;
    }
    
    clickLogin(){
        cy.log('Clicking login button');
        try {
            cy.get(navBarElements.login_button).click({force: true});
            cy.url().should('include', '/login');
            cy.log('Login button clicked successfully');
        } catch (e) {
            cy.log(`Error clicking login button: ${e.message}`);
            throw new Error(`Failed to click login button. Original error: ${e.message}`);
        }
        return this;
    }
    
    clickSearch() {
            cy.log('Clicking search button');
            try {
                // Wait for the search results API response
                // cy.wait('@searchResults', { timeout: 15000 });
                /* 
                    The problem with interscepting requests is that
                    Redux Caches Results on the fronty end. 
                    And our test data is checing for Apples within Different Contexts
                    So for each Context a seperate request is not made.
                    By Design the app does not add an alt identifier to the
                    products, or add a Loading UI
                
                    The only next workaround is to prestore content 
                    and compare after search is performed
                */
                cy.get(navBarElements.search_button).click();
                cy.log('Search button clicked successfully');

                if (Cypress.env('empty_search')) {
                    cy.log(`Filter options should not appear, exit test`);
                    return this;
                }
                
                cy.get(filteredProductsElements.product_grid)
                .waitForStableDOM({ pollInterval: 2000, timeout: 10000 })
                cy.log('Successfully clicked Go button');
                // Wait for filter options to be visible (indicating search results page loaded)
                cy.get(filteredProductsElements.filter_options, { timeout: 10000 })
                    .should('exist')
                    .and('be.visible');
            } catch (e) {
                cy.log(`Error clicking search button: ${e.message}`);
                throw new Error(`Failed to click search button. Original error: ${e.message}`);
            }
            
            return this;
        }

    search(searchTerm) {
        cy.log(`Performing search: "${searchTerm || 'empty search'}"`);
        if(searchTerm === null || searchTerm === "" || searchTerm === undefined){
            Cypress.env("empty_search", true);
        }
        try {
            if(searchTerm == undefined || searchTerm == "") {
                // For empty searches, use the clickSearch method
                return this.clickSearch();
            } else {
                // For searches with terms, enter the term first
                cy.get(navBarElements.search_bar).clear().type(searchTerm);
                cy.log(`Search term "${searchTerm}" entered successfully`);
                
                // Then use the clickSearch method to submit
                return this.clickSearch();
            }
        } catch (e) {
            cy.log(`Error performing search: ${e.message}`);
            throw new Error(`Failed to perform search. Original error: ${e.message}`);
        }
    }

    verifyLoginStatus(expectedStatus) {
        cy.get('body').then($body => {
            const profileActionButtonsExist = $body.find(navBarElements.profile_action_buttons).length > 0;
            const loginButtonExists = $body.find(navBarElements.login_button).length > 0;
            
            let isLoggedIn;
            
            if (profileActionButtonsExist && !loginButtonExists) {
                // Profile actions visible and login button not visible = logged in
                isLoggedIn = true;
            } else if (!profileActionButtonsExist && loginButtonExists) {
                // No profile actions and login button visible = not logged in
                isLoggedIn = false;
            } else {
                // Default to checking just the login button as the decisive factor
                isLoggedIn = !loginButtonExists;
                cy.log('Warning: Inconsistent login state indicators detected');
            }
            
            if (expectedStatus === "logged in") {
                expect(isLoggedIn).to.be.true;
                cy.log("Verified user is logged in");
            } else if (expectedStatus === "not logged in") {
                expect(isLoggedIn).to.be.false;
                cy.log("Verified user is not logged in");
            } else {
                throw new Error(`Invalid expected status: ${expectedStatus}. Use "logged in" or "not logged in".`);
            }
        });
        return this;
    }

    navigateToMyProfile() {
        cy.log('Navigating to my profile page');
        try {
            cy.get(navBarElements.profile_action_buttons, { timeout: 10000 })
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .click();

            // Then interact with the dropdown
            cy.get(navBarElements.profile_dropdown, { timeout: 5000 })
            .should('be.visible')
            .within(() => {
                cy.get('a[href*="/me/profile"]')
                    .should('be.visible')
                    .click();
            });

            // Verify we've navigated to the profile page
            cy.url({ timeout: 10000 }).should('include', '/me');
            cy.log('Successfully navigated to profile page');
        } catch (e) {
            cy.log(`Error navigating to profile page: ${e.message}`);
            throw new Error(`Failed to navigate to profile page. Original error: ${e.message}`);
        }
        
        return this;
    }
}

module.exports = NavBarActions;