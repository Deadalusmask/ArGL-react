const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.jsx',
  mode: 'production',
  output: {
    filename: 'argl-react.js',
    path: path.resolve(__dirname, './dist'),
    library: 'argl-react',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  externals: [
    {
      'argl': 'argl',
      'react': 'react',
      'gl-matrix': {
        root: 'window',
        commonjs: 'gl-matrix',
        commonjs2: 'gl-matrix',
        amd: 'gl-matrix'
      },
      'hammerjs': {
        root: 'Hammer',
        commonjs: 'hammerjs',
        commonjs2: 'hammerjs',
        amd: 'hammerjs'
      }
    }
  ]
};
