
import { ROUTES_NAMES } from '../../src/constants/routes';

describe('Route Name Test', () => {
  const routeName = ROUTES_NAMES.ADMIN; // Utilisez la constante de nom de route

  it(`should display the route name "${routeName}" in an h1 element`, () => {
    // Remplacez '/admin' par la route que vous souhaitez tester
    cy.visit('/admin');
    
    // Vérifiez qu'il n'y a qu'un seul élément h1
    cy.get('h1').should('have.length', 1);
    
    // Vérifiez que l'élément h1 contient le nom de la route
    cy.get('#main-title').should('not.be.empty').and('contain', routeName);
  });
});