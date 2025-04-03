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
    "defaultCommandTimeout": 10000,
    "download": {
      "directory": "./cypress/downloads"
    }
  },
});