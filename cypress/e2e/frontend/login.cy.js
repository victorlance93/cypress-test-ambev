import loginPage from '../../pagesObejcts/LoginPage';

describe('Login de administrador', () => {
  it('deve acessar a lista de usuários', () => {
    loginPage.visit();
    loginPage.login('qa_test_PU7XbLaptC@teste.com', '123456');
    loginPage.listUsers();

    cy.url().should('include', '/listarusuarios');
    cy.contains('Lista dos usuários').should('be.visible');
  });
});
