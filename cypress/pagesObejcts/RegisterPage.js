class RegisterPage {
  visit() {
    cy.visit('/cadastrarusuarios');
  }

  fillName(name) {
    cy.get('[data-testid="nome"]').type(name);
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').type(email);
  }

  fillPassword(password) {
    cy.get('[data-testid="password"]').type(password);
  }

  submit() {
    cy.get('[data-testid="cadastrar"]').click();
  }

  registerUser(user) {
    this.fillName(user.name);
    this.fillEmail(user.email);
    this.fillPassword(user.password);
    this.submit();
  }
}

export default new RegisterPage();