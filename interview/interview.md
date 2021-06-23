## html

> h5 新增内容

* 语义化标签

> 本地存储

* cookie 设置为不可在本地访问

## CSS

> css3 新增内容
>
> 盒子模型
> 
> 选择器、伪类、伪元素
> 
> 响应式


## JS

> 判断数据类型

* instanceof
	* 内部机制是通过原型链来判断
	* 但是对于原始类型来说，你想直接通过 instanceof 来判断类型是不行的，当然我们还是有办法让 instanceof 判断原始类型的
		
		```
		// 自定义 instanceof 行为
		// 代码等同于 typeof 'hello world' === 'string'
		class PrimitiveString {
		  static [Symbol.hasInstance](x) {
		    return typeof x === 'string'
		  }
		}
		console.log('hello world' instanceof PrimitiveString) // true
		```
* Object.prototype.toString.call()
* Array/Object.prototype.isPrototypeOf()
* typeof
	* typeof 对于原始类型来说，除了 null 都可以显示正确的类型
	
		```
		typeof 1 // 'number'
		typeof '1' // 'string'
		typeof undefined // 'undefined'
		typeof true // 'boolean'
		typeof Symbol() // 'symbol'
		typeof null // 'object'
		```
	* typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型
	
		```
		typeof [] // 'object'
		typeof {} // 'object'
		typeof console.log // 'function'
		```
* .constructor
* Object.getPrototypeOf(arr) === Array.prototype
* .forEach

> ES6 新增内容

* 使用 let 解决 var 变量的作用域和重复定义问题
	* var 变量提升
	* 函数也会提升，并且优先于变量提升
	* 使用 var 声明的变量会被提升到作用域的顶部
	* let、const 因为暂时性死区的原因，不能在声明前使用
* 什么要存在提升这个事情呢 ?
	* 其实提升存在的根本原因就是为了解决函数间互相调用的情况

	```
	function test1() {
    test2()
	}
	function test2() {
	    test1()
	}
	test1()
	```
	
	```
	var a = 1
	let b = 1
	const c = 1
	console.log(window.a) // 1
	console.log(window.b) // undefined
	console.log(window.c) // undefined
	
	function test(){
	  console.log(a)
	  let a
	}
	test()
	```
* 解构赋值
* 异步处理
	* Promise、ansync
* 扩展运算符
* 字符串问题
	* 使用indexOf 判断需要与-1进行比较， 改进includes、 startsWith('str', 第几个位置开始)、endsWith
	* 字符串拼接
		* +（之前） VS 模版字符串（现在）
* 遍历方式 for in、 for of、 for Each
* 函数扩展
	* 函数默认值
	* 箭头函数
	* 函数尾调用 (指在函数体最后调用，且结果不参与运算)
		* 主要应用于函数递归

* Map、Set
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

> 事件代理 “委托处理”

* js 的事件模型，采用‘冒泡’模式，就是子元素的事件会逐级向上‘冒泡’，成为父元素的事件
* 利用这一特性，可以简化事件的绑定
	* 1. 有一个list ul，里面有许多个 item li
 	* 2. 若要给每个 item 上面绑定一个点击事件 click ，利用冒泡特性 我们不需要给每个li绑定事件，只需把事件绑定在父元素上，当点击li的时候，这个事件会 ‘冒泡’到父元素，从而被监听到。
 	* 3 .更好的写法，则是把事件绑定在 document 对象上

> 阻止事件冒泡 & 阻止事件默认行为

* `e.preventDefault()` 阻止事件默认行为

	```
	// 时间冒泡：从里到外，从下到上，事件会依次触发
	$('a').click((e) => {
	     e.preventDefault();
	});
	```
	
	
* `e.stopPropagation()` 阻止事件冒泡

	```
	$('a').click((e) => {
     e.stopPropagation();
	});
	
	```

* `return false` 等效于同时调用 `e.preventDefault()` 和 `e.stopPropagation()`

	```
	$('a').click((e) => {
	     return false;
	});
	```

> new 实例化过程

* new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
	* 创建一个空的简单 JavaScript 对象（ 即 {} ）
	* 设置该对象的构造函数 (即 \_proto_ 属性指向构造函数的原型对象 prototype )。
	* 将构造函数的作用域赋值给新对象 (即新创建的对象作为 this 的上下文)
	* 执行构造函数内部的代码
	* 若该函数有返回对象
		* 实例化的结果为返回的对象
	* 若没有返回对象，则返回该对象本身 this

		```
		function People(name, age) {
		  this.name = name;
		  this.age = age;
		  
		  return {} // 有返回时
		}
		
		const People1 = new People('小明', 20);
		
		console.log(People1); // {}
		```
		
