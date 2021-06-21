## JS 中的原始类型
> 原始类型存储的都是值，是没有函数可以调用的
> 对象类型存储的是地址（指针）

	* boolean
	* null
	* undefined
	* number
	* string
	* symbol 

## 四则运算符

> 加法运算符不同于其他几个运算符，它有以下几个特点： 

* 运算中其中一方为字符串，那么就会把另一方也转换为字符串
* 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串
	
	```
	1 + '1' // '11'
	true + true // 2
	4 + [1,2,3] // "41,2,3"
	```

> 除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

## 字符串、数字比较

* 纯字符串比较，转换成ASCII码在进行比较
* 纯数字和数字字符串相比较，则将字符串数字隐式转换成数字再进行比较

## == vs ===

> 对于 == 来说，如果对比双方的类型不一样的话，就会进行类型转换

> 对于 === 来说就简单多了，就是判断两者类型和值是否相同

* 首先会判断两者类型是否相同。相同的话就是比大小了
* 类型不相同的话，那么就会进行类型转换
* 会先判断是否在对比 null 和 undefined，是的话就会返回 true
* 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number
	
	```
	1 == '1'
	      ↓
	1 ==  1
	```
* 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
	
	```
	'1' == true
	        ↓
	'1' ==  1
	        ↓
	 1  ==  1
	```
* 判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断
	
	```
	'1' == { name: 'yck' }
	        ↓
	'1' == '[object Object]'
	```

## 模块化
#### 为什么使用模块化？

* 解决命名冲突
* 提供复用性
* 提高代码可维护性

#### 立即执行函数
在早期，使用立即执行函数实现模块化是常见的手段，通过函数作用域解决了命名冲突、污染全局作用域的问题

```
(function(globalVariable){
   globalVariable.test = function() {}
   // ... 声明各种变量、函数都不会污染全局作用域
})(globalVariable)
```

#### Commonjs

```
// a.js
module.exports = {
    a: 1
}
// or 
exports.a = 1

// b.js
var module = require('./a.js')
module.a // -> log 1
```

#### ES Module
ES Module 是原生实现的模块化方案

* 与 CommonJS 区别
	* CommonJS 支持动态导入，也就是 require(${path}/xx.js)，后者目前不支持，但是已有提案
	* CommonJS 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
	* CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
	* ES Module 会编译成 require/exports 来执行的

## Proxy
Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。
Vue3.0 中通过 Proxy 来替换原本的 Object.defineProperty 来实现数据响应式。 

```
// target 代表需要添加代理的对象
// handler 用来自定义对象中的操作，比如可以用来自定义 set 或者 get 函数。
let p = new Proxy(target, handler)
```

通过 Proxy 来实现一个数据响应式:

```
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```
这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，需要我们在 get 中收集依赖，在 set 派发更新，之所以 Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了

## map、filter、reduce

map

* 作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后放入到新的数组中

filter

* 也是生成一个新数组，在遍历数组的时候将返回值为 true 的元素放入新数组，我们可以利用这个函数删除一些不需要的元素

reduce

* 可以将数组中的元素通过回调函数最终转换为一个值。
* 它接受两个参数，分别是回调函数和初始值，初始值在执行第一次回调函数时作为第一个参数传入，在执行回调函数后，该结果会在第二次执行回调函数时当做第一个参数传入
* 回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数

##  异步编程
> 并发（concurrency）和并行（parallelism）区别

* 并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。

* 并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行

> 回调函数（Callback）

* 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身
* 嵌套函数一多，就很难处理错误

> Generator

* 可以控制函数的执行

> Promise

* 承诺会在未来有一个确切的答复，并且该承诺有三种状态，分别是：
	* 等待中（pending）
   * 完成了（resolved）
   * 拒绝了（rejected）
* Promise 实现了链式调用
	* 每次调用 then 之后返回的都是一个 Promise，并且是一个全新的 Promise, 原因也是因为状态不可变。
	* 如果 then 中 使用了 return，那么 return 的值会被 Promise.resolve() 包装

