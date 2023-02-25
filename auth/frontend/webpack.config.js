const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { container } = require("webpack");

const moduleFederation = require("./module-federation");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  mode,
  devtool: prod ? false : "source-map",
  entry: {
    bundle: ["./src/index.js"],
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    publicPath: "https://microfrontends.dev/mf-auth/",
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    allowedHosts: "all",
    open: true,
    historyApiFallback: true,
    client: {
      webSocketURL: {
        port: 443,
      },
    },
  },
  plugins: [
    new container.ModuleFederationPlugin(moduleFederation),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
