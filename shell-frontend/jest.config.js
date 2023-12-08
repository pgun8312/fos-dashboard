module.exports = {
  testEnvironment: "jsdom", // Use 'jsdom' for testing in a browser-like environment
  transformIgnorePatterns: ["/node_modules/", "^.+\\.png$"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/src/empty-module.js", // Adjust the path accordingly
    "\\.(png|jpg|jpeg|gif|svg)$": "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Adjust the file extensions based on project
    "!src/**/*.test.{js,jsx}", // Exclude test files from coverage
  ],
  // coverageThreshold: {
  //   //sets the minimum coverage thresholds for different metrics
  //   "./src/": {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  moduleDirectories: ["node_modules", "src"], //specifies the directories Jest will look for modules when resolving dependencies.
  modulePathIgnorePatterns: [], // exclude certain directories or files from being considered during testing
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
