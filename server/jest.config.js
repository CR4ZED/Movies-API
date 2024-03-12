module.exports = {
  verbose: true,
  collectCoverage: true,
  testTimeout: 10000,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/routes/**',
    '!src/index.ts'
  ],
  coverageDirectory: '<rootDir>/coverage/',
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/__test__/*.+(ts|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        diagnostics: {
          ignoreCodes: [2339],
          warnOnly: true
        }
      }
    ]
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|ts)$'],
  setupFiles: ['./__mocks__/_mocks-setup.js'],
  modulePathIgnorePatterns: [
    'src/interface/*',
    'src/joi-validation/*',
    'src/builder/*'
  ]
};
