# Vue cli
* nrm 管理 npm 源
* nrm ls
* nrm use taobao

> 环境

Node.js 8.9 或更高版本 (推荐 8.11.0+)

> VS Code 插件

* `Vetur` 语法高亮、智能感知、Emmet等
* `EsLint` 语法纠错
* `Auto Close Tag` 自动闭合HTML/XML标签
* `Auto Rename Tag` 自动完成另一侧标签的同步修改
* `JavaScript(ES6) code snippets` ES6语法智能提示以及快速输入，除 js 外还支持.ts，.jsx，.tsx，.html，.vue，省去了配置其支持各种包含js代码文件的时间
* `Path Intellisense` 自动路径补全
* `HTML CSS Support` 让 html 标签上写class 智能提示当前项目所支持的样式
* `open in browser` 直接右键项目单击启动

> 安装

`npm install -g @vue/cli`

> 检查

`vue --version`

> 创建项目

`vue create hello world`

## 语法

## 生命周期

#### 过程

beforeCreate -> created -> deforeMount -> mounted 
beforeUpdate -> undated
beforeDestoryed -> destoryed

#### created
	* 组件实例已创建，未转化成真实dom
#### mounted
	* 已渲染转化成真实dom

## 组件化





## 原理
* 数据驱动
* MVVM module --> view  view ---> module

## 数据响应式

* 什么是数据响应式
	* 以一种机制：当一个数据发生变化时，我们知道到它的变化且跟据变化去改变相对应的内容
	* vue.util.defaultReactive ==> 执行的是Object.defaultPropty 
		* 响应式的设置一个属性
		
		```
		key = ''
		vue.util.defaultReactive(this, 'key', val)
		```
	
	* new Vue() 直接设置一个响应式的值
	
	```
	key = new Vue()
	```
	
	rollup 打包
	
	17 --sourcemap
	


















