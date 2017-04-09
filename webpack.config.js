const helpers = require('./config/helpers'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    {
        CheckerPlugin,
        TsConfigPathsPlugin
    } = require('awesome-typescript-loader');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [
            //   new TsConfigPathsPlugin(  { tsconfig, compiler }  )
        ]
    },
    entry: helpers.root('index.ts'),
    output: {
        path: helpers.root('bundles'),
        publicPath: '/',
        filename: 'core.commonjs.js',
        library: 'bluebi-core',
        libraryTarget: 'commonjs'
    },
    externals: [/^\@angular\//, /^rxjs\//, /^d3\//],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [helpers.root('node_modules')]
        }, {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            options: {
                declaration: false
            },
            exclude: [/\.spec\.ts$/]
        }]
    },

    plugins: [
        new CheckerPlugin(),
        new webpack.ProvidePlugin({
            d3: 'd3'
        }),
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
