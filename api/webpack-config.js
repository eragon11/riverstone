const path = require('path');

module.exports = {
  entry: './api/server.js', // Entry point of your application
  target: 'node',
  output: {
    filename: 'server.js', // Output bundle file name
    path: path.resolve(__dirname, 'dist') // Output directory
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader' // Loader for HTML files
      }
    ]
  }
};
