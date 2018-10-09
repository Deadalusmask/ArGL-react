const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './test/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: './dist',
    //open: flase,
    port: 8000,
    overlay: true
  },
  resolve: {
    extensions: ['.wasm', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif|bin)$/,
        use: 'file-loader'
      },
      {
        test: /\.(glsl|vs|fs|obj|txt)$/,
        use: 'raw-loader'
      },
      {
        test: /\.(json|gltf)$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './test/index.html'
    })
  ]
};