* 很好地解决了回调地狱的问题
* 无法取消 Promise，错误需要通过回调函数捕获

> async 及 await

* 一个函数如果加上 async ，那么该函数就会返回一个 Promise
* async 就是将函数返回值使用 Promise.resolve() 包裹了下

* await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低

> 常用定时器函数

* requestAnimationFrame 循环定时器
	* 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下）
	* 该函数的延时效果是精确的，没有其他定时器时间不准的问题
	* 也可以通过该函数来实现 setTimeout
	
	```
	function setInterval(callback, interval) {
	  let timer
	  const now = Date.now
	  let startTime = now()
	  let endTime = startTime
	  const loop = () => {
	    timer = window.requestAnimationFrame(loop)
	    endTime = now()
	    if (endTime - startTime >= interval) {
	      startTime = endTime = now()
	      callback(timer)
	    }
	  }
	  timer = window.requestAnimationFrame(loop)
	  return timer
	}
	
	let a = 0
	setInterval(timer => {
	  console.log(1)
	  a++
	  if (a === 3) cancelAnimationFrame(timer)
	}, 1000)
	```
	
## 手写 call、apply 及 bind

* 不传入第一个参数，那么上下文默认为 window
* 改变了 this 指向，让新的对象可以执行该函数，并能接受参数

> call

```
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result

```

## 浏览器相关

#### 事件机制

* 事件触发有三个阶段：
	* window 往事件触发处传播，遇到注册的捕获事件会触发
   * 传播到事件触发处时触发注册的事件
   * 从事件触发处往 window 传播，遇到注册的冒泡事件会触发

#### 注册事件

* 使用 addEventListener 该函数的第三个参数可以是布尔值，也可以是对象。
* 对于布尔值 useCapture 参数来说，该参数默认值为 false ，useCapture 决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使用以下几个属性

	|参数|值|作用|
	|:--|:--|:--|
	| capture |boolean|和 useCapture 作用一样|
	| once |boolean|值为 true 表示该回调只会调用一次，调用后会移除监听|
	| passive |boolean|表示永远不会调用 preventDefault|

* 一般来说，如果我们只希望事件只触发在目标上，这时候可以使用 stopPropagation 来阻止事件的进一步传播。

#### 事件代理

* 如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上
	* 节省内存
   * 不需要给子节点注销事件

#### 跨域

浏览器出于安全考虑，有同源策略。如果在协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。

* 目的：主要是用来防止 CSRF 攻击的。CSRF 攻击是利用用户的登录态发起恶意请求。

* 解决跨域

	* JSONP

		> 使用：
		
		```
		// 利用 <script> 标签没有跨域限制的漏洞。
		// 通过 <script> 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。
		
		<script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
		<script>
		    function jsonp(data) {
		    	console.log(data)
			}
		</script>    
		```
		
		> 缺点：
		
		* 只限于 get 请求
		* 封装

		```
		function jsonp(url, jsonpCallback, success) {
		  let script = document.createElement('script')
		  script.src = url
		  script.async = true
		  script.type = 'text/javascript'
		  window[jsonpCallback] = function(data) {
		    success && success(data)
		  }
		  document.body.appendChild(script)
		}
		jsonp('http://xxx', 'callback', function(value) {
		  console.log(value)
		})

		```
	* CORS
		* 需要浏览器和后端同时支持 
		* 服务端设置 Access-Control-Allow-Origin 就可以开启 CORS

#### 存储
	
* cookie，localStorage，sessionStorage，indexDB

| 特性| 	cookie |	localStorage | sessionStorage | indexDB 
| :--: | 	:--: |	:--: | :--: | :--:| 
| 数据生命周期 |	一般由服务器生成，可以设置过期时间 | 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在|
| 数据存储大小 |	4K |	5M| 	5M |	无限
| 与服务端通信 |	每次都会携带在 header 中，对于请求性能影响 | 不参与 | 不参与 | 不参与

* cookie 的安全性

