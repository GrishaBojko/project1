const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: ['./src/scss/styles.scss','./src/scss/about.scss','./src/scss/blog.scss'
  ,'./src/scss/client.scss','./src/scss/contact.scss','./src/scss/news.scss','./src/scss/profile.scss'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './dist',
    port: 3000,
    writeToDisk: true,
    overlay: true,
    open: true
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false
        }
      }],
    },
    {
      test: /\.css$/i,
      use: [
        'style-loader',
        'css-loader'
      ],
    },
    {
      test: /\.(png|jp(e*)g|svg)$/,  
      use: [{
          loader: 'url-loader',
          options: { 
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]',
              publicPath: '../',
              useRelativePaths: true
          } 
      }]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        {
          loader: 'file-loader',
          options: {
            name: 'css/[name].css',
          }
        },
        {
          loader: 'extract-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },        
        {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Beets App',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename:'about.html',
      title: 'My Beets App',
      template: './src/about.html'
    }),
    new HtmlWebpackPlugin({
      filename:'blog.html',
      title: 'My Beets App',
      template: './src/blog.html'
    }),
    new HtmlWebpackPlugin({
      filename:'client.html',
      title: 'My Beets App',
      template: './src/client.html'
    }),
    new HtmlWebpackPlugin({
      filename:'contact.html',
      title: 'My Beets App',
      template: './src/contact.html'
    }),
    new HtmlWebpackPlugin({
      filename:'news.html',
      title: 'My Beets App',
      template: './src/news.html'
    }),
    new HtmlWebpackPlugin({
      filename:'profile.html',
      title: 'My Beets App',
      template: './src/profile.html'
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
