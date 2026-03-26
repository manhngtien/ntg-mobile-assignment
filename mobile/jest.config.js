module.exports = {
  preset: 'react-native',

  testMatch: [
    "**/?(*.)+(spec|test).(ts|tsx)"
  ],

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|immer)/)'
  ],

  collectCoverage: true,
  coverageReporters: ['text', 'html'],
};