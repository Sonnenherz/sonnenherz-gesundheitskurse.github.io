const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const extractSass = new ExtractTextPlugin({
    filename: "[name].bundle.css"
});

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = ["./src/js/main.js", "./src/scss/main.scss"];

    config.output = {
        path: __dirname + '/_site/dist',
        filename: "[name].bundle.js"
    };

    config.module = {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.js$/, // include .js files
                enforce: "pre", // preload the jshint loader
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: [{
                    loader: "jshint-loader"
                }]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    };

    config.plugins = [
        extractSass
    ];

    if (!isProd) {
        config.devtool = 'eval-source-map';
    }

    return config;
};