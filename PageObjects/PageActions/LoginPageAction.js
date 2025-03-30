const loginPageElements = require("../PageElements/LoginPageElements.json")

export default class LoginPageAction {
    username(username){
        cy.get(loginPageElements.UsernameField).type(username)
    }

    password(password){
        cy.get(loginPageElements.PaswordField).type(password)
    }

    login(){
        cy.get(loginPageElements.LoginButton).click()
    }

}