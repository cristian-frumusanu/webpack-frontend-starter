const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const precss = require('precss');

// const TransferWebpackPlugin = require('transfer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: [
    'webpack/hot/only-dev-server',
    './node_modules/font-awesome/scss/font-awesome.scss',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'build/', // Relative directory for base of server
    publicPath: '/',
    inline: true,
    port: process.env.PORT || 3000, // Port Number
    host: '127.0.0.1', // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    }),
    new MiniCssExtractPlugin('main.css'),
    new HtmlWebpackPlugin({
        template: path.resolve( __dirname, './public/index.html' )
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                publicPath: '../',
                hmr: process.env.NODE_ENV === 'development',
                },
            },
            'css-loader',
            {
                loader: 'postcss-loader', // Run post css actions
                options: {
                    plugins() {
                    // post css plugins, can be exported to postcss.config.js
                    return [
                        precss,
                        autoprefixer
                    ];
                    }
                }
            }, {
                loader: 'sass-loader' // compiles SASS to CSS
            }
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      // font-awesome
      {
        test: /font-awesome\.config\.js/,
        use: [
          { loader: 'style-loader' },
          { loader: 'font-awesome-loader' }
        ]
      },

      // Bootstrap 4
      {
        test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
      }
    ]
  }
};
