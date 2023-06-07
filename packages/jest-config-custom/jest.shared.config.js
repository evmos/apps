module.exports = {
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    tracker: "<rootDir>/../../packages/tracker",
    "ui-helper": "<rootDir>/../../packages/ui-helpers",
    icons: "<rootDir>/../../packages/icons",
    "constants-helper": "<rootDir>/../../packages/constants-helper",
    "evmos-wallet": "<rootDir>/../../packages/evmos-wallet",
    services: "<rootDir>/../../packages/services",
    // wagmi: "<rootDir>/../../node_modules/wagmi",
    // helpers: "<rootDir>/../../packages/helpers",
  },
};
