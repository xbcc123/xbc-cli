var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.base.conf.js');
//  引入环境变量
var config = require('../config')

module.exports = merge(common, {
    mode: 'development',

    // 开发工具使用原始代码
    // devtool: 'source-map',
    devtool: 'cheap-module-eval-source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // },
            {
                test: /\.sty(l|lus)$/,
                loader: "style-loader!css-loader!stylus-loader",
            },
        ]
    },
    devServer: {
        // 你要提供哪里的内容给虚拟服务器用。这里最好填 绝对路径。默认当前目录
        contentBase: [path.join(__dirname, "../dist")],

        // 代码压缩
        // compress: true,

        // 热模块更新 webpack.HotModuleReplacementPlugin （HMR）
        hot: true,

        // host 默认是 localhost
        // 服务器外部可访问
        // host: localhost,
        // host: "0.0.0.0",

        // port: 9000,

        // 启动zeroConf
        // bonjour: true,

        // 控制浏览器控制台消息 none, error, warning 或者 error
        clientLogLevel: "warning",

        // 如果为 true ，页面出错不会弹出 404 页面。
        historyApiFallback: true,

        // historyApiFallback: {
        //     rewrites: [
        //         { from: /^\/subpage/, to: '/views/subpage.html' }
        //     ]
        // },

        // 自动打开浏览器
        open: true,
        // openPage: '/different/page',

        // 如果为 true ，在浏览器上全屏显示编译的errors或warnings。默认 false （关闭）
        overlay: {
            warnings: true,
            errors: false,
        },

        // true，则终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的。
        // quiet: true,

        // 配置了 publicPath后， url = '主机名' + 'publicPath配置的' +
        // '原来的url.path'。这个其实与 output.publicPath 用法大同小异。
        // output.publicPath 是作用于 js, css, img 。而 devServer.publicPath 则作用于请求路径上的。
        // publicPath: '/',

        // 代理
        // 1. 假设你主机名为 localhost: 8080, 请求 API 的 url 是 http：//your_api_server.com/user/list
        // 2. '/proxy'：如果点击某个按钮，触发请求 API 事件，这时请求 url 是http：//localhost:8080/proxy/user/list 。
        // 3. changeOrigin：如果 true ，那么 http：//localhost:8080/proxy/user/list 变为 http：//your_api_server.com/proxy/user/list 。但还不是我们要的 url 。
        // 4. pathRewrite：重写路径。匹配 / proxy ，然后变为'' ，那么 url 最终为 http：//your_api_server.com/user/list 。
        // proxy: {
        //     '/proxy': {
        //         target: 'http://your_api_server.com',
        //         changeOrigin: true,
        // 
        //         如果要使用https加上下面这段
        //         secure: false,
        // 
        //         pathRewrite: {
        //             '^/proxy': ''
        //         }
        //     }
        // },

        // 只有在请求 /bundle.js 时候，才会编译 bundle。
        // lazy: true,
        // filename: "bundle.js"

        // 在所有响应中添加首部内容：
        // headers: {
        //     "X-Custom-Foo": "bar"
        // }

        // 使用https的http2
        // https: true

        // 也可以提供自己生成的本地证书：
        // https: {
        //     key: fs.readFileSync("/path/to/server.key"),
        //     cert: fs.readFileSync("/path/to/server.crt"),
        //     ca: fs.readFileSync("/path/to/ca.pem"),
        // }

        // info: true,
        // noInfo: true,

        // 索引文件的文件名
        index: 'index.htm',

        // 使用 iframe 模式，它在通知栏下面使用 <iframe> 标签
        // inline: true,

        // 配置ssl的证书指向 证书密码
        // pfx: '/path/to/file.pfx',
        // pfxPassphrase: '',

        // 打印webpack错误 不可以与 info, quit公用
        // stats: "errors-only",

        // 使用ip访问
        // useLocalIp: true,

        // 检查host
        // disableHostCheck: true,

        // 监听文件变动轮询 默认true
        // watch: false,
        watchOptions: {
            //不监听的文件或者文件夹，支持正则匹配 监听大量文件系统会导致大量的 CPU 或内存占用
            //默认为空
            ignored: /node_modules/,
            //监听到变化发生后会等300ms再去执行动作，防止文件更新太快
            //默认为300ms
            aggregateTimeout: 100,
            //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的
            //默认每秒问1000次
            poll: 1000
        },
        // info none verbose
        // 控制生命周期消息的详细程度，例如 Started watching files(开始监听文件)...日志。
        // 'info-verbosity': 'verbose',

    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.development.envObj
        }),

        // 启动HMR 模块热替换
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        // webpack跳过编译错误
        new webpack.NoEmitOnErrorsPlugin(),

    ]
});