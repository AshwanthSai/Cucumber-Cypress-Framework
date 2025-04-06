# Cucumber-Cypress Test Framework
![Screenshot 2025-04-04 033143](https://github.com/user-attachments/assets/8ae14cd1-74e5-4963-8738-0f2cf2bb6095)

![contributions](https://img.shields.io/badge/all_contributors-1-orange.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=shields)
[![website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://ec2-51-21-44-213.eu-north-1.compute.amazonaws.com/sydneyflix/)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)


## Overview
To showcase my expertise in Behavior-Driven Development (BDD) and testing, I developed a **Cucumber-Cypress Test Automation Framework** for the e-commerce website **[Sydney Kart](https://portfoliosai.link/sydneykart/)**. This project demonstrates various testing methodologies and best practices.

### BDD (Behavior-Driven Development)
#### Key Features
- **Page Object Model (POM)**: Enhances test maintenance and readability by encapsulating page elements and actions.
- **Global Data Parameterization**: Allows running tests with multiple data sets without modifying test scripts.
- **Test Tagging**: Enables selective execution, skipping, inclusion, and exclusion of tests based on tags.
- **Scenario Outlines and Data Tables**: Supports data-driven testing with multiple scenarios using different data sets.
- **Encapsulation and Reusable Components**: Applies Object-Oriented Programming principles to create reusable test components.
- **Global Variables**: Ensures consistent data management across tests.
- **Page Elements Segregation**: Organizes locators and actions for better maintainability.
- **Static Fixtures & Dynamic Fixtures** - Image Uploads, Dynamic Form Data Generation.
- **Hook Priority Execution**: Defines the execution order of hooks to maintain test integrity.
- **Test Dependency Management**: Uses pre-condition and post-condition hooks to manage test dependencies effectively.


### Cypress Test Automation
- **Global Timeouts in Cypress**: Configured to handle varying response times and ensure test reliability.
- **Cypress Login & Authentication**: Validates user authentication processes for secure access.
- **Cypress Form Submissions**: Tests form inputs and submission behaviors.
- **Cypress Data Display**: Verifies dynamic content loading, such as:
  - User profiles
  - Pagination functionality
- **Cypress Stripe Payments**: Ensures proper integration and functionality of Stripe payment processing.
- **Cypress File Uploads**: Validates correct operation of file upload features.
- **Cypress Product Filtering and Sorting**: Tests product filters and sorting options.
- **Order Confirmation Process**: Verifies the accuracy and reliability of the order confirmation workflow, including downloading of invoice.

### Summary
While the test suite is not exhaustive, it includes common **Gherkin** and **BDD, Cypress** combinations, providing a comprehensive overview of testing strategies in a BDD-driven Cypress automation framework.

[![Cucumber](https://img.shields.io/badge/Cucumber-Green?style=flat&logo=cucumber)](https://cucumber.io/)
[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=flat&logo=selenium&logoColor=white)](https://www.selenium.dev/)



## 📖 Table of Contents

- [📝 Description](#description)
- [🛠️ Setup Project](#setup-project)
  - [🍴 Prerequisites](#prerequisites)
  - [🛠️ Installation Instructions](#installation-instructions)
  - [Running Cypress Tests](#running-cypress-tests)
    - [Running Tests in Different Modes](#running-tests-in-different-modes)
      - [Run Headless Mode](#run-headless-mode)
      - [Run Headed Mode](#run-headed-mode)
  - [Viewing the Test Report](#viewing-the-test-report)
    - [Running a Live Server for the Cypress Report](#running-a-live-server-for-the-cypress-report)
- [⚒️ How to Contribute](#how-to-contribute)
  - [📩 Bug / Feature Request](#bug--feature-request)
- [📜 Credits](#credits)
- [📞 Contact Us](#contact-us)
- [📜 License](#license)


## 🛠️ Setup Project

To get this project up and running in your development environment, follow these step-by-step instructions.

### 🍴 Prerequisites

We need to install or make sure that these tools are pre-installed on your machine:

- [NodeJS](https://nodejs.org/en/download/): It is a JavaScript runtime build.
- [Git](https://git-scm.com/downloads): It is an open source version control system.
- [NPM](https://docs.npmjs.com/getting-started/installing-node): It is a package manager for JavaScript.

### 🛠️ Installation Instructions

1.  Clone the Repository (if you haven't already)
    ```bash
    git clone https://github.com/AshwanthSai/Cucumber-Cypress-Framework.git
    ```

2.  Navigate to the project directory

    ```bash
    cd Cucumber-Cypress-Framework
    ```

3.  Install Cypress and other dependencies:

    ```sh
    npm install
    ```

## Running Cypress Tests

### Running Tests in Different Modes

#### Run Headless Mode

To run Cypress in headless mode, use the following command:

```sh
npm run test:login
where @login is tag for all login, test scenarios
```

#### Run Headed Mode

To run Cypress in headed mode, use the following command:

```sh
 npm run start 
```

### Viewing the Test Report

To generate and view the test report, use the command:

```sh
npm run report
```

## ⚒️ How to Contribute

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (git checkout -b improve-feature)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (git commit -am 'Improve feature')
- Push to the branch (git push origin improve-feature)
- Create a Pull Request

### 📩 Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/AshwanthSai/Cucumber-Cypress-Framework/issues) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/AshwanthSai/Cucumber-Cypress-Framework/issues/new). Please include sample queries and their corresponding results.


## 📜 Credits

If I followed tutorials during development, I have included the creators here.


📝 Cypress.io Documentation - Provided invaluable guidance on Cypress testing.<br>
[https://docs.cypress.io/](https://docs.cypress.io/)

📝 Cucumber Documentation - Helped with understanding and implementing BDD principles.<br>
[https://cucumber.io/docs/](https://cucumber.io/docs/)


## 📞 Contact Us

[![Follow us on LinkedIn](https://img.shields.io/badge/LinkedIn-AshwanthSai-blue?style=flat&logo=linkedin&logoColor=b0c0c0&labelColor=363D44)](https://www.linkedin.com/in/a-sai/)
[![Email Badge](https://img.shields.io/badge/Gmail-Contact_Me-green?style=flat-square&logo=gmail&logoColor=FFFFFF&labelColor=3A3B3C&color=62F1CD)](mailto:ashwanth.saie@gmail.com)
