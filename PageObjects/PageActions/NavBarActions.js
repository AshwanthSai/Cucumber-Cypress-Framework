const navBarElements = require("../PageElements/NavBarElements.json")
const homePageElements = require("../PageElements/HomePageElements.json")

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
            cy.wait(3000);
            cy.get(navBarElements.login_button, { timeout: 10000 })
                .should("exist")
                .should("be.visible");
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
            // For Multiple Logins, sometime the loading bar covers the button
            cy.get(navBarElements.login_button).click({force: true});
            cy.log('Login button clicked successfully');
        } catch (e) {
            cy.log(`Error clicking login button: ${e.message}`);
            throw new Error(`Failed to click login button. Original error: ${e.message}`);
        }
        return this;
    }
    
    search(searchTerm){
        cy.log(`Performing search: "${searchTerm || 'empty search'}"`);
        try {
            if(searchTerm == undefined ||  searchTerm == "") {
                cy.get(navBarElements.search_button).click();
                cy.log('Empty search performed');
            } else {
                cy.get(navBarElements.search_bar).type(searchTerm);
                cy.log(`Search term "${searchTerm}" entered successfully`);
            }
        } catch (e) {
            cy.log(`Error performing search: ${e.message}`);
            throw new Error(`Failed to perform search. Original error: ${e.message}`);
        }
    }

    verifyLoginStatus(expectedStatus) {
        cy.get('body').then($body => {
            // Check only two elements - simplifying the logic
            const profileActionButtonsExist = $body.find(navBarElements.profile_action_buttons).length > 0;
            const loginButtonExists = $body.find(navBarElements.login_button).length > 0;
            
            let isLoggedIn;
            
            // Simplified logic with just two elements
            if (profileActionButtonsExist && !loginButtonExists) {
                // Profile actions visible and login button not visible = logged in
                isLoggedIn = true;
            } else if (!profileActionButtonsExist && loginButtonExists) {
                // No profile actions and login button visible = not logged in
                isLoggedIn = false;
            } else {
                // Edge case (shouldn't happen in normal application flow)
                // Default to checking just the login button as the decisive factor
                isLoggedIn = !loginButtonExists;
                cy.log('Warning: Inconsistent login state indicators detected');
            }
            
            // Compare against expected status
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
            // Click the profile button first to show the dropdown
            cy.get(navBarElements.profile_action_buttons)
            .should('be.visible')
            .click();

            // Then interact with the dropdown
            cy.get(navBarElements.profile_dropdown)
            .should('be.visible')
            .within(() => {
                cy.get('a[href*="/me/profile"]').click();
            });

            // Verify we've navigated to the profile page
            cy.url().should('include', '/me');
            cy.log('Successfully navigated to profile page');
        } catch (e) {
            cy.log(`Error navigating to profile page: ${e.message}`);
            throw new Error(`Failed to navigate to profile page. Original error: ${e.message}`);
        }
        
        return this;
    }
}

module.exports = NavBarActions;