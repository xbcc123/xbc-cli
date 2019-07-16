var webpack = require("webpack");
var configDev = require('./webpack.dev.conf')

var compiler = webpack(configDev);

var watchOptions = {
    ignored: /node_modules/,
    aggregateTimeout: 100,
    poll: 1000
}

var watching = compiler.watch(watchOptions, (err, stats) => {

    // wepback 错误（配置出错等）
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    var info = stats.toJson();

    // 编译错误（缺失的 module，语法错误等）
    if (stats.hasErrors()) {
        console.error(info.errors);
    }
    // 编译警告
    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }

});