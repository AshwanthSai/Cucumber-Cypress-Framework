import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getPageObject } from "../common/hooks";

// Navigation
Given("I navigate to my account profile page", function() {
    cy.log('Navigating to account profile page');
    getPageObject('navBarActions').navigateToMyProfile();
});

// Profile Tab Navigation
When("I select the Upload Avatar option", function() {
    cy.log('Selecting Upload Avatar option');
    getPageObject('myProfileActions').clickUploadAvatar();
});

When("I click on the Update Profile button", function() {
    cy.log('Clicking Update Profile button');
    getPageObject('myProfileActions').clickUpdateProfileTab();
});

// Profile Updates
When("I upload a valid image file profile.jpg", function() {
    cy.log('Uploading profile image');
    getPageObject('myProfileActions').uploadAvatar();
});

When("I enter a new name {string} in the name field", function(name) {
    cy.log(`Entering new name: "${name}"`);
    getPageObject('myProfileActions').updateProfileName(name);
});

// Action Buttons
Then("I click on the upload button", function() {
    cy.log('Clicking upload button');
    getPageObject('myProfileActions').clickSubmitAvatarUpload();
});

When("I click on the Update button", function() {
    cy.log('Clicking Update button');
    getPageObject('myProfileActions').clickUpdateProfile();
});

// Verifications
Then("I should be navigated to Profile Page", function() {
    cy.log('Verifying navigation to Profile Page');
    getPageObject('myProfileActions').verifyProfilePage();
});

Then("I should see my name updated to {string}", function(name) {
    cy.log(`Verifying name updated to "${name}"`);
    getPageObject('myProfileActions').verifyUpdatedName(name);
});

Then("my profile picture should be updated with the new image", function() {
    cy.log('Verifying profile picture updated');
    getPageObject('myProfileActions').verifyUpdatedImage();
});