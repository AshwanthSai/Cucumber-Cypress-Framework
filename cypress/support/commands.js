// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

beforeEach(() => {
    cy.task('deleteDownloads');
  });
  
  // Simple helper to check if a file exists in downloads
  Cypress.Commands.add('fileExists', (filename) => {
    cy.task('listFiles').then(files => {
      if (filename) {
        return cy.wrap(files.includes(filename));
      } else {
        // Just check if any file exists
        return cy.wrap(files.length > 0);
      }
    });
  });

