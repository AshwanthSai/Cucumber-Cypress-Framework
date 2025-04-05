const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
        },
        waitForDownload(filePattern, timeout = 10000) {
          return new Promise((resolve, reject) => {
            const downloadsFolder = path.join(__dirname, 'cypress/downloads');
            
            // Start time for timeout tracking
            const startTime = Date.now();
            
            // Check function that will be called repeatedly
            const checkForFile = () => {
              // Check if timeout exceeded
              if (Date.now() - startTime > timeout) {
                return reject(new Error(`Timed out waiting for download: ${filePattern}`));
              }
              
              // List files in downloads folder
              if (fs.existsSync(downloadsFolder)) {
                const files = fs.readdirSync(downloadsFolder);
                const matchingFile = files.find(filename => {
                  return filename.includes(filePattern) || 
                         new RegExp(filePattern).test(filename);
                });
                
                if (matchingFile) {
                  // File found! Wait a bit more to ensure it's fully written
                  setTimeout(() => {
                    resolve(matchingFile);
                  }, 500);
                  return;
                }
              }
              
              // File not found yet, check again after a delay
              setTimeout(checkForFile, 500);
            };
            
            // Start checking
            checkForFile();
          });
        },
        // Check if file exists in downloads folder
        checkFileExists(filename) {
          const filePath = path.join(__dirname, 'cypress/downloads', filename);
          return fs.existsSync(filePath);
        },
        
        // Get file size
        getFileSize(filename) {
          const filePath = path.join(__dirname, 'cypress/downloads', filename);
          if (!fs.existsSync(filePath)) return 0;
          const stats = fs.statSync(filePath);
          return stats.size;
        },
        
        // Calculate file checksum
        getFileChecksum(filename) {
          const filePath = path.join(__dirname, 'cypress/downloads', filename);
          if (!fs.existsSync(filePath)) return '';
          
          const fileBuffer = fs.readFileSync(filePath);
          const hashSum = crypto.createHash('sha256');
          hashSum.update(fileBuffer);
          return hashSum.digest('hex');
        }
      });

      return config;
    },
    // Rest of your config remains the same
    "chromeWebSecurity": false,
    // other settings...
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