const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Use the Cypress built-in junit reporter
  reporter: "junit",
  reporterOptions: {
    // specify the output directory
    mochaFile: path.resolve(__dirname, "cypress/results/test-results.xml"),
  },
});
