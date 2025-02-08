const path = require("node:path");
const webpack = require("webpack");

// 環境変数
const dotenv = require("dotenv");
const env = dotenv.config().parsed;
console.log("Environmental Variables:\n", Object.keys(env));

// ビルド時にコメント削除
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/ts/index.ts",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      process.env.NODE_ENV === "production" &&
        new TerserPlugin({
          extractComments: "all",
        }),
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
