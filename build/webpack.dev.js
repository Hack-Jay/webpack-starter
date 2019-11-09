const path = require("path");
const webpack = require("webpack");
const Merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

console.log("dev");
module.exports = Merge(baseConfig, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    host: "127.0.0.1",
    port: 3000,
    stats: {
      colors: true
    },
    hot: true,
    before(app, server) {
      app.get("/api/mock.json", (req, res) => {
        res.json({ hello: "world" });
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
