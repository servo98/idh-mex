describe("Testing Main component with mocked data", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept(
      "GET",
      "http://127.0.0.1:5001/idh-mex/us-central1/getIDHRecords",
      {
        fixture: "getIDHRecords.json",
      }
    ).as("getIDHRecords");
  });

  it("should render the Main component", () => {
    cy.get("#state-selected");
  });

  it("Should fill data table", () => {
    cy.wait("@getIDHRecords");
    cy.get("div.MuiTableContainer-root")
      .find("tbody tr")
      .should("have.length", 2);
  });

  it("Should found state with auto select", () => {
    cy.wait("@getIDHRecords");

    cy.get("#state-selected").click();
    cy.focused().type("Agua");
    cy.contains("Aguascalientes")
      .should("be.visible")
      .and("have.class", "MuiAutocomplete-option")
      .click();

    cy.contains("2017").should("be.visible");
  });

  it("Should open modal when clic on edit button", () => {
    cy.wait("@getIDHRecords");

    cy.get('[test-id="edit-button"]').first().should("be.visible").click();
    cy.contains("0.5");
  });
});
