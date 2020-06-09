// webpack plugins
const SplitChunksPlugin = require("webpack/lib/optimize/SplitChunksPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  resolve: {
    extensions: [".js"],
    modules: ["node_modules"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist",
    port: 5001,
    historyApiFallback: {
      disableDotRule: true
    },
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/env",
                "@babel/react",
                "@emotion/babel-preset-css-prop"
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/proposal-object-rest-spread",
                "emotion"
              ]
            }
          }
        ]
      },
      {
        type: "javascript/auto",
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          publicPath: "/"
        }
      }
    ]
  },
  plugins: [
    new SplitChunksPlugin({
      name: ["app"],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "./static/index.html")
    })
  ]
};
