# 前端工程化

> 模块化、组件化、规范化、自动化

### 模块化（文件）
> 可以简单理解将一个大文件拆分为多个相互依赖的小文件

* js 模块化 模块加载方案： CommonJS、AMD、CMD、ES6
* css 模块化 
	* 避免全局污染
	* BEM风格、Bootstrap风格 进行命名
	* 工具 解决方式 CSS Modules
* 资源模块化 webpack

### 组件化 （UI 用户界面）
> 将 UI 拆分成功能完备的结构单元
> 降低界面的耦合度，提高复用


### 规范化
> 项目前期需制定相应的规范

* 编码规范
* 目录结构
* 前后端接口规范
* 文档规范
* git分支管理
* git commit 规范

### 自动化
* 自动化构建
* 自动化部署
* 自动化测试

### webpack
* hash（contenthash, chunkhash）
* 多页面配置
* 发布上线流程
* 如何加快打包速度，减少打包体积
* 和其他工具的区别（grunt,glup,rollup,parcel,Browserify）
* 雪碧图插件 webpack-spriteSmith 
* 了解日常开发必备的脚手架是如何实现


# 前端安全性问题


* XSS(跨站脚本攻击)
	* 对数据进行严格的输出编码
* 不安全的第三方依赖包
	* 自动化检查工具 NSP等
* 本地存储数据泄漏
* 上传文件错误
	* 避免浏览器根据响应内容来推断其类型 设置 X-Content-Type-Options HTTP Header明确禁止浏览器去推断响应类型

# 安全问题

> XSS(Cross Site Scripting)跨站脚本攻击

* 原理
	* HTML是一种超文本标记语言，通过将一些字符特殊地对待来区别文本和标记，例如，小于符号（<）被看作是HTML标签的开始，<title>与</title>之间的字符是页面的标题等等。当动态页面中插入的内容含有这些特殊字符（如<）时，用户浏览器会将其误认为是插入了HTML标签，当这些HTML标签引入了一段JavaScript脚本时，这些脚本程序就将会在用户浏览器中执行。所以，当这些特殊字符不能被动态页面检查或检查出现失误时，就将会产生XSS漏洞。

* 防御原则
	* 不相信用户输入的数据，对输入进行过滤，对输出进行编码。
	
* 防御手段
	* 在使用特殊字符时因使用 html 实体编号
		* 空格 &nbsp ; 
		* <	小于	&lt ;
		* >	大于	&gt ;
		* &	和	&amp ;
		* ''	引号	&quot ;
	* 使用正则对用户的输入进行过滤
	* 设置 Cookie 的 HttpOnly 标记这样就不可以通过 Js 的 Document.cookie 进行获取

# 状态管理器相关

* flux、redux、vuex数据流向 
* vuex和redux区别

# nodejs
* nodejs常用模块
* nodejs爬虫
* nodejs 流
* nodejs请求如何返回大文件

