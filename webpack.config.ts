import path from "path";
import webpack from "webpack";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";
require("dotenv").config();

//App modes for webpack configuration
enum AppMode {
    DEV = "development",
    PROD = "production",
    NONE = "none",
}

let BASE_URL = "";
let APP_MODE = AppMode.DEV;
switch (process.env.MODE) {
    case "local":
        BASE_URL = process.env.LOCAL_BASE!;
        break;
    case "test":
        BASE_URL = process.env.TEST_BASE!;
        break;
    case "dev":
        BASE_URL = process.env.DEV_BASE!;
        break;
    case "prod":
        BASE_URL = process.env.PROD_BASE!;
        APP_MODE = AppMode.PROD;
        break;
    default:
        BASE_URL = process.env.TEST_BASE!;
        break;
}

const config: webpack.Configuration = {
    mode: APP_MODE,
    devServer: {
        port: process.env.PORT,
        historyApiFallback: true,
        hot: false,
        liveReload: true,
    },
    output: {
        publicPath: "/",
    },
    plugins: [
        new webpack.DefinePlugin({
            // define variables to be used in the application
            "process.env.BASE_URL": JSON.stringify(BASE_URL),
            "process.env.SERVICES": JSON.stringify(process.env.SERVICES),
        }),
    ],
    module: {
        rules: [
            { test: /\.css$/, use: "css-loader" },
            { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
        ],
    },
};

if (APP_MODE == AppMode.PROD) {
    // update config with release / production options
    config.performance = {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    };
} else {
    // update config with development options
    config.devtool = "eval-source-map";
    config.optimization = {
        minimize: false,
    };
}

export default config;
