var path = require("path");
var DIST_DIR = path.join(__dirname, "dist"),
    CLIENT_DIR = path.join(__dirname, "src");

module.exports = {
    context: CLIENT_DIR,
    entry: ["webpack-hot-middleware/client", "./main"],
    output: {
        path: DIST_DIR,
        publicPath: "/",
        filename: bundle.js
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    //This could actually be removed not sure though?
    resolve: {
        extentions: ['', '.js']
    }
}