> 作用域

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

> 闭包

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
	// 在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是，每个对象的创建）。
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
	
	```
	// 循环中使用闭包解决 `var` 定义函数的问题
	for (var i = 1; i <= 5; i++) {
	  setTimeout(function timer() {
	    console.log(i)
	  }, i * 1000)
	}
	
	// 解1：
	for (var i = 1; i <= 5; i++) {
	  ;(function(j) {
	    setTimeout(function timer() {
	      console.log(j)
	    }, j * 1000)
	  })(i)
	}
	
	// 解2：
	for (var i = 1; i <= 5; i++) {
	  setTimeout(
	    function timer(j) {
	      console.log(j)
	    },
	    i * 1000,
	    i
	  )
	}
	// 解3:
	for (let i = 1; i <= 5; i++) {
	  setTimeout(function timer() {
	    console.log(i)
	  }, i * 1000)
	}
	```


> this 指针问题

* this总是指向调用该方法的对象！
* 箭头函数其实是没有 this 的，箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this, 箭头函数的 this 一旦被绑定，就不会再被任何方式所改变
* bind 多次，函数 中的 this 永远由第一次 bind 决定

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
	
	```
	// fn.bind().bind(a) 等于
	let fn2 = function fn1() {
	  return function() {
	    return fn.apply()
	  }.apply(a)
	}
	fn2()
	```

> 原型链

* 通过 `__proto__` 找到一个原型对象

### 继承
class 语法糖，本质还是函数
class 实现继承的核心在于使用 extends 表明继承自哪个父类，并且在子类构造函数中必须调用 super

> 浅拷贝 vs 深拷贝

```
let a = {
  age: 1
}
let b = a
a.age = 2
console.log(b.age) // 2
```

#### 浅拷贝特点

* 引用类型
* 复制对象和原对象在发生修改时，会同时修改
* 只是增加了一个指针指向已存在的内存地址

* 通过 Object.assign 来解决这个问题，很多人认为这个函数是用来深拷贝的。其实并不是，Object.assign 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝
* 另外我们还可以通过展开运算符 ... 来实现浅拷贝

```
let a = {
  age: 1
}
let b = Object.assign({}, a) || { ...a }
a.age = 2
console.log(b.age) // 1
```
* 通常浅拷贝就能解决大部分问题了，但是当我们遇到如下情况就可能需要使用到深拷贝了
* 浅拷贝只解决了第一层的问题，如果接下去的值中还有对象的话，那么就又回到最开始的话题了，两者享有相同的地址。要解决这个问题，我们就得使用深拷贝了

```
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = { ...a }
a.jobs.first = 'native'
console.log(b.jobs.first) // native
```

#### 深拷贝特点

* 值类型
* 复制对象和原对象在发生修改时，不会同时修改
* 是增加了一个指针并且申请了一个新的内存，使这个增加的指针指向这个新的内存
* 这个问题通常可以通过 JSON.parse(JSON.stringify(object)) 来解决
	* 但是该方法也是有局限性的：

	* 会忽略 undefined
	* 会忽略 symbol
	* 不能序列化函数
	* 不能解决循环引用的对象

	```
	let a = {
	  age: undefined,
	  sex: Symbol('male'),
	  jobs: function() {},
	  name: 'yck'
	}
	let b = JSON.parse(JSON.stringify(a))
	console.log(b) // {name: "yck"}
	```
	
	```
	// 浅拷贝
	
	let a = [1, 3, { age: 123 }, 90]
	let b = a
	
	a[1] = 4
	console.log(a, b)
	
	// 深拷贝
	
	let a1 = [1, 3, { age: 123 }, 90]
	let b1 = deepCopy(a1)
	
	function deepCopy(arg) {
		let res = Array.isArray(arg) ? [] : {}
		
		for(let i in arg) {
			if (typeof arg[i] == object) {
				res[i] = deepCopy(arg[i])
			} else {
				res[i] = arg[i]
			}
		}
		
		return res
	}
	
	a1[1] = 4
	console.log(a1, b1)
	
	```

## http

> 状态码

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

> 跨域

* 后端修改请求头
* Nginx 反向代理

> GET 和 POST 区别