|属性 |	作用|
| :--: | 	:--: |	
|value |	如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识|
|http-only |	不能通过 JS 访问 Cookie，减少 XSS 攻击|
|secure |	只能在协议为 HTTPS 的请求中携带|
|same-site |	规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击|

#### Service Worker

> Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。

* 实现缓存步骤
	* 首先需要先注册 Service Worker
	* 然后监听到 install 事件以后就可以缓存需要的文件
	* 那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。
	
* 开发者工具
	* 在开发者工具中的 Application 查看 Service Worker 启动
	* 在 Cache 中查找已被缓存的文件
	* 当我们重新刷新页面，可以发现我们缓存的数据是从 Service Worker 中读取的
	
	```
	// 实现：
	
	// index.js
	if (navigator.serviceWorker) {
	  navigator.serviceWorker
	    .register('sw.js')
	    .then(function(registration) {
	      console.log('service worker 注册成功')
	    })
	    .catch(function(err) {
	      console.log('servcie worker 注册失败')
	    })
	}
	// sw.js
	// 监听 `install` 事件，回调中缓存所需文件
	self.addEventListener('install', e => {
	  e.waitUntil(
	    caches.open('my-cache').then(function(cache) {
	      return cache.addAll(['./index.html', './index.js'])
	    })
	  )
	})
	
	// 拦截所有请求事件
	// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
	self.addEventListener('fetch', e => {
	  e.respondWith(
	    caches.match(e.request).then(function(response) {
	      if (response) {
	        return response
	      }
	      console.log('fetch source')
	    })
	  )
	})
	```

# 浏览器缓存机制

## 缓存位置（四种）
	* Service Worker
	* Memory Cache
	* Disk Cache
	* Push Cache
	* 网络请求 （依次查找缓存且都没有命中的时候）

### Service Worker

* 它的缓存与浏览器其他内建的缓存机制不同
* 它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的。
* Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容。

### Memory Cache

* 内存中的缓存，读取内存中的数据比磁盘快。
* 但是内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。

### Disk Cache

* 存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。 
* 在所有浏览器缓存中，Disk Cache 覆盖面基本是最大的。它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。

### Push Cache

* Push Cache 是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。并且缓存时间也很短暂，只在会话（Session）中存在，一旦会话结束就被释放。

### 缓存策略

> 缓存策略都是通过设置 HTTP Header 来实现的 

#### 强缓存

* 强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control 。
* 强缓存表示在缓存期间不需要请求，state code 为 200。

##### Expires
* Expires 是 HTTP/1 的产物，表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。并且 Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效。 

##### Cache-control

> `Cache-control: max-age=30`

* Cache-Control 出现于 HTTP/1.1，优先级高于 Expires。该属性值表示资源会在 30 秒后过期，需要再次请求。

* Cache-Control 可以在请求头或者响应头中设置，并且可以组合使用多种指令

* 常见指令

	|指令|作用|
	|:--|:--|
	|public|表示响应可以被客户端和代理服务器缓存|
	|private|表示响应只可以被客户端缓存|
	|max-age=30|缓存30秒后就过期，需要重新请求|
	|s-maxage=30|覆盖max-age， 作用一样，只在代理服务器中生效|
	|no-store|不缓存任何响应|
	|no-cache|资源被缓存，但是立即失效，下次会发起请求验证资源是否过期|
	|max-stale=30|30秒内，即使缓存过期，也使用该缓存|
	|min-fresh=30|希望在30秒内获取最新的响应|

#### 协商缓存

* 如果缓存过期了，就需要发起请求验证资源是否有更新。
* 协商缓存可以通过设置两种 HTTP Header 实现：Last-Modified 和 ETag 。
* 当浏览器发起请求验证资源时，如果资源没有做改变，那么服务端就会返回 304 状态码，并且更新浏览器缓存有效期。

##### Last-Modified 和 If-Modified-Since

Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来，否则返回 304 状态码。

但是 Last-Modified 存在一些弊端：

* 如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源
* 因为 Last-Modified 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源

因为以上这些弊端，所以在 HTTP / 1.1 出现了 ETag 。

##### ETag 和 If-None-Match

