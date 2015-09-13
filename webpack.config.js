var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./app/scripts/index.js",
    output: {
        path: path.join(__dirname, '.tmp'),
        filename: "bundle.js"
    }
};