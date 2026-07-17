class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').type(email);
  }

  fillPassword(password) {
    cy.get('[data-testid="senha"]').type(password);
  }

  submit() {
    cy.get('[data-testid="entrar"]').click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }

  listUsers() {
    cy.get('[data-testid="listarUsuarios"]').click();
  }
}

export default new LoginPage();
