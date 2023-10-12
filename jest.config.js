/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: "ts-jest",
    moduleNameMapper: {
        "^ojs/": "<rootDir>/src/assets/dummy.js",
    },
};
