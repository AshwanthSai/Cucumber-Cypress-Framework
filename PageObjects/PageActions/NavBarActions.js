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
        cy.get(navBarElements.login_button).click();
        return this;

    }

    search(searchTerm){
        if(searchTerm == undefined ) {
            cy.get(navBarElements.search_button).click()
        } else {
            cy.get(navBarElements.search_bar).type(searchTerm);
            
        }
        return this;
    }
}

module.exports = NavBarActions;