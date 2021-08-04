const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [new HtmlWebpackPlugin({ template: './src/template.html', minify: false })],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpeg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'imgs',
          },
        },
      },
    ],
  },
};