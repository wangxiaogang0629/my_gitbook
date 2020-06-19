### 重学前端

##### this
* 事件调用环境 谁触发事件，函数里面的 `this` 指向的就是谁
	* 被定义时 this 无意义，只有在调用的时候 this 才有意义
	```
	let obj = {
		a: 1,
		b: function() {
			console.log(this)
		}
	}
	
	let a = window.obj.b
	
	a() // window
	
	```
* 全局环境下 `this` 指向
	* `window`
	* `node` 环境在单独的 js 文件中指向 `module.export`
* 函数内部
	* 自调用指向 window
	* 严格模式 window.move() 指向 undefind
	* 最终指向调用它的对象
	* 如果函数被多层对象包含，如果函数被最外层对象调用，this 指向的也只是它上一级
* 构造函数
	* 1.调用函数
	* 2.自动创建对象
	* 3.把创建的对象和 this 绑定
	* 4.如果构造函数没有返回值，或者返回值不为对象（null 除外），则返回 this 对象
* 箭头函数
	* 解决了像 setTimeout 中 this 指向 window 的情况
	* 根据上下文的环境 指向上一个对立作用域 且在定义时决定了值
* 修改 this 指向
	* call call({}, arg)
	* apply call({}, [arg, arg]) 可以传一个数组
	* bind 调用时才进行修改
	
		```
		let obj = {
			b: function() => { console.log(this) }
		}
		
		obj.b() // window
		```
	
	```x
	function fn() {
		this.num = 10
	}
	
	fn.num = 20
	fn.prototype.num = 30
	fn.prototype.method = function() {
		console.log(this.num)
	}
	
	let prototype = fn.prototype
	let method = prototype.method
	
	new fn().method() // 10
	prototype.method() // 30
	method() // undefined window
	
	```

```
// html
<div class='box1'><div>
<div class='box2'><div>

// js

let el = document.querySelect('.box1')

el.onclick = move

function move () {
	this.style.left = '100px'
}
```

##### 对象
* 拥有唯一标识、有状态、有行为
	* 任何不同的对象都互不相等、状态和行为在js中被称作属性
* 对象具有高度的动态性
	* 这是因为 JavaScript 赋予了使用者在运行时为对象添加状态和行为能力
	
##### 原型
* 如果所有对象都有私有字段 [[prototype]]，就是对象的原型
* 读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。

```
// 关键词new
function People () {
    this.shang = 2;
    this.xia = 2;
    this.eye = 2;

    this.say = (name) => {
        console.log('People:', name)
    }

}

let onePeople = new People();

onePeople.say('xiaogang');
```


```
// prototype属性的引入
function People () {
    this.shang = 2;
    this.xia = 2;
    this.eye = 2;

    this.say = (name) => {
    	 console.log('People:', name)
    }

}

let onePeople = new People();

function Man () {

    this.status = () => {
        console.log('eye', this.eye)
    }

}

Man.prototype = onePeople;

let oneMan = new Man();

oneMan.status();
oneMan.say('xiaogang');

```

##### 使用ES6 class 来定义类
```
class People {
    constructor() {
        this.shang = 2;
        this.xia = 2;
        this.eye = 2;
    }

    say (name) {
        console.log('People:', name)
    }
}

class Man extends People {
    constructor() {
        super();
    }

    status () {
        console.log(this.shang, this.xia, this.eye)
    }

}

let oneMan = new Man();

oneMan.say('oneMan');

oneMan.status();
```


