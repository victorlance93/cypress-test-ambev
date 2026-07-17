import loginPage from '../../pagesObjects/LoginPage';
import { createApiUser } from '../../utils/userFactory';

describe('Login de administrador', () => {
  it('deve acessar a lista de usuários', () => {
    const admin = createApiUser('true');

    cy.request('POST', `${Cypress.env('apiUrl')}/usuarios`, admin);

    loginPage.visit();
    loginPage.login(admin.email, admin.password);
    loginPage.listUsers();

    cy.url().should('include', '/listarusuarios');
    cy.contains('Lista dos usuários').should('be.visible');
  });

  it('não deve fazer login com credenciais inválidas', () => {
    loginPage.visit();
    loginPage.login('errado@errado.com', '123456');

    cy.url().should('include', '/login');
    cy.contains('Email e/ou senha inválidos').should('be.visible');
  });
});
