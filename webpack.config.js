const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => path.resolve(__dirname, dir)

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  exclude: /node_modules/,
  include: [resolve('./src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: false
  }
})

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }

  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    const isSass = loader === 'sass' || loader === 'scss'

    if (isSass) {
      loaders.push({
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true
        }
      })
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: true
        })
      })
    }

    if (options.extract) {
      return [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        }
      }].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

module.exports = function (env, argv) {
	const useLint = typeof argv.lint === 'string' ? argv.lint === 'true' : argv.lint
	return {
		mode: argv.mode,
		entry: resolve('./src/main.js'),
		output: {
			path: resolve('./build'),
			filename:'js/[name].js',
			chunkFilename:'js/[name].[chunkhash].js',
			publicPath: './'
		},
		module: {
			rules: [
				...(useLint ? [createLintingRule()] : []),
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.js$/,
					include: [resolve('./src/js')],
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
						}
					}
				},
				...exports.styleLoaders({
					sourceMap: argv.mode === 'production' ? true : false,
					extract: argv.mode === 'production' ? true : false,
          usePostCSS: false
				}),
				{
					test: /\.(png|jpe?g|gif|svg|ico)$/,
					use: [{
						loader: 'url-loader',
						options: {
							useRelativePath: true,
							limit: 10000,
							name:'images/[name].[hash:7].[ext]'
						}
					}]
				},
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					use: [{
						loader: 'url-loader',
						options: {
							useRelativePath: true,
							limit: 10000,
							name:'fonts/[name].[hash:7].[ext]'
						}
					}]
				}
			]
		},
		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				'vue': 'vue/dist/vue.min.js',
				'vue-router': 'vue-router/dist/vue-router.min.js',	
				'src': resolve('./src')
			}
		},
		plugins : [
			new HtmlWebpackPlugin({
				template: 'index.html',
				title: 'Bible',
				inject: true,
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true
				},
				// webpack 4에서 circular dependency 관련 오류 있음.
				chunksSortMode: 'none'
			}),
			new ProgressBarPlugin(),
			new VueLoaderPlugin(),
			new MiniCssExtractPlugin({
				filename:'css/[name].[chunkhash].css',
				chunkFilename:'css/[name].[chunkhash].css'
			})
		],
		optimization: {
			splitChunks: {
				cacheGroups: {
					chunks: 'all',
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all'
					},
					styles: {
						name: 'styles',
						test: /\.(css|scss)$/,
						chunks: 'all',
						enforce: true
					}
				}
			}
		},
		devServer: {
			host: 'localhost',
			contentBase: false,
			publicPath: '/',
			stats: {
				color: true
			},
			port: 8080
		},
		node: {
			net: 'empty'
		}
	}
}
