var path = require('path');
// 清空dist目录下面文件
var CleanWebpackPlugin = require('clean-webpack-plugin');
// 生成html静态文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// vue插件
var VueLoaderPlugin = require('vue-loader/lib/plugin')
// 提取静态文件
var CopyWebpackPlugin = require('copy-webpack-plugin')

// 多进程缓存执行loader
// var HappyPack = require('happypack');
// var os = require('os');
// var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

var webpack = require('webpack');
// var poststylus = require('poststylus');

module.exports = {
    // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    context: path.resolve(__dirname, "../"),

    entry: {
        // babel的兼容包
        app: ['babel-polyfill', './src/index.js'],
        // app: './src/main.js',
    },

    output: {
        path: path.resolve(__dirname, '../dist'),

        // 代码分离出口配置项
        filename: 'static/js/[name].[hash].bundle.js',

        // 非入口代码打包编译目录
        chunkFilename: 'static/js/[name].[chunkhash].bundle.js',

        // 优化点
        // 输出结果不携带路径信息
        pathinfo: false,

        // 将配置文件导出 用window.MyLibrary引用 
        // 常用 umd
        // libraryTarget: 'window',
        // library: 'MyLibrary'

        // 用于cdn配置静态文件 默认为''
        // 对于按需加载(on-demand-load)或加载外部资源(external resources)
        // 此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」
        // 相对 URL(relative URL) 会被相对于 HTML 页面（或<base> 标签）解析。
        publicPath: '/',
    },

    // 优化点
    // 配置代码分离
    // optimization: {
    //     splitChunks: {
    //         chunks: 'initial',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
    //         minSize: 0,//合并前模块文件的体积
    //         minChunks: 1,//最少被引用次数
    // maxAsyncRequests: 5,
    // maxInitialRequests: 3,
    // automaticNameDelimiter: '~',
    // cacheGroups: {
    // vendors: {
    //     test: /node_modules/,
    //     minChunks: 1,
    //     priority: -10
    // },
    // default: {
    //     test: /src/,
    //     minChunks: 2,
    //     priority: -20,
    //     reuseExistingChunk: true
    // }
    // commons: {
    //     name: 'commons',
    //     chunks: 'initial',
    //     minChunks: 2
    // },

    // 分理出node_modules
    // commons2: {
    //     test: /[\\/]node_modules[\\/]/,
    //     name: 'vendors',
    //     chunks: 'all'
    // },

    // vendors: {
    //     test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
    //     name: 'vendor',
    //     chunks: 'all',
    // }
    //     }
    // },

    //     // 配置缓存
    //     runtimeChunk: 'single'
    // },


    // 优化点
    // 外部扩展 cdn引入的包在这里 防止将某些 import 的包(package)打包到 bundle 中
    // 检索全局jQuery
    externals: {
        // jquery: 'jQuery',
        // "lodash": {
        //     commonjs: "lodash",//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
        //     commonjs2: "lodash",//同上
        //     amd: "lodash",//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
        //     root: "_"//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);
        // }
    },

    // 针对于loader的resolve配置
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    },

    // Resolve 配置 Webpack 如何寻找模块所对应的文件
    resolve: {

        // 1. 添加为一个可解析的扩展名 
        // 2. 能够使用户在引入模块时不带扩展：import SomeFile from "./somefile"
        extensions: ['.', '.ts', '.js', 'jsx', '.json', '.vue', 'styl'],

        // 设置目录别名
        alias: {
            // 配置vue在编译build时使用，不设置只能在runtime使用
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            '$pRoot': path.resolve(__dirname, '../publicResource'),
            '$pRootBC': path.resolve(__dirname, '../publicResource/publicBasicsComponents'),
            '$pRootBuC': path.resolve(__dirname, '../publicResource/publicBusinessComponents'),
            '$pRootStatic': path.resolve(__dirname, '../publicResource/publicStatic'),
            '$pRootUtils': path.resolve(__dirname, '../publicResource/publicUtils'),
        },

        // 用户描述的json文件名
        // descriptionFiles: ["package.json"],

        // 解析目录时要使用的文件名
        mainFiles: ["index"],

        // webpack 解析模块时应该搜索的目录。
        modules: ["node_modules"],

        // 额外的解析插件
        // plugins: []
    },

    module: {

        // 优化点
        // 忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。
        // 忽略大型的 library 可以提高构建性能。
        // noParse: function (content) {
        //     return /jquery|lodash/.test(content);
        // },

        rules: [
            {
                test: /\.vue$/,
                exclude: [/node-modules/],
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            {
                test: /\.js$/,

                // 优化之后只能使用 es5的node包
                // loder包含的文件， 不设置默认package.json统计目录下的所有文件
                // include: [path.resolve(__dirname, '../src')],
                // loder不包含的文件
                exclude: [/node-modules/],

                // loader: 'happypack/loader?id=happybabel',
                // 用来与被发布的 request 对应的模块项匹配
                // issuer: '',
                use: [

                    // {
                    //     loader: 'cache-loader'
                    // },

                    // 使用happypack后无法使用thread-loader
                    {
                        loader: 'thread-loader'
                    },

                    // {
                    //     loader: 'happypack/loader?id=happybabel'
                    // },
                    {
                        loader: 'babel-loader',
                        options: {

                            // 开启缓存
                            cacheDirectory: true,

                            // 不压缩
                            compact: false
                        },
                    }
                ]
            },
            // {
            //     test: /\.ts$/,
            //     use: [
            //         {
            //             loader: 'thread-loader'
            //         }, {
            //             loader: 'ts-loader',
            //             options: {
            //                 appendTsSuffixTo: [/\.vue$/],
            //                 transpileOnly: true,
            //                 experimentalWatchApi: true,
            //             }
            //         }
            //     ]

            // },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: 'static/img/[name].[hash:7].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            // name: '../../static/fonts/[name].[hash:7].[ext]',
                            name: 'static/fonts/[name].[hash:7].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:7].[ext]',
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: 'index.html',
            inject: true,
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true
            // },
        }),

        // 引入dll插件build
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(__dirname, '../vendor-manifest.json'))
        }),
        // new HappyPack({
        //     id: 'happybabel',
        //     loaders: [{
        //         loader: 'babel-loader',
        //         options: {
        //             babelrc: false,// 不采用.babelrc的配置
        //             plugins: [
        //                 "dynamic-import-webpack"
        //             ],
        //             // 缓存编译之后的文件
        //             cacheDirectory: true,
        //             compact: false,
        //             presets: ['@babel/preset-env']
        //         },
        //     }
        //     ],
        //     threadPool: happyThreadPool,
        //     cache: true,
        //     verbose: true
        // }),

        // 提取静态文件
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }]),
    ],

    // 设置不支持node环境运行
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};