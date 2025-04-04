const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const fs = require('fs');
const path = require('path');

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

      // Simple file tasks
      on('task', {
        listFiles() {
          const downloadsFolder = path.join(__dirname, 'cypress/downloads');
          if (!fs.existsSync(downloadsFolder)) {
            fs.mkdirSync(downloadsFolder, { recursive: true });
            return [];
          }
          return fs.readdirSync(downloadsFolder);
        },
        
        deleteDownloads() {
          const downloadsFolder = path.join(__dirname, 'cypress/downloads');
          if (fs.existsSync(downloadsFolder)) {
            fs.readdirSync(downloadsFolder).forEach(file => {
              fs.unlinkSync(path.join(downloadsFolder, file));
            });
          }
          return null;
        }
      });

      return config;
    },
    "chromeWebSecurity": false,
    "viewportWidth": 1280,
    "viewportHeight": 720,
    "defaultCommandTimeout": 10000, // Global Time Out Period
    "download": {
      "directory": "./cypress/downloads"
    },
    "video": false,
    "screenshotOnRunFailure": true,
    "pageLoadTimeout": 30000,
    "env": {
        "BASE_URL": "https://portfoliosai.link/sydneykart/",
        "DEFAULT_USER_EMAIL": "test@admin.com",
        "DEFAULT_USER_PASSWORD": "test@admin.com",
        "HEADPHONE_PRODUCT_LINK": "https://portfoliosai.link/sydneykart/products/67c0abf0edeeb56a059d6f89",
        "HEADPHONE_NAME": "Bose QuietComfort 35 II Wireless Bluetooth Headphones",
    },
  },
});