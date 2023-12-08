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

//login
Cypress.Commands.add("login", (username, password) => {
  cy.visit("http://localhost:3000/auth/signin");
  cy.get(".MuiPaper-elevation2").click();
  cy.get("#login-user-name").type(username);
  cy.get("#login-password").type(password);
  cy.get(".MuiButton-contained").click();
  cy.intercept("POST", "/api/auth/login").as("loginRequest");
  cy.get("form").submit();
  //   cy.wait("@loginRequest", { timeout: 10000 });
});
