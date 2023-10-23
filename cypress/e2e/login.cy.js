
describe('Login Test', () => {

      
  beforeEach(() => {              //This chunk will learn before every test
    cy.viewport(2560, 1551);
    // Visit the login page before each test
    cy.visit(Cypress.env('baseURL')) // Login 
  })

  it('Verify if the Login Button is enabled, when username and password is entered (KAN-TC-1)', () => { 
    
    cy.get('input[name="username"]').click(); 
    cy.get("input[type='password']").click();
    cy.get('.mat-mdc-button-touch-target').should('not.be.enabled'); //Assertion that login button is not enabled with empty username and password
  });

  it('Log in with Correct Credentials (KAN-TC-2)', () => {
    cy.get('input[name="username"]').type(Cypress.env('username')); // Replace with your username
    cy.get("input[type='password']").type(Cypress.env('password')); //Replace with password
    cy.get('.mdc-button__label').click(); //clicking the login button
    cy.wait(1000);
    // Assert that the user is redirected to the navigation page
    cy.url().should('include', '/dashboard'); //Successful login will lands on http://localhost:4200/navigation
  });

  it('Verifying the Loader while loging In', () => {
    cy.get('input[name="username"]').type(Cypress.env('username')); // Replace with your username
    cy.get("input[type='password']").type(Cypress.env('password')); //Replace with password
    cy.get('.mdc-button__label').click();
    // Assert that the user is redirected to the dashboard or a logged-in state
    cy.get('.la-3x > :nth-child(1)').should('exist'); //assertion to check if the loader is being shown
  });

  it('Getting Error with Wrong Credentials', () => {  
    cy.get('input[name="username"]').type('wrong_username'); // Replace with your incorrect username 
    cy.get("input[type='password']").type("wrongpassword");
    cy.get('.mdc-button__label').click();
    cy.wait(1000);
    // Assert that the Error message is displayed
    cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should("exist");//Assertion to check Error Message is shown
    
  });
 });
 

  
