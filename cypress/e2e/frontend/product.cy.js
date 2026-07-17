import loginPage from '../../pagesObejcts/LoginPage';
import productPage from '../../pagesObejcts/ProductPage';
import { createProduct } from '../../utils/productFactory';

describe('Cadastro de produto como administrador', () => {
  it('deve cadastrar um novo produto com imagem', () => {
    const product = {
      ...createProduct(),
      description: 'Produto cadastrado para o teste da Ambev',
      imagePath: 'cypress/fixtures/images/produto.jpg',
    };

    loginPage.visit();
    loginPage.login('qa_test_PU7XbLaptC@teste.com', '123456');

    productPage.openRegistration();
    productPage.registerProduct(product);

    cy.url().should('include', '/listarprodutos');
    cy.contains(product.name).should('be.visible');
  });
});
