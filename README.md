
## 简介

本项目参考了vue-antd-admin的项目。地址： "https://github.com/biubiubiu01/vue-antd-admin"

## 功能
```
- 登录  用户名密码/手机号验证码
- 注册、手机号验证码（开发中）
- 权限  
- 动态路由
- echarts各种图表
- openLayer插值分析图
- 错误页面 403 404 500
- 个人设置
- 系统设置
- 更换主题(开发中)
- i18n国际化 (开发中)
- 布局方式
- 面包屑
- 标签页
- socket (开发中)
- svg图标
- 全屏
- 返回顶部
- webpack优化
```
## webpack优化
```
- 关闭生产环境sourceMap;
- 关闭预加载(vue会预加载后面的页面，会导致首屏加载比较慢)
- g-zip压缩(需要nginx配置);
- 生产环境CDN加载部分插件
- 去除生产环境console和debugger;
- 公共代码抽离
- 打包大小分析
- 打包缓存

```

## 使用说明
```
- 拥有 admin、test两种权限，每个权限对应的路由和左侧菜单不同；
- 点击个人设置个性化或者右边设置，可以更改页面的设置，如果标签页是否开启，布局方式等；
- 系统管理员拥有所有权限，可以更改用户对应的菜单路由和角色对应的权限。
......
```


### 文件目录说明
```

├── mock                             ---mock模拟数据
├── public                           ---静态资源文件
├── src          
│  ├── api                           ---接口     
│  ├── assets                        ---图片
│  ├── components                    ---可复用的vue组件
│  ├── layouts                       ---布局方式
│  ├── router                        ---路由
│  ├── store                         ---vuex
│  ├── styles                        ---sass样式
│  ├── utils                         ---方法函数
│  ├── vendor                        ---导出excel
│  ├── views                         ---页面
│  ├── App.vue                       
│  ├── main.js            
│  ├── permission.js                 ---路由拦截           
├── tests                            ---单元测试文件
├── .browserslistrc
├── .env
├── .eslintrc.js
├──  babel.config.js
├── .jest.config.js                  ---jest的配置
├──  package.json
├──  package-lock.json
├──  README.md
└──  vue.config.js                   ---webpack的配置


```


 
## 安装

```
# 克隆项目
git clone https://github.com/jscodecode/AD-Mana-System.git
# 进入项目目录
cd AD-Mana-System
# 安装依赖
npm install
# 本地开发 启动项目
npm run serve
```


### 部署

```
# 打包项目
npm run build
# 单元测试
npm run test:unit
```

## 最后

这个项目的原本项目也参考了 [vue-element-admin](https://panjiachen.gitee.io/vue-element-admin/#/) 和 [ant-design-pro](https://preview.pro.antdv.com/dashboard/workplace),发现了好多好用的写法和方法，建议如果真想提升自己的代码水平，可以多看看大佬们的代码。









