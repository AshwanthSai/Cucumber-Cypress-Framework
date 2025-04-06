const loginPageElements = require("../PageElements/LoginPageElements.json")

class LoginPageActions {
    formLoaded() {
        cy.log('Verifying login form is loaded');
        try {
            cy.get(loginPageElements.login_form).should("exist");
            cy.log('Login form loaded successfully');
        } catch (e) {
            cy.log(`Error verifying login form: ${e.message}`);
            throw new Error(`Failed to verify login form. Original error: ${e.message}`);
        }
        return this;
    }

    enterEmail(email) {
        cy.log(`Entering email: ${email || '[empty]'}`);
        try {
            if (email === '') {
                // Clear the field and do not type anything
                cy.get(loginPageElements.email_field)
                  .clear({force: true})
                  .blur({force: true});
            } else {
                // Clear and type email for non-empty values
                cy.get(loginPageElements.email_field)
                  .clear({force: true})
                  .type(email, {force: true});
            }
            cy.log('Email entered successfully');
        } catch (e) {
            cy.log(`Error entering email: ${e.message}`);
            throw new Error(`Failed to enter email. Original error: ${e.message}`);
        }
        return this;
    }

    enterPassword(password) {
        cy.log(`Entering password: ${password ? '********' : '[empty]'}`);
        try {
            if (password === '') {
                // Clear the field and do not type anything
                cy.get(loginPageElements.password_field)
                  .clear({force: true})
                  .blur({force: true});
            } else {
                // Clear and type password for non-empty values
                cy.get(loginPageElements.password_field)
                  .clear({force: true})
                  .type(password, {force: true});
            }
            cy.log('Password entered successfully');
        } catch (e) {
            cy.log(`Error entering password: ${e.message}`);
            throw new Error(`Failed to enter password. Original error: ${e.message}`);
        }
        return this;
    }

    clickLogin() {
        cy.log('Clicking login button');
        try {
            cy.get(loginPageElements.login_button).click({force: true});
            // Adding explicit wait after login to allow for redirect/processing
            cy.log('Login button clicked successfully');
        } catch (e) {
            cy.log(`Error clicking login button: ${e.message}`);
            throw new Error(`Failed to click login button. Original error: ${e.message}`);
        }
        return this;
    }

    getMessage(expectedMessage) {
        cy.log(`Checking for message: "${expectedMessage || '[none]'}"`);
        
        if(expectedMessage === "") {
            // Check that no toast messages appear
            cy.get('body').then($body => {
                const toastExists = $body.find('.Toastify__toast').length > 0;
                expect(toastExists).to.be.false;
            });
            cy.log('Verified no toast messages are present');
        } else {
            // Pause toast animations before they can disappear
            cy.window().then((win) => {
                win.document.querySelectorAll('.Toastify__progress-bar').forEach(el => {
                    el.style.animationPlayState = 'paused';
                    el.style.WebkitAnimationPlayState = 'paused';
                });
                
                // Optional: Override close timeout
                if (win.Toastify) {
                    win.Toastify.autoCloseDelay = 99999;
                }
            });
            
            // Now check for the toast message
            cy.get('.Toastify__toast', { timeout: 10000 })
                .should('be.visible')
                .and('contain.text', expectedMessage);
            
            cy.log(`Found toast message containing: "${expectedMessage}"`);
        }
        
        return this;
    }

    verifyRedirectAction(redirect_action) {
        cy.log(`Verifying redirect action: ${redirect_action}`);
        try {
            if(redirect_action === "Redirect to Home") {
                cy.url().should('eq', Cypress.env('BASE_URL') || 'https://portfoliosai.link/sydneykart');
                cy.log('Verified redirect to home page');
            } else {
                cy.url().should('eq', `${Cypress.env('BASE_URL') || 'https://portfoliosai.link/sydneykart'}login`);
                cy.log('Verified staying on login page');
            }
        } catch (e) {
            cy.log(`Error verifying redirect: ${e.message}`);
            throw new Error(`Failed to verify redirect. Original error: ${e.message}`);
        }
        return this;
    }

    loginAsRegisteredUser() {
        // Get credentials directly from Cypress environment variables
        const defaultEmail = Cypress.env('DEFAULT_USER_EMAIL') || 'test@admin.com';
        const defaultPassword = Cypress.env('DEFAULT_USER_PASSWORD') || 'test@admin.com';
        const baseUrl = Cypress.env('BASE_URL') || 'https://portfoliosai.link/sydneykart/';
    
        cy.log(`Logging in as registered user: ${defaultEmail}`);
        try {
            this.enterEmail(defaultEmail)
                .enterPassword(defaultPassword)
                .clickLogin();
            cy.log('Registered user login attempt completed');
            
            // Wait for URL to change to home page (with trailing slash)
            cy.url({ timeout: 10000 }).should('eq', baseUrl);
            cy.log(`Successfully redirected to home page: ${baseUrl}`);
        } catch (e) {
            cy.log(`Error during registered user login: ${e.message}`);
            throw new Error(`Failed to login as registered user. Original error: ${e.message}`);
        }
        return this;
    }
}

module.exports = LoginPageActions;