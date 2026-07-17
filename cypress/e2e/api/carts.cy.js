describe('API de carrinhos', () => {
  let token;

  before(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/login`, {
      email: 'fulano@qa.com',
      password: 'teste',
    }).then((response) => {
      token = response.body.authorization;
    });
  });

  it('deve criar um carrinho', () => {
    const products = [
      { idProduto: 'BeeJh5lz3k6kSIzA', quantidade: 1 },
      { idProduto: 'K6leHdftCeOJj8BJ', quantidade: 1 },
    ];

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/carrinhos`,
      headers: { authorization: token },
      body: { produtos: products },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.exist;
    });
  });

  it('deve concluir a compra', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/carrinhos/concluir-compra`,
      headers: { authorization: token },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro excluído com sucesso');
    });
  });
});
