var
  path = require('path')
  , webpack = require('webpack')
  , packageJson = require('./package.json')

  // webpack plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')

  // mock api
  , getDataAjax = require('./mock/api/getData.ajax')
;

var
  IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
  , IS_PRODUCTION = process.env.NODE_ENV === 'production'
;

var config = {
  mode: 'none',
  entry: path.resolve('src', 'index.js'),

  output: {
    path: IS_DEVELOPMENT
      ? path.resolve('dist')
      : path.resolve('build'),
    filename: IS_PRODUCTION
      ? 'miniXhr.min.js'
      : 'miniXhr.js',
    library: 'miniXhr',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  },

  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ],
    'extensions': ['.js']
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        type: 'javascript/auto',
        include: [
          path.resolve('src'),
        ],
        exclude: [
          path.resolve('node_modules'),
        ],
        loader: 'babel-loader'
      },

      // Pug template
      {
        test: /\.pug$/,
        include: [
          path.resolve('src'),
          path.resolve('static')
        ],
        exclude: [
          path.resolve('node_modules')
        ],
        loader: 'pug-loader'
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: packageJson.name + ' v' + packageJson.version +
      '\nHomepage: ' + packageJson.homepage +
      '\nReleased under the ' + packageJson.license + ' License.'
    })
  ]
};

// dev mode
if (IS_DEVELOPMENT) {
  config.mode = 'development';

  // devtool
  config.devtool = 'source-map';

  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
    }),

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    }),

    new BrowserSyncPlugin({
      server: {
        baseDir: 'dist'
      },
      logLevel: "debug",
      middleware: [
        {
          route: "/getData",
          handle: getDataAjax()
        },
      ],
    }, {
      reload: true
    })
  );
}

// production mode
if (IS_PRODUCTION) {
  config.mode = 'production';

  config.plugins.push(
    new webpack.HashedModuleIdsPlugin(),

    new CleanWebpackPlugin(['build'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    })
  );

  config.optimization = {
    minimizer: [
      // Uglify Js
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          safari10: true,
          ecma: 5,
          output: {
            comments: /^!/,
            beautify: false
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          },
          warnings: false,
          sourceMap: true
        }
      }),
    ]
  }
}

module.exports = config;
