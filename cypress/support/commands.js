import { createApiUser as buildApiUser } from '../utils/userFactory';

Cypress.Commands.add('createApiUser', (administrator = 'false', overrides = {}) => {
  const user = {
    ...buildApiUser(administrator),
    ...overrides,
  };

  return cy
    .request('POST', `${Cypress.env('apiUrl')}/usuarios`, user)
    .then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');

      return {
        ...user,
        _id: response.body._id,
      };
    });
});

Cypress.Commands.add('loginByApi', (user) => {
  return cy
    .request('POST', `${Cypress.env('apiUrl')}/login`, {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authorization).to.be.a('string').and.not.be.empty;

      return response.body.authorization;
    });
});
