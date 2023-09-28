/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    // setupFilesAfterEnv: ["./tests/setupTests.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    // modulePaths: ["<rootDir>"],
    // testEnvironment: "jsdom",
};
