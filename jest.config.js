module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testURL: 'http://localhost',
  setupFiles: [ './jest.init.js' ],
  testMatch: [ '**/tests/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)' ],
  modulePaths: [ '<rootDir>/src', '<rootDir>/test', '<rootDir>/node_modules' ],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/*.{js,jsx}',
  ]
};