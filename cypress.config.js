const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://gorest.co.in/',
    env: {
      TOKEN: 'Bearer f37ac60ef4ea775019edbb17ddf27ebc4a6462fb759f406396679d2b1bdb5723',
    },
  },
});