ETag 类似于文件指纹，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来。并且 ETag 优先级比 Last-Modified 高。

以上就是缓存策略的所有内容了，看到这里，不知道你是否存在这样一个疑问。如果什么缓存策略都没设置，那么浏览器会怎么处理？

对于这种情况，浏览器会采用一个启发式的算法，通常会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间。

## 实际场景应用缓存策略

### 频繁变动的资源

对于频繁变动的资源，首先需要使用 Cache-Control: no-cache 使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

### 代码文件

这里特指除了 HTML 外的代码文件，因为 HTML 文件一般不缓存或者缓存时间很短。

一般来说，现在都会使用工具来打包代码，那么我们就可以对文件名进行哈希处理，只有当代码修改后才会生成新的文件名。基于此，我们就可以给代码文件设置缓存有效期一年 Cache-Control: max-age=31536000，这样只有当 HTML 文件中引入的文件名发生了改变才会去下载最新的代码文件，否则就一直使用缓存。

# 浏览器渲染原理


## 浏览器接收到 HTML 文件并转换为 DOM 树

* 字节数据 => 字符串
> 当我们打开一个网页时，浏览器都会去请求对应的 HTML 文件。虽然平时我们写代码时都会分为 JS、CSS、HTML 文件，也就是字符串，但是计算机硬件是不理解这些字符串的，所以在网络中传输的内容其实都是 0 和 1 这些字节数据。当浏览器接收到这些字节数据以后，它会将这些字节数据转换为字符串，也就是我们写的代码。

* 字符串 => 标记（还是字符串，是构成代码的最小单位）
>当数据转换为字符串以后，浏览器会先将这些字符串通过词法分析转换为标记（token），这一过程在词法分析中叫做标记化（tokenization）。
	
	```
	<a>1</a>
	 1 2 3
	1：标记为开始一个 a 标签
	2：标记为标签内的文本
	3：标记为结束一个 a 标签
	```

* 标记串 => Node => DOM
>当结束标记化后，这些标记会紧接着转换为 Node，最后这些 Node 会根据不同 Node 之前的联系构建为一颗 DOM 树

* 在解析 HTML 文件的时候，还会遇到 CSS 和 JS 文件，浏览器会去下载并解析这些文件，并解析

	* 将 CSS 文件转换为 CSSOM 树
	* 生成渲染树 （DOM 树 + CSSOM 树）

	```
	// div > a > span 设置样式的方式
	// 浏览器首先需要找到所有的 span 标签，然后找到 span 标签上的 a 标签
	// 最后再去找到 div 标签，然后给符合这种条件的 span 标签设置颜色, 这样的递归过程就很复杂。
	// 所以我们应该尽可能的避免写过于具体的 CSS 选择器，然后对于 HTML 来说也尽量少的添加无意义标签，保证层级扁平
	<div>
  		<a> <span></span> </a>
	</div>
	<style>
	  span {
	    color: red;
	  }
	  div > a > span {
	    color: red;
	  }
	</style>
	```

## 为什么操作 DOM 慢

因为 DOM 是属于渲染引擎中的东西，而 JS 又是 JS 引擎中的东西。当我们通过 JS 操作 DOM 的时候，其实这个操作涉及到了两个线程之间的通信，那么势必会带来一些性能上的损耗。操作 DOM 次数一多，也就等同于一直在进行线程之间的通信，并且操作 DOM 可能还会带来重绘回流的情况，所以也就导致了性能上的问题。


* 长列表
	* 虚拟滚动（virtualized scroller）。
	* 这种技术的原理就是只渲染可视区域内的内容，非可见区域的那就完全不渲染了，当用户在滚动的时候就实时去替换渲染的内容。

## 什么情况阻塞渲染

* 扁平层级，优化选择器

* 当浏览器在解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。
* 这也是我们都建议将 script 标签放在 body 标签底部的原因。
* 也可以给 script 标签添加 defer 或者 async 属性。
* defer 属性，表示该 JS 文件会并行下载，但是会放到 HTML 解析完成后顺序执行，所以对于这种情况你可以把 script 标签放在任意位置。
* 对于没有任何依赖的 JS 文件可以加上 async 属性，表示 JS 文件下载和解析不会阻塞渲染。

