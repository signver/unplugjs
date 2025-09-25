const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: "> 1%, last 2 versions, not dead",
                  },
                  modules: false,
                  useBuiltIns: false,
                },
              ],
              "@babel/preset-typescript",
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    clean: true,
    filename: "unplug.js",
    library: {
      type: "module",
    },
    path: path.join(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  experiments: {
    outputModule: true,
  },
};

module.exports = [config];
