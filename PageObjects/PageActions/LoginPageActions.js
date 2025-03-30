const navBarElements = require("../PageElements/NavBarElements.json")
const homePageElements = require("../PageElements/HomePageElements.json")
const loginPageElements = require("../PageElements/LoginPageElements.json")

class LoginPageActions {

    enterEmail(email){
        cy.get(loginPageElements.email_field).clear().type(email)
        return this;

    }
    enterPassword(password){
        cy.get(loginPageElements.password_field).clear().type(password);
        return this;
    }

    clickLogin(){
        cy.get(loginPageElements.login_button).click();
        return this;
    }
    
    formLoaded() {
        cy.get(loginPageElements.login_form).should("exist");
        return this;
    }

    getMessage(expectedMessage) {
        if(expectedMessage == ""){
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

    verifyRedirectAction(redirect_action){
        console.log(redirect_action)
        if(redirect_action === "Redirect to Home"){
            cy.url().should('eq', 'https://portfoliosai.link/sydneykart/');
        } else{
            cy.url().should('eq', 'https://portfoliosai.link/sydneykart/login');
        }
        return this;
    }

}

module.exports = LoginPageActions;