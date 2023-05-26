const sharedConfig = require("./jest.shared.config.js");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    ...sharedConfig,
}