const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Adjust this to your application's URL
    supportFile: false,
  },
});