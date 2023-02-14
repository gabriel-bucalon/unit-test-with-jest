module.exports = {
  preset: "jest-preset-angular",
  roots: ["src"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"],
  collectCoverage: true,
  coverageReporters: ["html"],
  verbose: true,
  roots: ["src"],
  collectCoverage: true,
  coverageReporters: ["html"],
};
