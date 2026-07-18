describe('API de usuários', () => {
  it('deve realizar login e listar todos os usuários', () => {
    cy.createApiUser('true').then((admin) => {
      cy.loginByApi(admin).then((authorization) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env('apiUrl')}/usuarios`,
          headers: {
            authorization,
          },
        }).then((usersResponse) => {
          expect(usersResponse.status).to.eq(200);
          expect(usersResponse.body.quantidade).to.be.a('number');
          expect(usersResponse.body.usuarios).to.be.an('array');
        });
      });
    });
  });

  it('deve retornar erro ao buscar um usuário inexistente', () => {
    const userId = '0uxuPY0cbmQhpEz5';

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Usuário não encontrado');
    });
  });
});
