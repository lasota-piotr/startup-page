const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.argv.indexOf('-p') !== -1; // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
  });

const cssConfig = isProd ? cssProd : cssDev;


module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }, 
  module: {
    rules: [
      {
        test: /\.scss$/, 
        use: cssConfig
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      }, 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          // 'file-loader?name=[name].[ext]&outputPath=images/',
          {
            loader: 'image-webpack-loader',
            options: {}
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    stats: 'errors-only',
    // open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project demo',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      title: 'Login',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/login.html', // Load a custom template (ejs by default see the FAQ for details)
      filename: 'login.html'
    }),
    new HtmlWebpackPlugin({
      title: 'UI components',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/ui-components.html', // Load a custom template (ejs by default see the FAQ for details)
      filename: 'ui-components.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Sample list 1',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/list1.html', // Load a custom template (ejs by default see the FAQ for details)
      filename: 'list1.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Article',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/article.html', // Load a custom template (ejs by default see the FAQ for details)
      filename: 'article.html'
    }),
    new ExtractTextPlugin({
      filename: './[name].css',
      disable: !isProd
    }),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ]
}