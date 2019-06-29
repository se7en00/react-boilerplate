// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths')
const isProduction = process.env.NODE_ENV === 'production';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const supportedBrowserList = [
    '> 0.75%',
    'last 3 versions',
    'iOS > 7',
    'Android > 4',
    'last 1 and_ff versions',
    'Firefox ESR',
    'not ie < 9' // React doesn't support IE8 anyway
];

// style files regexes
const cssRegex = /\.(sa|sc|c)ss$/
const cssModuleRegex = /\.module\.(sa|sc|c)ss$/;

// Plain style loader
const styleLoader = require.resolve('style-loader');

const cssLoader = (isModule) => {
    const loader = {
        loader: require.resolve('css-loader'),
        options: {
            importLoaders: 2,
            sourceMap: shouldUseSourceMap
        }
    };
    if (isModule) {
        Object.assign(loader.options, {
            modules: true,
            importLoaders: 2,
            localIdentName: '[local]_[hash:8]'
        });
    }
    return loader;
};

// Plain sass loader
const sassLoader = {
    loader: require.resolve('sass-loader'),
    options: {
        sourceMap: shouldUseSourceMap,
        data: `@import "${paths.appScss}/common.scss";`
    }
};

const resolveUrlLoader = {
    loader: require.resolve('resolve-url-loader')
};

// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In development and production, we use a plugin to extract that CSS to a file
const postCssLoader = () => {
    /* eslint-disable global-require */
    const postCss = {
        loader: require.resolve('postcss-loader'),
        options: {
            ident: 'postcss',
            // If a previous loader like e.g sass-loader is applied and it's sourceMap option is set true,
            // but the sourceMap option in postcss-loader is also set true,
            // previous source maps generated by sass-loader will be discarded by postcss-loader entirely.
            // so set sourceMap with inline in postcss-loader will insert the previous source maps(sass-loader)
            // into css file which is outputed by webpack as a DataUR.
            sourceMap: 'inline',
            plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                    browsers: supportedBrowserList,
                    flexbox: 'no-2009'
                })
            ]
        }
    };
    return postCss;
    /* eslint-disable global-require */
};


const getStyleLoaders = () => {
    const loaders = (isModule = false) => [
        isProduction ? styleLoader :
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProduction,
            },
        },
        cssLoader(isModule),
        postCssLoader(),
        resolveUrlLoader,
        sassLoader
    ]
    const styleRule = {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: loaders()
    }

    const moduleStyleRule = {
        test: cssModuleRegex,
        use: loaders(true)
    }

    return [styleRule, moduleStyleRule]
}

module.exports = {
    getStyleLoaders
};
