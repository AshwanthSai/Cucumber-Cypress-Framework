const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const {createEsbuildPlugin} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
    "video": false,
    "screenshotOnRunFailure": true,
    "pageLoadTimeout": 30000,
    "env": {
        "BASE_URL": "https://portfoliosai.link/sydneykart/",
        "DEFAULT_USER_EMAIL": "test@admin.com",
        "DEFAULT_USER_PASSWORD": "test@admin.com",
        "HEADPHONE_PRODUCT_LINK": "https://portfoliosai.link/sydneykart/products/67c0abf0edeeb56a059d6f89",
    }
  },
});