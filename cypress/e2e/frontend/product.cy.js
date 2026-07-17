import loginPage from '../../pagesObjects/LoginPage';
import productPage from '../../pagesObjects/ProductPage';
import { createProduct } from '../../utils/productFactory';

describe('Cadastro de produto como administrador', () => {
  it('deve cadastrar um novo produto com imagem', () => {
    const product = {
      ...createProduct(),
      description: 'Produto cadastrado para o teste da Ambev',
      imagePath: 'cypress/fixtures/images/produto.jpg',
    };

    loginPage.visit();
    loginPage.login('fulano@qa.com', 'teste');

    productPage.openRegistration();
    productPage.registerProduct(product);

    cy.url().should('include', '/listarprodutos');
    cy.contains(product.name).should('be.visible');
  });

  it('não deve cadastrar produto sem preencher os campos obrigatórios', () => {
    loginPage.visit();
    loginPage.login('fulano@qa.com', 'teste');

    productPage.openRegistration();
    productPage.submit();

    cy.url().should('include', '/cadastrarprodutos');
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('Preco é obrigatório').should('be.visible');
    cy.contains('Descricao é obrigatório').should('be.visible');
    cy.contains('Quantidade é obrigatório').should('be.visible');
  });
});
