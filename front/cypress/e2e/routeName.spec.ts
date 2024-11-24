
import { ROUTES_NAMES } from '../../src/constants/routes';

describe('Route Name Test', () => {
  const routeName = ROUTES_NAMES.ADMIN_LOGIN;

  it(`should display the route name "${routeName}" in an h1 element`, () => {
    
    cy.visit('/login');
    
    cy.get('h1').should('have.length', 1);
    
    cy.get('#main-title').should('not.be.empty').and('contain', routeName);
  });
});