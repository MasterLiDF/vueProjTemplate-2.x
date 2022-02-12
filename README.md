# vue-proj

## build

```
项目初次运行/打包/添加了新的库&拆分  npm run build:dll
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 技术选型：

- 框架：Vue(2.x)全家桶
- http:Axios
- css 预处理: Sass
- 语法风格控制：Eslint Prettier Vetur;检测规则后续再完善

### 功能：

- vue 项目模板 PC && H5
- 封装 http 请求(防止重复请求)
- 引入 sass-resources-loader,可以一次性引入公共样式
- 引入 webpack-bundle-analyzer,对包体进行分析。(对比较大的包,考虑是否手写或者用其他插件替换)
- 引入 add-asset-html-webpack-plugin,在根页面打包后，插入我们特定 script 的引用
  - 之后会考虑将该插件替换为 html-webpack-tags-plugin(https://blog.csdn.net/qq_29722281/article/details/106626378)
- 后续会陆续添加一下功能性组件(小功能不必去引入一些类库,减小包的体积)
  - 当前已有组件：
    - 手势组件/指令

### 优化方案：参考-https://segmentfault.com/a/1190000021183492

- 1.组件按需加载
- 2.路由懒加载
- 3.异步组件
- 4.图片的压缩合并 https://tinypng.com/
- 5.压缩代码&&去掉注释与控制台输出&&禁用sourceMap
- 6.提取公共库(例如:vue,vant 等) && 配置 CDN 加速
  - 方案 1:参考——https://www.it610.com/article/1293196391962714112.htm
  - 方案 2:参考——https://www.jianshu.com/p/1b6c0042f355
  - 方案 3:综合了方案1、2.
