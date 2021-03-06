const helpers = require('./config/helpers');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
    CheckerPlugin,
    TsConfigPathsPlugin
} = require('awesome-typescript-loader');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    entry: helpers.root('index.ts'),
    output: {
        path: helpers.root('bundles'),
        publicPath: '/',
        filename: 'core.common.js',
        library: 'bicharts',
        libraryTarget: 'commonjs'
    },
    externals: [/^\@angular\//, /^rxjs\//],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            include: [helpers.root('src')],
            exclude: [helpers.root('node_modules'), helpers.root('demo')]
        }, {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            options: {
                declaration: false
            },
            exclude: [/\.spec\.ts$/, helpers.root('demo')]
        }]
    },

    plugins: [
        new CheckerPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src')
        ),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslintLoader: {
                    emitErrors: false,
                    failOnHint: false
                }
            }
        }),
        new CleanWebpackPlugin(['bundles'], {
            root: helpers.root(),
            verbose: false,
            dry: false
        })
    ]
};