* 浏览器的 GET 和 POST
	
	* 用 GET 请求获取一个 html 页面/图片/css/js等资源
		* 反复读取不应该对访问的数据有副作用
		* 因为是读取，就可以对请求的数据做缓存
	* 用 POST 来提交一个 form 表单，并得到一个结果的网页
		* 通过点击 submit 元素发出一个 POST 请求到服务器，这件事往往是有副作用的
		* 意味着不能随意多次执行，不能缓存
	* GET 和 POST 携带数据的格式不同（仅限于浏览器发请求的场景）
		* GET 请求时，只能依靠 url 上附带参数
		* POST 请求时，url 上也可以带参数，请求体 body 里也会携带数据
	
* 接口中的 GET 和 POST
	
	* GET 参数不一定全在 url 上
	* REST 接口规范其充分运用 GET、POST、PUT 和 DELETE，约定了这4个接口分别获取、创建、替换和删除“资源”，REST 最佳实践还推荐在请求体使用 json 格式。这样仅仅通过看 HTTP 的 method 就可以明白接口是什么意思，并且解析格式也得到了统一
	* 安全性
		* POST 用 body 传输数据，而 GET 用 url 传输，更加容易被看到，因此有更多机会被泄漏。
		* 但是从攻击的角度，无论是 GET 还是 POST 都不够安全，因为 HTTP 本身是明文协议。

## 浏览器缓存

* 处理入口 html 文件缓存问题
	* 前端使用 meta 标签禁止缓存
	* 后端配置 nginx 禁止缓存，设置响应头中 Canche-control: "no-store";

## 前端性能优化

### 防抖、节流

> 当我们在scroll事件中执行事件处理函数时，每次scroll事件触发都会执行事件处理函数，这样无限制的调用执行很多次重复的操作，会加重浏览器的负担。此时我们可以采用debunce（防抖）和throttle（节流）的方式来减少事件调用频率，同时也不影响实际效果。

* 防抖函数
	
	> 当频繁触发事件时，一定时间内没有再次触发事件，此时才会执行事件处理函数。
	
	> 如果设定的时间内，又一次触发了事件，就清除之前的处理函数，重新延时。
	
	```
	let timeoutFun = null;
	
	window. addEventListener('scroll', () => {
		
		if (timeoutFun !== null) { clearTimeout(timeoutFun); }
		
		timeoutFun = setTimeout(() => {
			console.log('执行事件处理');
		}, 1000);
		
	})
	```
* 函数节流

	> 使得一定时间内只出触发一次函数。
	
	> 原理：通过判断是否到达一定时间来触发函数。
	
	* 在节流函数内部使用开始时间 startTime 、当前时间 curTime 与 delay 来计算剩余时间 remaining。
	* 当remaining <= 0 时表示该执行事件处理函数了（保证了第一次触发事件就能立即执行事件处理函数和每隔delay时间执行一次事件处理函数）。
	* 如果还没到时间的话就设定在remaining时间后再触发 （保证了最后一次触发事件后还能再执行一次事件处理函数）。
	* 当然在remaining这段时间中如果又一次触发事件，那么会取消当前的计时器，并重新计算一个remaining来判断当前状态。

		```
		let timer = null;
		let startTime = Date.now();
	
	    window.addEventListener('scroll', () => {
	    	
			
			let curTime = Date.now();             
	    	let remaining = 1000 - (curTime - startTime);             
	    	clearTimeout(timer);
	    	           
			if (remaining <= 0) {                   
			    console.log('第一触发事件 执行函数');                
			    startTime = Date.now();              
			} else {                    
			    timer = setTimeout(() => {
			    	console.log('settimeout 执行函数');
			    }, remaining);              
			}      
		});
		```
	
* 区别
	
	* 函数防抖：将几次操作合并为一此操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
	
	* 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。

## React

> 生命周期

* 生命周期执行顺序
* 为什么在 componentDidMount 中进行接口请求 ？

> React 16 更新内容

> 源码

* 虚拟dom
* diff 算法

> react-router

* 为什么页面 url 变化，页面并未刷新

> redux

* 状态管理原理

## 微信小程序
> 生命周期

* 执行顺序

> 登录相关流程
> 
> 分包处理
> 

## 移动端
> 适配方式

## webpack

> 常用 loader
> 
> 搭建项目需要对那些方面进行配置
> 
> 编译文件较大怎么处理
> 

## 问题
* react input 组件封装怎么设计？
* 页面输入 url 发生了什么？
* js 设计模式 ？
* js 垃圾回收 ？
* websocket 怎么确保每次都能正常发送和接受消息 ？
* 正则验证邮箱 ？
* 项目中如何使用 git 进行版本控制管理 ？