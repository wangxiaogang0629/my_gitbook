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

## 











