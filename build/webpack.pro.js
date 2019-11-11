const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


module.exports = Merge(baseConfig, {
  mode: "production",
  output: {
    filename: "[name].[chunkhash:8].js",
  },
  module: {
    rules: [{
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
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer(['IE 10'])]
            }
          }
        ]
      }
    ]
  },
  stats: 'errors-only',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
      },
      canPrint: true
    }),
    new FriendlyErrorsWebpackPlugin()

    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, // 开启缓存
        parallel: true // 多线程
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(__dirname, "../node_modules"), // 路径在 node_modules 目录下的都作为公共部分
          name: "vendor", // 使用 vendor 入口作为公共部分
          enforce: true,
        },
      },
    },
  }
});