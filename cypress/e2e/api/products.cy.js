import { faker } from '@faker-js/faker';
import { createApiUser } from '../../utils/userFactory';

describe('API de produtos', () => {
  let token;

  before(() => {
    const admin = createApiUser('true');

    cy.request('POST', `${Cypress.env('apiUrl')}/usuarios`, admin);

    cy.request('POST', `${Cypress.env('apiUrl')}/login`, {
      email: admin.email,
      password: admin.password,
    }).then((response) => {
      token = response.body.authorization;
    });
  });

  it('deve alterar o preço de um produto', () => {
    const productId = 'BeeJh5lz3k6kSIzA';
    const newPrice = faker.number.int({ min: 100, max: 1000 });

    cy.request('GET', `${Cypress.env('apiUrl')}/produtos/${productId}`).then((productResponse) => {
      const product = productResponse.body;

      cy.request({
        method: 'PUT',
        url: `${Cypress.env('apiUrl')}/produtos/${productId}`,
        headers: { authorization: token },
        body: {
          nome: product.nome,
          preco: newPrice,
          descricao: product.descricao,
          quantidade: product.quantidade,
        },
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.message).to.eq('Registro alterado com sucesso');
      });

      cy.request('GET', `${Cypress.env('apiUrl')}/produtos/${productId}`).then((updatedProductResponse) => {
        expect(updatedProductResponse.body.preco).to.eq(newPrice);
      });
    });
  });
});
