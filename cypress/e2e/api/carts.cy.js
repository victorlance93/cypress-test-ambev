describe('API de carrinhos', () => {
  it('deve criar um carrinho e concluir a compra', () => {
    const products = [
      { idProduto: 'BeeJh5lz3k6kSIzA', quantidade: 1 },
      { idProduto: 'K6leHdftCeOJj8BJ', quantidade: 1 },
    ];

    cy.createApiUser().then((user) => {
      cy.loginByApi(user).then((authorization) => {
        const headers = { authorization };

        cy.request({
          method: 'POST',
          url: `${Cypress.env('apiUrl')}/carrinhos`,
          headers,
          body: { produtos: products },
        }).then((cartResponse) => {
          expect(cartResponse.status).to.eq(201);
          expect(cartResponse.body.message).to.eq('Cadastro realizado com sucesso');
          expect(cartResponse.body._id).to.exist;
        });

        cy.request({
          method: 'DELETE',
          url: `${Cypress.env('apiUrl')}/carrinhos/concluir-compra`,
          headers,
        }).then((checkoutResponse) => {
          expect(checkoutResponse.status).to.eq(200);
          expect(checkoutResponse.body.message).to.eq('Registro excluído com sucesso');
        });
      });
    });
  });
});
