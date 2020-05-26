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