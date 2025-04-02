const navBarElements = require("../PageElements/NavBarElements.json")
const homePageElements = require("../PageElements/HomePageElements.json")
const loginPageElements = require("../PageElements/LoginPageElements.json")

class LoginPageActions {
    formLoaded() {
        cy.get(loginPageElements.login_form).should("exist");
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
        } catch (e) {
            cy.log(`Error entering email: ${e.message}`);
            throw e;
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
        } catch (e) {
            cy.log(`Error entering password: ${e.message}`);
            throw e;
        }
        return this;
    }

    clickLogin() {
        cy.get(loginPageElements.login_button).click({force: true});
        return this;
    }

    getMessage(expectedMessage) {
        if(expectedMessage === "") {
            cy.get('body').then($body => {
                const toastExists = $body.find('.Toastify__toast').length > 0;
                expect(toastExists).to.be.false;
            });
        } else {
            cy.get('.Toastify', { timeout: 5000 }).within(() => {
                cy.get('.Toastify__toast--error, .Toastify__toast')
                  .should('exist')
                  .and('contain.text', expectedMessage);
            });
        }
        return this;  
    }

    verifyRedirectAction(redirect_action) {
        cy.log(`Verifying redirect action: ${redirect_action}`);
        if(redirect_action === "Redirect to Home") {
            cy.url().should('eq', Cypress.env('BASE_URL') || 'https://portfoliosai.link/sydneykart/');
        } else {
            cy.url().should('eq', `${Cypress.env('BASE_URL') || 'https://portfoliosai.link/sydneykart'}/login`);
        }
        return this;
    }

    loginAsRegisteredUser() {
        const defaultEmail = Cypress.env('DEFAULT_USER_EMAIL') || 'test@admin.com';
        const defaultPassword = Cypress.env('DEFAULT_USER_PASSWORD') || 'test@admin.com';
        
        cy.log(`Logging in as registered user: ${defaultEmail}`);
        
        this.enterEmail(defaultEmail)
            .enterPassword(defaultPassword)
            .clickLogin();
            
        return this;
    }
}

module.exports = LoginPageActions;