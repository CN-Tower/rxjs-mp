const path = require('path');

module.exports = {
  entry: "./src/rxjs4wx.js",
  output: {
      path: process.argv[3] === 'development' ? path.join(__dirname, 'src') : __dirname,
      filename: process.argv[3] === 'development' ? 'bundle.js' : "index.js"
  }
};