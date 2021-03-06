const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const {
    getClientEnvironment,
    paths,
    entry,
    output,
    resolve,
    getStyleLoaders,
    eslintRules,
    babelLoader,
    imagesUrlLoader,
    fontsLoader,
    noMatchLoader
} = require('./config');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
//global style
// const extractGlobalCSS = new ExtractTextPlugin({filename: 'css/global-[name].css'});
// const extractCutomeAntdCSS = new ExtractTextPlugin({filename: 'css/global-antd-[name].css'});
// //style for css moudules
// const extractModulesCSS = new ExtractTextPlugin({filename: 'css/[name].css'});

module.exports = {
    mode: 'production',
    // Don't attempt to continue if there are any errors.
    bail: true,
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: 'source-map',
    entry: entry(paths),
    output: output(paths),
    resolve: resolve(paths, {'@': paths.appSrc}),
    module: {
        //makes missing exports an error instead of warning
        strictExportPresence: true,
        rules: [
            // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
            // { parser: { requireEnsure: false } },
            eslintRules(paths),
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list
                oneOf: [
                    babelLoader(paths),
                    ...getStyleLoaders(),
                    imagesUrlLoader(),
                    fontsLoader(),
                    noMatchLoader()
                ]
            }
        ]
    },
    plugins: [
        process.env.BUNDLE_ANALYZERREPORT_REREPORT === 'true' && new BundleAnalyzerPlugin(),

        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            title: 'react-boilerplate',
            inject: true,
            showErrors: true,
            template: paths.appHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
        // It is absolutely essential that NODE_ENV was set to production here.
        // Otherwise React will be compiled in the very slow development mode.
        new webpack.DefinePlugin(env.stringified),

        new webpack.ProvidePlugin({
            dayjs: 'dayjs',
            _: 'lodash',
            R: 'ramda'
        }),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),

        // new WebpackParallelUglifyPlugin({
        //     uglifyJS: {
        //         output: {
        //             beautify: false,
        //             comments: false
        //         },
        //         compress: {
        //             warnings: false,
        //             drop_console: true,
        //             collapse_vars: true,
        //             reduce_vars: true
        //         }
        //     }
        // }),

        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },

                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },

                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: Infinity
                }
            }
        }),

        new webpack.optimize.RuntimeChunkPlugin({
            name: 'manifest'
        })
    ].filter(Boolean),
    node: {
        constants: false
    }
};
