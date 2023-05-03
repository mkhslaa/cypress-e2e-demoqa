# Cypress E2E Framework to test the demoqa Website
It contains 6 happy paths UI tests and 6 api happy paths and 1 error path.

## Cypress Framework Setup
* `Install`: Install recent cypress version


## Test File
There are two spec files in the e2e folder:
* `api-testing.cy.js` : This spec file contains the scenarios to test the APIs
* `ui-testing.cy.js` : This spec file contains the scenarios to test the UI.

In order to execute scripts, simply run:

* Gitbash
```
npm install
npm run test 
npx cypress open (Cypress GUI to run individual spec file)
```

## Future
* Develop many helpers.
* Consider a modular approach.
* Consider page object models to keep common locators.
* Consider Cypress's best practises.

