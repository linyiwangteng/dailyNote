// standard config

const path = require('path');
module.exports = {
  // entry 表示入口，webpack执行构建的第一步将从Entry开始，可抽象成输入
  //类型可以是string、object、array
  entry:'./app/entry', //只有一个入口，入口只有1个文件
  entry:['./app/entry1','./app/entry2'], //只有一个入口，入口有两个文件
  entry: {
    // 两个入口
    a:'./app/entry-a',
    b:['./app/entry-b1','./app/entry-b2']
  },
  output: {
    // 输出文件存在的目录，必须是string类型的绝对路径
    path:path.resolve(__dirname,'dist'),
    // 输出文件的名字
    filename:'bundle.js', //完整的名字
    filename:'[name].js', //在配置了多个entry时，通过名称模板为不同的entry生成不同的文件名称
    filename:'[chunkhash].js', //根据文件内容的Hash值生成文件的名字，用于浏览器长时间缓存文件

    // 发布到线上的所有资源的URL前缀，为string类型
    publicPath:'/assets/', //放到指定目录下
    publicPath:'', //放到根目录下
    publicPath:'https://cdn.example.com', //放到cdn上

    // 导出库的名称，为String类型
    // 不填他时，默认的输出格式是匿名的立即执行函数
    library:'MyLibrary',
    // 导出库的类型，为枚举类型，默认为var
    // 可以是 umd、umd2、commonjs2、commonjs、amd、this、var、assign、window、global、jsonp
    libraryTarget:'umd',
    pathinfo:true, //是否包含有用的文件路径信息到生成的代码里，为boolean类型
    // 附近Chunk的文件名称
    chunkFilename: '[id].js',
    chunkFilename: '[chunkhash].js',
    // JSONP异步加载资源时的回调函数名称，需要和服务器搭配使用
    jsonpFunction: 'myWebpackJsonp',
    // 生成的Source Map 文件的名称
    sourceMapFilename:'[file].map',
    // 异步加载跨域的资源时使用的方式
    crossOriginLoading:'use-credentials',
    crossOriginLoading:'anonymous',
    crossOriginLoading:'false'
  },
  resolve:{
    modules:{},
    alias:{}
  }
}