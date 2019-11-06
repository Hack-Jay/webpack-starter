const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = Merge(baseConfig, {
  mode: "production",
  output: {
    filename: "[name].[chunkhash:8].js"
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   // 添加 loader
      //   use: [MiniCssExtractPlugin.loader, 'css-loader']
      // },
      {
        test: /\.less$/,
        // 添加 loader
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[contenthash:8].css"
    }),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启缓存
        parallel: true // 多线程
      })
    ]
  }
});
