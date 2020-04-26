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

# 前端设计模式

# js垃圾回收机制

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


# 跨域问题处理
* 后端修改请求头
* Nginx 反向代理

# 前端数据加密

# http相关
* 3xx
	* 304 服务器告诉客户，原来缓冲的文档还可以继续使用。
* 4xx 客户端错误--请求有语法错误或请求无法实现
	* 400 Bad Request 请求出现语法错误。
	* 401 Unauthorized 客户试图未经授权访问受密码保护的页面。应答中会包含一个WWW-Authenticate头，浏览器据此显示用户名字/密码对话框，然后在填写合适的Authorization头后再次发出请求。
	* 403 Forbidden 资源不可用。服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致。
	* 404 Not Found 无法找到指定位置的资源。这也是一个常用的应答。
	* 405 Method Not Allowed 请求方法（GET、POST、HEAD、DELETE、PUT、TRACE等）对指定的资源不适用。（HTTP 1.1新）
	* 413 Request Entity Too Large 目标文档的大小超过服务器当前愿意处理的大小
* 5xx 服务器端错误--服务器未能实现合法的请求
	* 500 Internal Server Error 服务器遇到了意料不到的情况，不能完成客户的请求。
	* 502 Bad Gateway 服务器作为网关或者代理时，为了完成请求访问下一个服务器，但该服务器返回了非法的应答。
	* 503 Service Unavailable 服务器由于维护或者负载过重未能应答。例如，Servlet可能在数据库连接池已满的情况下返回503。服务器返回503时可以提供一个Retry-After头。
	* 504 Gateway Timeout 由作为代理或网关的服务器使用，表示不能及时地从远程服务器获得应答。（HTTP 1.1新）


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
* Set
	* 数组去重
	* 按照插入的顺序排列
	* 注意：keys, values 值相同
	
	```
	let setArr = new Set([0, 3]);

	// add		
	setArr.add(0);
	
	// delete		
	setArr. delete(1);
	
	// 交集差集
	let setArr1 = new Set([1, 3, 5, 7, 2]);
	let setArr2 = new Set([2, 4, 6, 8, 7, 3]);
	
	let setArr3 = new Set([...setArr1].filter(x => setArr2.has(x)));
	let setArr3 = new Set([...setArr1].filter(x => !setArr2.has(x)));
	
	// 并集 (合并去重)
	let setArr1 = new Set([1, 3, 5, 7, 2]);
	let setArr2 = new Set([2, 4, 6, 8, 7, 3]);
	
	new Set([...setArr1, ...setArr2])
	
	```

* Map
	* 新数据类型
	* key 可以使用不同类型（数字、数组、对象、函数）
	* Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键.
	
	```
	let map1 = new Map();
	
	map1.set([0, 1, 2], 'res1') // (key, val)
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

# 算法

# 模块化

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

## 事件代理 “委托处理”

* js 的事件模型，采用‘冒泡’模式，就是子元素的事件会逐级向上‘冒泡’，成为父元素的事件
* 利用这一特性，可以简化事件的绑定

```

	// 例如：有一个list ul，里面有许多个item li，若要给每个item上面绑定一个点击事件
	click），利用冒泡特性 我们不需要给每个li绑定事件，只需把事件绑定在父元素上，
	当点击li的时候，这个事件会 ‘冒泡’到父元素，从而被监听到。

	更好的写法，则是把事件绑定在document对象上
	
```

* 选择作用域链最短的方法
* 读取变量的时候，先在当前作用域寻找该变量，如果找不到，就前往上一层的作用域寻找该变量, 这样设计使得读取局部变量比读取全局变量快得多。

```
	var a = 0;

　　function x(){
　　　　a += 1;
　　}

　　function y(){
　　　　var a = 0;
　　　　a += 1;
　　}

	// 同理调用对象
	// prototype模式：

　　var X = function(name){ this.name = name; }

　　X.prototype.get_name = function() { return this.name; };

	// closure模式：

　　var Y = function(name) {

　　　　var y = { name: name };

　　　　return { 'get_name': function() { return y.name; } };

　　};
```

# 闭包

* 闭包的产生源于 js特殊的变量作用域
* 闭包是一种保护私有变量的机制，在函数执行时形成私有的作用域，保护里面的私有变量不受外界干扰,它使得函数拥有私有变量变成可能。
* 变量作用域主要分全局变量和局部变量
	* 在函数内部可以直接读取全局变量
	* 在函数外部无法读取函数内的局部变量
	* 为了想要读取它内部的变量 我们在函数1中定义一个函数2，这时f1内部的所有局部变量，对f2都是可见的，只要将函数2作为返回值，我们就可以在函数1外部读取它内部的变量了，而函数2，就是闭包。
	* 闭包就是能够读取其他函数内部变量的函数。
	* 其实根本上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

* 作用
	* 可以读取函数内部的变量 
	* 另一个就是让这些变量的值始终保持在内存中。
	* 函数体中的函数就可都称之为闭包

* 性能问题
	* 如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

```

	// 反例
	// 在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这	将导致每次构造器被调用时，方法都会被重新赋值一次（也就是，每个对象的创建）。
	
	function MyObject(name, message) {
	  this.name = name.toString();
	  this.message = message.toString();
	  this.getName = function() {
	    return this.name;
	  };
	
	  this.getMessage = function() {
	    return this.message;
	  };
	}
	
	// 正例
	
	function MyObject(name, message) {
  	this.name = name.toString();
	  	this.message = message.toString();
	}
	MyObject.prototype = {
  		getName: function() {
	    	return this.name;
	  	},
	 	getMessage: function() {
	    	return this.message;
  		}
	};
	
	// 但不建议重新定义原型 修改如下
	
	MyObject.prototype.getName = function() {
	  return this.name;
	};
	
	
	// 计数器为 3
	var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
	})();
 
	add();
	add();
	add();

```


# this 指针问题

* this总是指向调用该方法的对象！

```
// window
// window是对象而不是类，也就是说window是被实例化的对象,页面初始化的时候有js完成，整个页面都浓缩到这个window对象。

var name = 'xiaogang';

function funThis() {

  console.log(this);

  console.log(this.name);

}

// this 为 myObj
var myObj={
    name:"zhoulujun",
    fn:function(){
        console.log(this.name)
    }
 
};
myObj.fn();

```

# 检测js数据类型

* instanceof
* Object.prototype.toString.call()
* Array/Object.prototype.isPrototypeOf()
* typeof
* *.constructor
* Object.getPrototypeOf(arr) === Array.prototype
* *.forEach

# React

* 受控组件和非受控组件
	* 通过组件的 state 去控制 表单的内容 这类组件 被称为受控组件
	* 像如 input type 为 file 的组件，其 value 只读，所以它是一个非受控组件














