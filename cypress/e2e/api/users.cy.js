describe('API de usuários', () => {
  it('deve realizar login e listar todos os usuários', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      body: {
        email: 'fulano@qa.com',
        password: 'teste',
      },
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      expect(loginResponse.body.authorization).to.be.a('string').and.not.be.empty;

      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/usuarios`,
        headers: {
          authorization: loginResponse.body.authorization,
        },
      }).then((usersResponse) => {
        expect(usersResponse.status).to.eq(200);
        expect(usersResponse.body.quantidade).to.be.a('number');
        expect(usersResponse.body.usuarios).to.be.an('array');
      });
    });
  });
});
