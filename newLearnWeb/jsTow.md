### 作用域和闭包

### 阻止事件冒泡 & 阻止事件默认行为

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

###  new 实例化过程

> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

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

### GET 和 POST 区别

> 浏览器的 GET 和 POST

* 用 GET 请求获取一个 html 页面/图片/css/js等资源
	* 反复读取不应该对访问的数据有副作用
	* 因为是读取，就可以对请求的数据做缓存
* 用 POST 来提交一个 form 表单，并得到一个结果的网页
	* 通过点击 submit 元素发出一个 POST 请求到服务器，这件事往往是有副作用的
	* 意味着不能随意多次执行，不能缓存
* GET 和 POST 携带数据的格式不同（仅限于浏览器发请求的场景）
	* GET 请求时，只能依靠 url 上附带参数
	* POST 请求时，url 上也可以带参数，请求体 body 里也会携带数据

> 接口中的 GET 和 POST

* GET 参数不一定全在 url 上
* REST 接口规范其充分运用 GET、POST、PUT 和 DELETE，约定了这4个接口分别获取、创建、替换和删除“资源”，REST 最佳实践还推荐在请求体使用 json 格式。这样仅仅通过看 HTTP 的 method 就可以明白接口是什么意思，并且解析格式也得到了统一
* 安全性
	* POST 用 body 传输数据，而 GET 用 url 传输，更加容易被看到，因此有更多机会被泄漏。
	* 但是从攻击的角度，无论是 GET 还是 POST 都不够安全，因为 HTTP 本身是明文协议。每个HTTP 请求和返回的每个 byte 都会在网络上明文传播，不管是 url，header 还是 body。这完全不是一个“是否容易在浏览器地址栏上看到“的问题。










