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


## 性能优化

* defineReactive 数据冰冻 Object.freeze() 在修改后不需要进行响应式时
* 扁平化数据 store
* 列表渲染优化 窗口化（可视区域）
	* vue-virtual-scroll-list
* 骨架屏 使交互体验更好，处理页面加载时的白屏
* 服务端渲染
* 路由懒加载
	* 例如：有些组件加载了 echart 等较大的库且首屏不需要展示时 可以使用懒加载
* gzip 缓存控制 （通用优化策略）

## 关键点
* computed VS watch
	* watch 相比于 computed 缺少缓存设置
* v-if v-else v-show v-else-if
* vue 如何监听数组变化
	* 通过拦截了数组的方法
* vue 生命周期
* v-model 原理
* 虚拟 dom
	* 组件内虚拟 dom，组件外响应式

* 测试 utils

## 核心Api

#### 数据相关
* Vue.set(this.$set) 设置后续加入的数据 响应式变化
* Vue.delete(this.$delete)

#### 事件相关
* $on
	* 事件总线
* $emit
* $once
* $off

#### 元素引用
* ref & $refs

#### 拓展

* 过滤器 管道符 |
* 全局 、 局部

	```
	// 全局
	Vue.filter('', (val) => { return val })
		
	//局部
	filters: {
		currency: (value, symblo = '¥') {
			return symblo + value
		}
	}
	
	:money = ' num | currency("$") '
	```
* 自定义指令
	* 使用场景：需要对DOM元素进行底层操作时

### vue 源码

* new 入口文件 /core/instance/index
* _init 

* entry-runtime-with-compiler
	* 扩展 $mount (render > template > el)
	* 解析 el、template 等选项
* vue/vue/src/platforms/web/runtime/index.js 
	* 声明了一个 patch 函数
	* 实现了 $mount 方法执行挂载
* vue/vue/src/core/index.js
	* 初始化全局 api
* vue/vue/src/core/instance/index.js
	* 实现 Vue 构造函数
	* Vue 实例方法的初始化
* vue/vue/src/core/instance/init.js
	* 初始化过程：组件属性、事件初始化、两个生命周期、数据响应式

### 模版编译

* 1、解析 template ==> ast
	* /complier/index.js 文件地址
	* parse HTML 、text 、filter
	* 利用栈，出栈和进栈 处理 模版解析
* 2、转化 其实的工作是优化 optimize
	* 标记静态语法树，确定节点不会变，之后再比对的过程中即可跳过该节点
* 3、代码生成 code 从而得到渲染函数
	* v-if 本质是生成三元表达式
	* render-helpers 生成的方法别名
	* render 生成的方法别名 _c
### 组件化机制

* 创建的时候是自上而下的，挂载的时候是自下而上
	* 可以查看堆栈的调用、断点为 init	初始化

* 全局声明
	* global-api/assets
		* 设置 name name/id
		* 组件的构造函数的生成
			* definition 就是传入的组件构造函数，通过 vue.extend把组件的配置对象转化成组件的构造函数
		* 全局注册
			* 在全局的配置中加入了 

				```
				this.options[type + 's'][id] = definition
				{ components: { comp: Ctor } }
				```
* new Vue() 创建根实例
* $mount	执行挂载
	* 并不会直接挂载、会先递归看有没有子组件
	* render
* 组件的实例化挂载过程
	* 模版解析过程和普通元素相同
	* updateComponent = > render 函数执行 _createElement
	* _createElement 根据传入的 tag 类型做相应处理 （创建虚拟dom）
		* string
			* 是否是原生标签，并创建与之对应的虚拟dom
		* 自定义组件
			* 前面条件获取 components 选项中对应的组件构造函数
			* 创建自定义组件的虚拟dom createComponent
				* 最终创建的组件名为 vue-component-[id]-[name]
			* 处理组件数据
			* 安装组件钩子 installComponentHooks （未来会在patch里面执行）
				* componentVNodeHooks 组件未来一些关键的生命周期钩子 
			
	* render 函数返回虚拟 dom 之后 执行patch （update 执行 patch）
		* createEle 将 vdom => dom
			* 判断当前 vnode 是否是一个自定义组件的 vnode
				* 创建自定义组件dom createComponent
					* 获取钩子hook、如果存在且有初始化钩子则进行实例化和挂载
						* 对应执行的是 i() => init （这里执行的就是之前安装组件钩子）
							* init 钩子中创建了组件的实例 componentInstance，之后进行挂载 $mount, 此处 $mount 的执行会使得组件内部的子元素、子组件开始创建，（此处就应证了组件自上而下的实例化过程）
					* 属性回调执行
					* 追加入父组件 （自下而上）（todo// 无脑更新）
			* 原始组件 创建对应 dom
				* 之后递归创建子组件 （条件断点144）

* 条件断点

#### 计算属性 computed

* 将模版中复杂的判断利用计算属性
* 有缓存性 值未发生变化时不会渲染
* 适用场景：多个值发生变化，影响一个值

#### 侦听器 第一次不会执行

* 使用带选项的侦听器立即执行 `immediate: true`
* 如果监听的数据结构很深 `设置 deep: true`
* 适用场景：一个值发生变化，会影响多个值（适合异步操作或者较大开销的操作）

#### lodash 防抖处理

#### 生命周期

```
三个阶段:初始化、更新、销毁
初始化:beforeCreate、created、beforeMount、mounted
更新:beforeUpdate、updated
销毁:beforeDestroy、destroyed

beforeCreate(){} // 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务 created(){} // 组件初始化完毕，各种数据可以使用，常用于异步数据获取 beforeMount(){} // 未执行渲染、更新，dom未创建
mounted(){} // 初始化结束，dom已创建，可用于获取访问数据和dom元素 beforeUpdate(){} // 更新前，可用于获取更新前各种状态
updated(){} // 更新后，所有状态已是最新
beforeDestroy(){} // 销毁前，可用于一些定时器或订阅的取消
destroyed(){} // 组件已销毁，作用同上
```

* beforeDestory 销毁定时器等

#### 核心api

* vue.set() 添加 使得动态添加的属性具有响应式
* vue.delete 删除
* 事件总线 处理跨页面通信 / 类似于 vuex 的作用
	* 例如：产生一个message 在另外一个页面中删除
* ref 可以进行dom 操作
	* 可以调用组件内部的放法操作组件

#### 过滤器 filter

* 接受一个值返回一个值
* 应用场景：对数据进行修饰处理

#### 自定义指令 复用

* 应用场景：需要对普通的DOM元素进行底层操作 
* 钩子函数
	* bind 调用一次，第一次绑定时
	* inserted 被插入到父节点时
	* update 所有组件更新时
	* componenntUpdate
	* unbind
	
	```
	Vue.directive('role', {
		inserted: (el, binding) => {
			if ('admin' !== binding.value) return false
		}
	})
	```
#### 渲染函数 render

* 返回 createElement VDOM

#### 函数式组件 优化
* function true
* 组件没有生命周期、没有管理状态、没有监听，不做数据响应式

#### 混入 mixin 

* 特点：是一个对象
* 来分发组件中的可复用功能
* 所有混入的对象都被混合进入该组件本身的选项

```
// demo
const hello = {
	create () {
		this.hello()
	},
	methods: {
		hello () {
			console.log('hello word')
		}
	}
}
```

#### 插件

#### 组件缓存

* keep-alive 

```
//  page
// include、max、exclude
<keep-alive :include="page"> </keep-alive>
```
#### 获取数据
* 导航后

```
create () {},
watch: {
	'$route': 'fentchData'
}
```






















