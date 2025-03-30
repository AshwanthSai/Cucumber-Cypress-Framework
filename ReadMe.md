# Cucumber Cypress Automation Framework

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Cypress (installed as a project dependency)

To install Cypress and other dependencies, run:

```sh
npm install
```

## Running Cypress Tests

### Running Tests in Different Modes

#### Run Headless Mode
To run Cypress in headless mode, use the following command:

```sh
npm run headless --tags=smoke
```

#### Run Headed Mode
To run Cypress in headed mode, use the following command:

```sh
npm run headed --tags=smoke
```

## Viewing the Test Report

To generate and view the test report, use the command:

```sh
npm run report
```

### Running a Live Server for the Cypress Report

1. Navigate to the report directory:

   ```sh
   cd Cypress/Report
   ```

2. Open `index.html` in a browser or run a local server:

   ```sh
   npx http-server
   ```

## Contributing

Feel free to open an issue or submit a pull request if you find any improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
