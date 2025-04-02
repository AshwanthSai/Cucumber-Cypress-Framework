// Navigation
Given("I navigate to my account profile page", () => {
    navBarActions.navigateToMyProfile()
})

// Profile Tab Navigation
When("I select the Upload Avatar option", () => {
    myProfileActions.clickUploadAvatar()
})

When("I click on the Update Profile button", () => {
    myProfileActions.clickUpdateProfileTab()
})

// Profile Updates
When("I upload a valid image file profile.jpg", () => {
    myProfileActions.uploadAvatar()
})

When("I enter a new name {string} in the name field", (name) => {
    myProfileActions.updateProfileName(name)
})

// Action Buttons
Then("I click on the upload button", () => {
    myProfileActions.clickSubmitAvatarUpload()
})

When("I click on the Update button", () => {
    myProfileActions.clickUpdateProfile()
})

// Verifications
Then("I should be navigated to Profile Page", () => {
    myProfileActions.verifyProfilePage();
})

Then("I should see my name updated to {string}", (name) => {
    myProfileActions.verifyUpdatedName(name);
})

Then("my profile picture should be updated with the new image", () => {
    myProfileActions.verifyUpdatedImage();
})