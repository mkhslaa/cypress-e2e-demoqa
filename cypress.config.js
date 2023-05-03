const { defineConfig } = require('cypress')

module.exports = defineConfig({
  experimentalModifyObstructiveThirdPartyCode: true,
  "chromeWebSecurity": false,
  e2e: {
    baseUrl: 'http://demoqa.com',
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
    
  }
});
