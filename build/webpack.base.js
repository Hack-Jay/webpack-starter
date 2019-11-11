const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: {
    main: "./src/index.js",
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", "css", "less"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [path.resolve(__dirname, "../src")],
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // babel 转义的配置选项 babelrc: false,
            presets: [
              require.resolve("@babel/preset-react"),
              [
                require.resolve("@babel/preset-env"),
                {
                  modules: false,
                }
              ]
            ],
            plugins: [
              // require.resolve('@babel/plugin-transform-runtime')
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: "image-webpack-loader" // 这会应用该 loader，在其它之前 enforce: 'pre'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "index.html",
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      }
    }),
    new CleanWebpackPlugin(),
  ]
};

module.exports = config;
