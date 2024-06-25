module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  verbose: true,
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  setupFiles: ['dotenv/config']
}