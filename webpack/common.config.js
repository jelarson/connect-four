// webpack plugins
const SplitChunksPlugin = require('webpack/lib/optimize/SplitChunksPlugin');

module.exports = {
  entry: {
    app: ['./src/bootstrap.js'],
    // vendor: './src/vendor.js',
  },

  resolve: {
    extensions: ['.js', '.scss'],

    modules: ['node_modules'],
  },

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
                "transform-class-properties",
                "@babel/proposal-object-rest-spread",
                "emotion"
              ]
            }
          }
        ]
      },
      {
        type: 'javascript/auto',
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          publicPath: '/'
        }
      }
    ]
  },
  plugins: [
    new SplitChunksPlugin({
      name: ['app'],
      minChunks: Infinity,
    }),
  ],
};
