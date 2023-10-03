/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    // transform: {
    //     "^.+\\.(ts|tsx)?$": "ts-jest",
    //     "^.+\\.(js|jsx)$": "babel-jest",
    // },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transform: {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
        "^.+\\.(ts|tsx)?$": "ts-jest",
    },
    transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
    // modulePaths: ["<rootDir>"],
};
