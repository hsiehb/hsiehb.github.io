const helpers = require('./../helpers');
const path = require('path');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod, stg, and dev

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5050;
const HMR = false;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});
const defaultConfigFile = require('./../environments/default');
const devConfigFile = require('./../environments/dev');
const constantsFile = require('./../../src/app/core/constants');

// stringify values again so definePlugin can parse correctly
helpers.stringifyObjValues(devConfigFile);

// merge default and dev configs, with preference to dev configs
const CONFIG = webpackMerge(defaultConfigFile, devConfigFile, constantsFile, {
  'ENV': JSON.stringify(METADATA.ENV),
  'HMR': METADATA.HMR,
  'process.env': {
    'ENV': JSON.stringify(METADATA.ENV),
    'NODE_ENV': JSON.stringify(METADATA.ENV),
    'HMR': METADATA.HMR
  }
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  return {

    /**
     * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
     *
     * Do not change, leave as is or it wont work.
     * See: https://github.com/webpack/karma-webpack#source-maps
     */
    devtool: 'inline-source-map',

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /**
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js'],

      /**
       * Make sure root is src
       */
      modules: [ path.resolve(__dirname, 'src'), 'node_modules' ]

    },

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

      rules: [

        /**
         * Tslint loader support for *.ts files
         *
         * See: https://github.com/wbuchwalter/tslint-loader
         */
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: [helpers.root('node_modules')]
        },

        /**
         * Source map loader support for *.js files
         * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
         *
         * See: https://github.com/webpack/source-map-loader
         */
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/rxjs'),
            helpers.root('node_modules/@angular')
          ]
        },

        /**
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         */
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          query: {
            // use inline sourcemaps for "karma-remap-coverage" reporter
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {

              // Remove TypeScript helpers to be injected
              // below by DefinePlugin
              removeComments: true

            }
          },
          exclude: [/\.e2e\.ts$/]
        },

        {
          test: /\.ts$/,
          loader: 'angular2-template-loader'
        },

        /**
         * Json loader support for *.json files.
         *
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: [helpers.root('src/index.html')]
        },

        /**
         * Raw loader support for *.css files
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader'],
          exclude: [helpers.root('src/index.html')]
        },

        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loaders: ['raw-loader', 'sass-loader', 'sass-resources-loader']
        },

        /**
         * Raw loader support for *.html
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        /* pug loader support for *.pug
         */
        {
          test: /\.(pug|jade)$/,
          loader: 'pug-html-loader'
        },

        /**
         * Instruments JS files with Istanbul for subsequent code coverage reporting.
         * Instrument only testing sources.
         *
         * See: https://github.com/deepsweet/istanbul-instrumenter-loader
         */
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: helpers.root('src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }

      ]
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
      new DefinePlugin(CONFIG),

      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      ),

       /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: true,
        options: {
          sassResources: ['./src/app/core/styles/variables.scss', './src/app/core/styles/mixins.scss'],
          context: helpers.root(),
          /**
           * Static analysis linter for TypeScript advanced options configuration
           * Description: An extensible linter for the TypeScript language.
           *
           * See: https://github.com/wbuchwalter/tslint-loader
           */
          tslint: {
            emitErrors: true,
            failOnHint: true,
            resourcePath: 'src'

          },

        }
      }),

    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}