## 重绘（Repaint）和回流（Reflow）

> * 重绘和回流会在我们设置节点样式时频繁出现
> * 回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。

### 重绘
当节点需要更改外观而不会影响布局的，比如改变 color 就叫称为重绘
### 回流
当布局或者几何属性需要改变就称为回流。

#### 以下几个动作可能会导致性能问题：

* 改变 window 大小
* 改变字体
* 添加或删除样式
* 文字改变
* 定位或者浮动
* 盒模型

#### 减少重绘和回流

* 使用 transform 替代 top

```
// 引起回流
document.querySelector('.test').style.top = '100px'
```

* 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）

* 不要把节点的属性值放在一个循环里当成循环里的变量
**
```
for(let i = 0; i < 1000; i++) {
    // 获取 offsetTop 会导致回流，因为需要去获取正确的值
    console.log(document.querySelector('.test').style.offsetTop)
}
```

* 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
* 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
* CSS 选择符从右往左匹配查找，避免节点层级过多
* 将频繁重绘或者回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点。比如对于 video 标签来说，浏览器会自动将该节点变为图层。
	* 设置节点为图层的方式有很多，我们可以通过以下几个常用属性可以生成新图层
		* will-change
	   * video、iframe 标签
	 * 测量渲染速度
	 	* 当发生 DOMContentLoaded 事件后，就会生成渲染树

# 性能优化

## 测试性能工具

Audits

## DNS 预解析
DNS 解析也是需要时间的，可以通过预解析的方式来预先获得域名所对应的 IP

```
<link rel="dns-prefetch" href="//yuchengkai.cn">
```

## 预加载

预加载其实是声明式的 fetch ，强制浏览器请求资源，并且不会阻塞 onload 事件，可以使用以下代码开启预加载
一定程度上降低首屏的加载时间，兼容性不好。

```
<link rel="preload" href="http://example.com">
```

## 懒加载

懒加载的原理就是只加载自定义区域（通常是可视区域，但也可以是即将进入可视区域）内需要加载的东西。

* 对于图片来说，先设置图片标签的 src 属性为一张占位图，将真实的图片资源放入一个自定义属性中，当进入自定义区域时，就将自定义属性替换为 src 属性，这样图片就会去下载资源，实现了图片懒加载。

* 懒加载不仅可以用于图片，也可以使用在别的资源上。比如进入可视区域才开始播放视频等等。

## CDN

CDN 的原理是尽可能的在各个地方分布机房缓存数据，这样即使我们的根服务器远在国外，在国内的用户也可以通过国内的机房迅速加载资源。

因此，我们可以将静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。并且对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 Cookie，平白消耗流量。

# webpack 优化

## 打包

将 Babel 编译过的文件缓存起来，下次只需要编译更改过的代码文件即可，加快打包时间

```
use: {
  loader: 'babel-loader?cacheDirectory=true'
}
```

### 按需加载

### Scope Hoisting

分析模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。

```
optimization: {
	concatenateModules: true
}
```

## 代码压缩

Webpack4 中 mode 设置为 production，默认开启压缩


# Virtual DOM

* DOM 是一个多叉树的结构，如果需要完整的对比两颗树的差异，需要的时间复杂度会是 O(n ^ 3)
* 将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。
* 同样的，通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。
* 实现组件的高度抽象化

# 路由原理

> 原理：监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式：Hash、History

## Hash 模式

www.test.com/#/ 就是 Hash URL，当 # 后面的哈希值发生变化时，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 www.test.com。

```
window.addEventListener('hashchange', () => {
  // ... 具体逻辑
})
```

## History 模式

HTML5 新推出的功能，主要使用 history.pushState 和 history.replaceState 改变 URL。
通过 History 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。

```
// 新增历史记录
history.pushState(stateObject, title, URL)
// 替换当前历史记录
history.replaceState(stateObject, title, URL)
```


























