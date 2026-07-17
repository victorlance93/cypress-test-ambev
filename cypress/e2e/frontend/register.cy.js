import registerPage from '../../pagesObejcts/RegisterPage';
import { createUser } from '../../utils/userFactory';

describe('Cadastro de usuário', () => {
  it('deve cadastrar um novo usuário com sucesso', () => {
    const user = createUser();

    registerPage.visit();
    registerPage.registerUser(user);

    cy.url().should('include', '/home');
  });
});