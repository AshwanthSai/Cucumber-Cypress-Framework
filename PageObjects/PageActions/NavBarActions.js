const navBarElements = require("../PageElements/NavBarElements.json")
const homePageElements = require("../PageElements/HomePageElements.json")

class NavBarActions {
    // Regular synchronous function
    verifyLogo() {
        cy.get(navBarElements.logo).should("exist");
        return this;
    }

    verifySearchBar() {
        cy.get(navBarElements.search_bar).should("exist");
        return this;
    }

    verifyHomePage() {
        cy.get(homePageElements.Home_Page_Banner).should("exist");
        return this;
    }

    verifyLogin() {
        cy.get(navBarElements.login_button).should("exist");
        return this;
    }

    clickLogin(){
        // For Multiple Logins, sometime the loading bar covers the button
        cy.get(navBarElements.login_button).click({force: true});
        return this;
    }

    search(searchTerm){
        if(searchTerm == undefined ||  searchTerm == "") {
            cy.get(navBarElements.search_button).click()
        } else {
            cy.get(navBarElements.search_bar).type(searchTerm);
            
        }
        return this;
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