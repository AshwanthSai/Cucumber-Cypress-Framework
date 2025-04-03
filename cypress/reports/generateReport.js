const report = require("multiple-cucumber-html-reporter");
const fs = require('fs');
const path = require('path');
const os = require('os');

// Get current date and time
const now = new Date();
const startTime = new Date(now - 30 * 60000); // Assume test started 30 minutes ago
const formattedStartTime = startTime.toLocaleString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric', 
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
});
const formattedEndTime = now.toLocaleString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric', 
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
});

// Get browser info - this is a simplification, you can make it more robust
let browserName = "chrome"; // Default
let browserVersion = "latest";

// Try to read browser info from cypress.json
try {
  const cypressConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cypress.config.js'), 'utf8'));
  if (cypressConfig.browser) {
    browserName = cypressConfig.browser.name || browserName;
    browserVersion = cypressConfig.browser.version || browserVersion;
  }
} catch (e) {
  console.log('Could not determine browser from cypress.json');
}

// Get OS info
const platform = {
  name: os.platform(),
  version: os.release()
};

// Get package.json information
let projectName = "SydneyKart";
let projectVersion = "1.0.0";

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  projectName = packageJson.name || projectName;
  projectVersion = packageJson.version || projectVersion;
} catch (e) {
  console.log('Could not read package.json');
}

// Generate a timestamp-based cycle ID
const cycleId = `CY-${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;

report.generate({
  jsonDir: "./cypress/reports/",
  reportPath: "./cypress/reports/dashboard/",
  metadata: {
    browser: {
      name: browserName,
      version: browserVersion
    },
    device: os.hostname(),
    platform: {
      name: platform.name,
      version: platform.version
    },
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: projectName },
      { label: "Release", value: projectVersion },
      { label: "Cycle", value: cycleId },
      { label: "Execution Start Time", value: formattedStartTime },
      { label: "Execution End Time", value: formattedEndTime },
      { label: "Environment", value: process.env.NODE_ENV || 'development' }
    ],
  },
});