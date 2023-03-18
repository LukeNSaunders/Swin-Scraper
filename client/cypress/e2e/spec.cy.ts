
const user = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password123',
};

const baseUrl = "http://localhost:5173"

describe('Register', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/register`);
  });
  
  it('should register a new user', () => {

    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();

    // Assert that user is redirected to dashboard after successful registration
    cy.url().should('include', '/');
    
  });
});

describe('Login', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}`);
  });

  it('should display the login form', () => {
    cy.contains('h2', 'Login');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should log in the user', () => {
    const user = {
      email: 'testuser@example.com',
      password: 'password123',
    };

    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();

    // Assert that user is redirected to dashboard after successful login
  
    cy.window().its('localStorage.token').should('exist');
    cy.url().should('include', `${baseUrl}/dashboard`);

    // Assert that user data is displayed on the dashboard
   
    // Assert that a token is created in localStorage
    
  });
});