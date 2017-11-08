const path = require('path');
const webpack = require('webpack');

const config = {

  entry: [
    './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
		extensions: ['.js', '.jsx'],
  }
};

if (process.env.NODE_ENV === 'production') {

  config.devtool = 'source-map';

} else {

  config.devtool = 'inline-source-map';

  config.devServer = {
    contentBase: path.resolve(__dirname, 'public'),
    port: 8080,
    // hot: true,
    historyApiFallback: {
      disableDotRule: true
    }
  }

  config.plugins = [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin()
  ]

}

module.exports = config;