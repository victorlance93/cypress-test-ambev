class ProductPage {
  openRegistration() {
    cy.get('[data-testid="cadastrarProdutos"]').click();
  }

  fillName(name) {
    cy.get('[data-testid="nome"]').type(name);
  }

  fillPrice(price) {
    cy.get('[data-testid="preco"]').type(price);
  }

  fillDescription(description) {
    cy.get('[data-testid="descricao"]').type(description);
  }

  fillQuantity(quantity) {
    cy.get('[data-testid="quantity"]').type(quantity);
  }

  selectImage(imagePath) {
    cy.get('[data-testid="imagem"]').selectFile(imagePath);
  }

  submit() {
    cy.get('[data-testid="cadastarProdutos"]').click();
  }

  registerProduct(product) {
    this.fillName(product.name);
    this.fillPrice(product.price);
    this.fillDescription(product.description);
    this.fillQuantity(product.quantity);
    this.selectImage(product.imagePath);
    this.submit();
  }
}

export default new ProductPage();
