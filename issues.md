[FeatureBadge]: https://img.shields.io/badge/Feature-blue
[FixBadge]: https://img.shields.io/badge/Fix-red
[EnhancementBadge]: https://img.shields.io/badge/Enhancement-yellow


### Generic / App
![Fix][FixBadge]&nbsp; - &nbsp; Popup fade not working \
![Fix][FixBadge]&nbsp; - &nbsp; Testing with react testing library and jsdom, render function cause file to not parse.

### Testing 
**Packages for testing with Jest and testing-library/react, configuration with babel**
- "@babel/core": "^7.23.0"
- "@babel/plugin-transform-modules-commonjs": "^7.23.0",
- "@babel/preset-env": "^7.22.20",
- "@babel/preset-react": "^7.22.15",
- "@babel/preset-typescript": "^7.23.0",
- "@testing-library/jest-dom": "^6.1.3",
- "@testing-library/preact": "^3.2.3",
- "@testing-library/react": "^14.0.0",
- "babel-jest": "^29.7.0",
- "jest-environment-jsdom": "^29.7.0",
- "jest": "^29.7.0",
-  "@types/jest": "^29.5.5",

#### Babel configuration - babel.config.json
```
{
    "presets": [
        ["@babel/preset-env", { "targets": { "node": "current" } }],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    "plugins": ["@babel/plugin-transform-modules-commonjs"]
}
```

#### Jest configuration - jest.config.js
```
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    // transform: {
    //     "^.+\\.(ts|tsx)?$": "ts-jest",
    //     "^.+\\.(js|jsx)$": "babel-jest",
    // },
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    // transform: {
    //     "^.+\\.[t|j]sx?$": "babel-jest",
    // },
    transform: {
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
        "^.+\\.(ts|tsx)?$": "ts-jest",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    // modulePaths: ["<rootDir>"],
};
```
### Router
![Fix][FixBadge]&nbsp; - &nbsp; App gives multiple permissions call on redirection to login if unauthorized \
![Enhancement][EnhancementBadge]&nbsp; - &nbsp; Redirect to same page that uses was after logging in (router state ,location)
   
### Login
![Fix][FixBadge]&nbsp; - &nbsp; Implement Company single sign on \
![Feature][FeatureBadge]&nbsp; - &nbsp; Reset Password

### App Layout
![Feature][FeatureBadge]&nbsp; - &nbsp; Favorites and Recents \
![Feature][FeatureBadge]&nbsp; - &nbsp; Breadcrumbs \
![Fix][FixBadge]&nbsp; - &nbsp; Favicon not displayed (try html web plugin ?)

### Dashboard
![Fix][FixBadge]&nbsp; - &nbsp; The drawer selection does not go if app is routed in any other way (e.g home icon) \
![Fix][FixBadge]&nbsp; - &nbsp; Showing count text font color and margin \
![Feature][FeatureBadge]&nbsp; - &nbsp; Add newsletter

### Pending view
![Feature][FeatureBadge]&nbsp; - &nbsp; Export data. Sheetjs has a large library size. Need to implement backend export?

### Admin Panel
![Fix][FixBadge]&nbsp; - &nbsp; Validator messages in create update user popup \
![Fix][FixBadge]&nbsp; - &nbsp; Attribute mapping dropdown shows users action menu \
![Enhancement][EnhancementBadge]&nbsp; - &nbsp; Loading skeleton in table of attribute mapping \
![Feature][FeatureBadge]&nbsp; - &nbsp; Edit, Delete Attribute Mapping.