# es6相关
* js 是又 ECMAscript（核心）、 BOM（浏览器对象）、DOM（文档对象）组成
* es6 是js的一部分
* 异步处理
* 使用 let 解决var 变量的作用域和重复定义问题
* 字符串问题
	* 使用indexOf 判断需要与-1进行比较， 改进includes、 startsWith('str', 第几个位置开始)、endsWith
	* 字符串拼接
		* 之前使用 + 进行拼接
		* 模版字符串
		
		````
		
		function fun(a, b, c) {
	      return a[0] +b + a[1] + c;
	    }
	
	    let name = 'xiaogang';
	    let age = 18;
	
	    let str1 = fun`name=${name}&age=${age}`;
	
	    console.log(str1)
	    
	    
	    // 高级
	    function who(name, age) {
	      return fun`name=${name}&age=${age}`;
	    }

    	let info = who('xiaoming', 20);

		```
* 函数扩展
	* 函数默认值
	
	```
	function (x = 1, y = 2) ...
	```
	* 箭头函数
		* 简写
		
		```
		// 若只有一行函数体时
		
		let fun = (x, y) => {
			return x + y;
		}
		
		let fun = (x, y) => x + y;
		```
	* 函数尾调用 (指在函数体最后调用，且结果不参与运算)
		* 主要应用于函数递归
	
		```
		// 正例 fun2 将函数 return 之后，fun将不再占用内存空间，会将其内存空间交由 fun2 使用
		
		let fun = (x, y) => x + y;
		
		let fun2 = () => {
			return fun(1, 2);
		}
		
		// fun3 不属于尾调用		
		let fun3 = () => {
			let n = fun(1, 2);
			return n;
		}
		
		// fun3 不属于尾调用 因为参与了运算
		let fun4 = () => {
			return fun(1, 2) + 1;
		}
		
		
		// 递归计算阶乘
		
		let factorial = (x) => {

	      if (x <= 1) {
	        return 1;
	      } else {
	        return x * factorial(x - 1);
	      }

		}
		
		// 优化后
		let factorial1 = (x, p = 1) => {
			
		  if (x <= 1) {
		    return 1 * p;
		  } else {
		    let result = x * p;
		    return factorial1(x - 1, result);
		  }
	
		}
		```

* 循环
	* for、while、
	* for in、 for of、 for Each
		
		```
		
		let list = [1, 2, 3,];
	 	for (let item in list) {
	 		console.log(item) // index
	 	}
	 	for (let item of list) {
	 		console.log(item) // item
	 	}
		```

* 扩展运算符
	* 传参数
	
	```
	// 过滤 filter
	let num = [1, 2, 3 ,19, 9, 8];
	
	let num1 = num.filter(x => x > 5);
	
	console.log(num1)
	
	```
	
# module
* 编译时加载
* export import
* script 引用模块时，要使用 type = "module" 属性

```
 //
 <script type = 'module'></script>
```

* 模块引用出现跨域问题
	* live server

* includes、求幂操作符号 (ES2016)
* 字符串填充、函数尾逗号、异步函数（ES2017）
* 共享内存、Atomic、用于正则表达式的 “dotall” 标志 （ES2018）
* 更友好的JSON.stringify (ES2019)

# babel

* 用途：主要将高版本的 ES 转化为 ES5

```
> 安装：
> 1. npm init 生成 package.json
> 2. npm install -g babel-cli
> 3. npm install -babel-preset-es2015
> 4. 单个文件转化 babel 文件名 --presets es2015
> 5. 按照目录转化  babel src -d dist --presets es2015
> 6. 配置 .babelrc 文件 使用 npm run *** 进行自动化转化 
> 	{
		"presets": ["es2015"],
		"plugins": []
	}

> 7. 先卸载 es2015 后使用 npm install --save-dev @babel/preset-env （env 表示 ES2015 以后的所有 ES）
	{
  		"presets": [
	    	[
      			"@babel/preset-env",
		      {
		        "useBuiltIns": "entry"
		      }
	    	]
  		]
	}
```

# 错题整理

* 1、H5获取当前位置信息 getCurrentPosition
* 2、jquery 的使用 $.each()

# juqery 相比于原生js

* 不要过度使用jquery
	
	```
		document.getElementById("foo")要比$("#foo")快10多倍。
	　	$('a').click(function(){
　　　　alert($(this).attr('id'));
　　　　	alert(this.id);// 快20呗
　　	});
	```
	
* 缓存

	```
		// 反例
		jQuery('#top').find('p.classA');
　　	jQuery('#top').find('p.classB');
　　	
　　	// 正例
	　　var cached = jQuery('#top');
　　	cached.find('p.classA');
　　	cached.find('p.classB');
　　	
　　	// 采用链式写法 也可提升速度
　　	
　　```

# React

* 受控组件和非受控组件
	* 通过组件的 state 去控制 表单的内容 这类组件 被称为受控组件
	* 像如 input type 为 file 的组件，其 value 只读，所以它是一个非受控组件















