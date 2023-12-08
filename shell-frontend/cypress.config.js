const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Use external cypress reporter wich support by sonarqube
  reporter: "cypress-sonarqube-reporter",
  reporterOptions: {
    // specify the output directory for the Cypress SonarQube Reporter
    outputDir: path.resolve(__dirname, "cypress/results"),
    overwrite: true,
  },
});
