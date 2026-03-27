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
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/constants/**',
    '!src/**/styles/**',
    '!src/**/type.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};