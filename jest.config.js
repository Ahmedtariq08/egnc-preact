/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
        "^.+\\.(ts|tsx)?$": "babel-jest",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    babelPresetEnv: {
        modules: "commonjs",
    },
};

// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "jsdom",
//     // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//     // transform: {
//     //     "^.+\\.(ts|tsx)?$": "ts-jest",
//     //     "^.+\\.(js|jsx)$": "babel-jest",
//     // },
//     extensionsToTreatAsEsm: [".ts", ".tsx"],
//     moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//     // transform: {
//     //     "^.+\\.[t|j]sx?$": "babel-jest",
//     // },
//     transform: {
//         "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
//         "^.+\\.(ts|tsx)?$": "ts-jest",
//     },
//     transformIgnorePatterns: ["<rootDir>/node_modules/"],
//     // modulePaths: ["<rootDir>"],
// };
