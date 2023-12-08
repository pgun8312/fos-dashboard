describe("FOS dahsboard end to end testing", () => {
  it("Should create a user", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.get("[data-testid=login-signup-btn]").click();
    cy.get("#SignUp-first-name").type("Pasindu Deshan");
    cy.get("#SignUp-last-name").type("Gunawardana");
    cy.get("#SignUp-email").type("pasindu.gunawardana4@mail.com");
    cy.get("#SignUp-user-name").type("PasinduGunawardana4");
    cy.get("#SignUp-password").type("Sysco1234@");
    cy.get("#SignUp-phone-number").type("0773241574");
    cy.get("[data-testid=signup-btn]").click();
    cy.get("form").submit();
    cy.get("[data-testid=login-goto-confirm-signup-btn").click();
    cy.get("#SignUp-user-name").type("PasinduGunawardana");
    cy.get("#SignUp-confirmation-code").type("607693");
    cy.get("[data-testid=login-confirm-signup-btn]").click();
    cy.get("form").submit();
    cy.wait(5000);
  });

  it("Should login and change the color mode", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.login("PasinduGunawardana", "Sysco1234@");
    cy.get("[data-testid=menu-theme-button", {
      timeout: 15000,
    }).click();
    cy.wait(1000);
  });

  it("should add items to the cart and place an order", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.login("PasinduGunawardana", "Sysco1234@");

    // Navigate to the product page or wherever you add items to the cart
    cy.get("[data-testid=shell-frontend-productcard-extra-btn-open-1]", {
      timeout: 15000,
    }).click();
    // Add items to the cart
    cy.get("[data-testid=shell-frontend-productcard-addto-cart-btn-1]").click();

    cy.get("[data-testid=menu-cart-button]").click();

    // Wait for the checkout button to be enabled and then click
    cy.get("[data-testid=shell-frontend-cart-checkout-btn]")
      .should("not.be.disabled")
      .click();
    cy.wait(10000);
    cy.get("[data-testid=checkout-total-price-lbl]").should("contain", "$8.99");
    cy.get("[data-testid=checkout-place-order-btn]").click();
  });

  it("Should login and view the orders", () => {
    cy.visit("http://localhost:3000/auth/signin");
    cy.login("PasinduGunawardana1", "Sysco1234@");

    cy.wait(15000);
    cy.get("[data-testid=sidebar-nav-4]").should("not.be.disabled").click();
    cy.wait(5000);
    cy.get("[data-testid=my-orders-view-order-36]").click();
    cy.wait(10000);
  });
});
