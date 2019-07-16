import { getOptions } from 'loader-utils';

export default function loader(source) {

    // 使用loaderUtils中的方法检查 getOptions
    const options = getOptions(this);

    // 对应用此loader的文件进行处理
    source = source.replace(/\[name\]/g, options.name);

    console.log(source)
    console.log(options)

    // 使用ES6规范的模块化方法 导出一个函数模块
    return `export default ${JSON.stringify(source)}`;
};