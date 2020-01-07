const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const PostCssInlineSvg = require('postcss-inline-svg');
const PostCssSvgo = require('postcss-svgo');
const cssNano = require('cssnano');
const mqpacker = require("css-mqpacker"); // Package no longer supported.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const postCssConfig = [autoprefixer, PostCssInlineSvg, PostCssSvgo, cssNano, mqpacker];

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    common: PATHS.src
  },
  output: {
    filename: 'js/[name].js',
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules: [
      // Files js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      // Files sass
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: '../postcss.config.js',
              },
              plugins() {
                return postCssConfig;
              },
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // Files css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins() {
                return postCssConfig;
              },
            }
          },
        ]
      },
      // Files svg
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, `${PATHS.src}/assets/svg`),
        ],
        loaders: [{
          loader: 'svg-sprite-loader',
        },
        {
          loader: 'svgo-loader',
        }],
      },
      // Files fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: [
          path.resolve(__dirname, `${PATHS.src}/assets/svg`),
          path.resolve(__dirname, `${PATHS.src}/common.blocks`)
        ],
        use: [
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
            loader: 'file-loader',
          }
        ],
      },
      // Files images
      {
        test: /\.(png|jpe?g|webp|gif)$/,
        use: [
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            },
            loader: 'file-loader',
          }
        ],
      },
      // Files .svg from common.blocks
      {
        test: /\.(svg)$/,
        include: [
          path.resolve(__dirname, `${PATHS.src}/common.blocks`),
        ],
        use: [
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            },
            loader: 'file-loader',
          }
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      suppressSuccess: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/static`,
        to: ''
      }],
      {
        ignore: ['*.md'],
      }
    ),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
    }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.src}/name.html`,
    //   filename: './name.html'
    // }),
  ],
};
