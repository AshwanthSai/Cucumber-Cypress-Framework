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

    search(searchTerm){
        cy.get(navBarElements.search_bar).type(searchTerm);
        return this;
    }
}

module.exports = NavBarActions;