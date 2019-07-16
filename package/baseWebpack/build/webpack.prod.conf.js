var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

// 测试插件
var testPlugin = require('../webpackPlugins/testPlugins')

// 压缩代码
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 提取css
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

// webpack打包依赖
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var common = require('./webpack.base.conf.js');

// 统计打包时间
var SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
var smp = new SpeedMeasurePlugin();

// mode='production'默认打包方式配置
var TerserPlugin = require('terser-webpack-plugin');

// 开启gzip压缩
var CompressionPlugin = require("compression-webpack-plugin")


// 以函数方式导出 可以接受环境变量 和参数

module.exports = smp.wrap(merge(common, {

    // 性能优化分析
    performance: {

        // 如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。 false | "error" | "warning"
        hints: 'warning',

        // 根据入口起点的最大体积 默认值是：250000 (bytes)。
        maxEntrypointSize: 250000,

        // 单个资源体积 默认值是：250000(bytes) 。
        maxAssetSize: 250000,

        // 此属性允许 webpack 控制用于计算性能提示的文件。 以上示例将只给出 .js 文件的性能提示
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },

    // 开启多进程编译并开启缓存
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
            }),
        ],
    },
    mode: 'production',
    // devtool: 'source-map',

    // 生产环境不使用sourceMap'
    devtool: false,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // },
            {
                test: /\.sty(l|lus)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
        ]
    },
    plugins: [

        // new testPlugin({}),

        // 优化点 代码分离css
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash].css',
        }),

        // // 引入dll插件build
        // new webpack.DllReferencePlugin({
        //     manifest: require(path.resolve(__dirname, '../vendor-manifest.json'))
        // }),

        // new UglifyJSPlugin({
        //     sourceMap: false
        // }),

        // 开启gzip压缩
        // new CompressionPlugin({
        //     filename: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: /\.(js|css)$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // })

        // 是否开启编译分析 默认的可选配置对象
        // new BundleAnalyzerPlugin({
        //     //  可以是`server`，`static`或`disabled`。
        //     //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
        //     //  在“静态”模式下，会生成带有报告的单个HTML文件。
        //     //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
        //     analyzerMode: 'server',
        //     //  将在“服务器”模式下使用的主机启动HTTP服务器。
        //     analyzerHost: '127.0.0.1',
        //     //  将在“服务器”模式下使用的端口启动HTTP服务器。
        //     analyzerPort: 8888,
        //     //  路径捆绑，将在`static`模式下生成的报告文件。
        //     //  相对于捆绑输出目录。
        //     reportFilename: 'report.html',
        //     //  模块大小默认显示在报告中。
        //     //  应该是`stat`，`parsed`或者`gzip`中的一个。
        //     //  有关更多信息，请参见“定义”一节。
        //     defaultSizes: 'parsed',
        //     //  在默认浏览器中自动打开报告
        //     openAnalyzer: true,
        //     //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        //     generateStatsFile: false,
        //     //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
        //     //  相对于捆绑输出目录。
        //     statsFilename: 'stats.json',
        //     //  stats.toJson（）方法的选项。
        //     //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
        //     //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        //     statsOptions: null,
        //     logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
        // })
    ],
})
)

