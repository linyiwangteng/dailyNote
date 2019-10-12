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
  // 配置模块相关
  module: {
    rules: [
      // 配置Loader
      {
        test: /\.jsx?$/,
        include:[
          // 只命中这里面的文件
          path.resolve(__dirname,'app')
        ],
        exclude: [
          // 忽略这里面的文件
          path.resolve(__dirname,'app/demo-files'),
        ],
        use:[
          // 使用哪些loader，有先后次序，从后向前执行
          'style-loader', //直接使用Loader的名称
          {
            loader:'css-loader',
            options: {
              // 向html-loader传一些参数
            }
          }
        ]
      }
    ],
    noParse: [
      // 不用解析和处理的模块
      /special-library\.js$/  //用正则匹配
    ]
  },
  plugin: [],
  // 配置选择模块的规则
  resolve:{
    modules:[
      'node_modules',
      path.resolve(__dirname,'app')
    ],
    extensions: ['.js','.json','.jsx','.css'],
    alias:{
      // 模块别名配置，用于映射模块
      // 将'module'映射成‘new-module’,同样，‘module/path/file’也会被映射成'new-module/path/file'
      'module':'new-module',
      // 使用结尾符合$后，将'only-module'映射成'new-module',
      // 但是不像上面的，'module/path/file'不会被映射成‘new-module/path/file’
      'only-module$':'new-module'
    },
    symlinks: true,
    descriptionFiles:['package.json'],
    mainFields:['main'],
    enforceExtension:false
  },
  // 输出文件的性能检查配置
  performance: {
    hints: 'warning', //有性能问题时输出警告
    hints: 'error', // 有性能问题时输出错误
    hints: 'false', //关闭性能检查
    maxAssetSize: 200000, //最大文件的大小
    maxEntrypointSize: 400000, //最大入口文件的大小
    assetFilter: function(assetFiltername){
      return assetFiltername.endsWith('.css') || assetFiltername.endsWith('.js');
    }
  },
  devtool:'source-map', //配置source-map类型
  context: __dirname, //Webpack使用的根目录，string类型必须是绝对路径
  // 配置输出代码的运行环境
  target:'web', //'webworker','node','async-node','node-webkit','electron-main','electron-render',
  externals:{
    // 使用来自js运行环境提供的全局变量
    jquery:'jQuery'
  },
  stats: {
    assets:true,
    colors:true,
    errors:true,
    errorDetails:true,
    hash:true
  },
  devServer: {
    proxy: {
      '/api':'http://......',
      
    },
    contentBase: path.join(__dirname,'public'),
    compress: true, //是否开启Gzip压缩
    historyApiFallback: true, //是否开发HTML5 History API网页
    hot:true, //是否开启模块热替换功能
    https: false,
  },
  profile:true, //是否捕获webpack构建的性能信息，用于分析是什么原因导致构建性能不佳
  cache: false, //是否启动缓存来提升构建速度
  watch: true,  //是否开始
  // 监听模式选项
  watchOptions:{
    ignored: /node_modules/,
    // 监听到变化发送后，等300ms在执行动作，节流，防止文件更新太快导致重新编译频率太快，默认300ms
    aggregateTimeout: 300,
    // 不停地询问系统指定的文件有没有发送变化，默认每秒询问1000次
    poll:1000
  }
}