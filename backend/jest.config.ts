module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/vendor/**"],
  coverageDirectory: "coverage",
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage/",
    "dist/",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],
};
