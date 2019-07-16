// // 一个 JavaScript 命名函数。
function MyExampleWebpackPlugin() {

};

// // 在插件函数的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function (compiler) {
    // var arr = []
    // for (var hook of Object.keys(compiler.hooks)) {
    //     arr.push(hook)
    // }
    console.log(compiler);

    // 指定一个挂载到 webpack 自身的事件钩子。
    compiler.plugin('webpacksEventHook', function (compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
        console.log("This is an example plugin!!!");

        // console.log(compilation)

        // 功能完成后调用 webpack 提供的回调。
        callback();
    });
};

module.exports = MyExampleWebpackPlugin
// 一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。
// compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。