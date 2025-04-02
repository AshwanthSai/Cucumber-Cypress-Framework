const myProfilePageElements = require("../PageElements/MyProfilePageElements.json")
const navBarElements = require("../PageElements/NavBarElements.json")

class MyProfilePageActions {
    verifyProfilePage() {
        cy.log('Verifying profile page has loaded');
        try {
            cy.url().should('include', '/me');
            cy.get(myProfilePageElements.profile_heading).should('be.visible');
            cy.get(myProfilePageElements.profile_container).should('exist');
            cy.log('Profile page verified successfully');
        } catch (e) {
            cy.log(`Error verifying profile page: ${e.message}`);
            throw new Error(`Failed to verify profile page. Original error: ${e.message}`);
        }
        return this;
    }

    verifyUpdatedName(name){
        cy.log(`Verifying name has been updated to: ${name}`);
        try {
            // Verify success message
            MyProfilePageActions.getMessage("Profile Updated Successfully");
    
            // Verify the name has been updated in the UI
            cy.get(myProfilePageElements.profile_name)
                .should('be.visible')
                .and('contain', name);  // Fixed: using parameter 'name' instead of undefined 'newName'
                
            cy.log('Profile name update verified successfully');
        } catch (e) {
            cy.log(`Error verifying updated name: ${e.message}`);
            throw new Error(`Failed to verify name update. Original error: ${e.message}`);
        }
        return this;
    }

    verifyUpdatedImage(){
        cy.log('Verifying avatar image was updated');
        try {
            // Verify success message
            MyProfilePageActions.getMessage("Avatar updated");
            
            // Verify there's a visible image with proper source URL
            cy.get(myProfilePageElements.profile_avatar)
                .should('be.visible')
                .should('have.attr', 'src')
                .and('include', 'cloudinary')
                .and('include', 'SydneyKart/avatar')  // More specific path check
                .and('not.include', 'default');
                    
            // Check image has loaded properly
            cy.get(myProfilePageElements.profile_avatar)
                .should(($img) => {
                    expect($img[0].complete).to.be.true;
                    expect($img[0].naturalWidth).to.be.greaterThan(0);
                });
                    
            cy.log('Avatar image update verified');
        } catch (e) {
            cy.log(`Error verifying avatar: ${e.message}`);
            throw new Error(`Avatar verification failed: ${e.message}`);
        }
        return this;
    }

    clickUpdateProfile(){
        cy.log('Clicking Update Profile button');
        try {
            cy.get(myProfilePageElements.update_name_button)
                .should('exist')
                .should('be.visible')
                .click();
                
            cy.log('Successfully clicked Update Profile button');
        } catch (e) {
            cy.log(`Error clicking Update Profile button: ${e.message}`);
            
            // Try alternative selectors if primary fails
            try {
                cy.contains('Update Profile').click();
                cy.log('Clicked Update Profile using text content');
            } catch (innerE) {
                cy.log(`Failed to click by text content: ${innerE.message}`);
                throw new Error(`Failed to click Update Profile button. Original error: ${e.message}`);
            }
        }
        return this;
    }

    clickUpdateProfileTab() {
        cy.log('Clicking Update Profile tab');
        try {
             // Click update button
            cy.get(myProfilePageElements.update_profile_tab)
             .should('be.visible')
             .click();
        } catch (e) {
            cy.log(`Error clicking Update Profile tab: ${e.message}`);
            // Try alternative selector if primary fails
            cy.get(myProfilePageElements.update_profile_tab_alt)
                .should('be.visible')
                .click();
        }
        return this;
    }

    clickUploadAvatar() {
        cy.log('Clicking Upload Avatar tab');
        try {
            cy.get(myProfilePageElements.upload_avatar_tab_exact)
                .click();
            
            // Verify we're on the avatar upload section/page
            cy.get(myProfilePageElements.avatar_upload_field).should('be.visible');
            cy.get(myProfilePageElements.upload_avatar_button).should('be.visible');
            cy.log('Successfully navigated to Upload Avatar section');
        } catch (e) {
            cy.log(`Error clicking Upload Avatar tab: ${e.message}`);
            // Try alternative selector if primary fails
            cy.get(myProfilePageElements.upload_avatar_tab_alt)
                .should('be.visible')
                .click();
        }
        return this;
    }

    verifyProfilePage() {
        cy.log('Verifying profile page has loaded');
        try {
            cy.url().should('include', '/me');
            cy.get(myProfilePageElements.profile_heading).should('be.visible');
            cy.get(myProfilePageElements.user_info_container).should('exist');
            cy.log('Profile page verified successfully');
        } catch (e) {
            cy.log(`Error verifying profile page: ${e.message}`);
            throw new Error(`Failed to verify profile page. Original error: ${e.message}`);
        }
        return MyProfilePageActions;
    }


    static getMessage(expectedMessage) {
        if(expectedMessage === "") {
            cy.get('body').then($body => {
                const toastExists = $body.find(navBarElements.toast_message).length > 0;
                expect(toastExists).to.be.false;
            });
        } else {
            cy.get('.Toastify', { timeout: 5000 }).within(() => {
                cy.get('.Toastify__toast--error, .Toastify__toast')
                  .should('exist')
                  .and('contain.text', expectedMessage);
            });     
        }
        return MyProfilePageActions;  
    }
    
    uploadAvatar() {
        cy.log('Uploading avatar image');
        try {
            // Make sure we're on the upload avatar tab
            if (!Cypress.$(myProfilePageElements.avatar_upload_field).length) {
                this.clickUploadAvatar();
            }
            
            cy.get(myProfilePageElements.insert_image_button)
            .selectFile('cypress/fixtures/images/profile-avatar.jpg', { force: true });
    
            cy.log('File attached successfully');
            
            // Click upload button
            cy.get(myProfilePageElements.upload_avatar_button)
                .should('be.visible')
                .click();
                
            // Verify success message
            MyProfilePageActions.getMessage("Avatar updated");
            cy.log('Avatar uploaded successfully');
        } catch (e) {
            cy.log(`Error uploading avatar: ${e.message}`);
            throw new Error(`Failed to upload avatar. Original error: ${e.message}`);
        }
        return this;
    }
    
    updateProfileName(newName) {
        cy.log(`Updating profile name to: ${newName}`);
        try {
            // First ensure we're on the update profile section
            if (!Cypress.$(myProfilePageElements.name_field).length) {
                this.clickUpdateProfile();
            }
            
            // Update the name field
            cy.get(myProfilePageElements.name_field)
                .should('be.visible')
                .clear()
                .type(newName);

        } catch (e) {
            cy.log(`Error updating profile name: ${e.message}`);
            throw new Error(`Failed to update profile name. Original error: ${e.message}`);
        }
        return this;
    }
}

module.exports = MyProfilePageActions;