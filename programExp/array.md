# 数组相关问题

### 数组扁平化

> 方法一：递归

```
function fun(arg) {

	let arr = [];
	arg.forEach((v, i) => {
  
	  if (Array.isArray(v)) {
	    arr = arr.concat(fun(v));
	  } else {
	    arr.push(v);
	  }
	})
	
	return arr;
	
}
```

> 方法二： array.reduce

```
/**
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 * total: 初始值／当前计算后的值
 * currentValue 当前值
 * initialValue 初始值
 */
  function fun(arg) {

    return arg.reduce((res, item) => {
      return  res.concat(Array.isArray(item) ? fun(item) : item);
    }, []);

  }
```

> 方法三：Array.toString 将数组转化字符串，再转化为数组

```
  function fun(arg) {

    return arg.toString().split(',').map((v) => {
      return parseInt(v);
    });

  }
```

> 方法四：Array.join 原理同三

```
	function fun(arg) {
	
		return arg.join(',').split(',').map((v) => {
		  return parseInt(v);
		});;
	
	}
```

> 方法五：Array.some 遍历判断符合条件的，直到不是数组为止

```
// exp : [1, 2, 3, [4,[7], 5], 6]
// 第一次 遍历 arg 结果为 [1, 2, 3, 4, [7], 5, 6]
// 第二次 遍历 arg 结果为 [1, 2, 3, 4, 7, 5, 6]
// concat 连接可以传递多个参数，可以是数组，也可以是具体的值
  function fun(arg) {

    while(arg.some(item => Array.isArray(item))) {

      arg = [].concat(...arg);
    }

    return arg;

  }
```

### 数组去重

> 方法一：Array.includes/indexOf

```
function fun(arg) {

    let arr = [];

    arg.forEach((v, i) => {
      if (!arr.includes(v)) {
        arr.push(v);
      }
    })

    return arr;

}
```

> 方法二： set

```
function fun(arg) {

	return [...new Set(arg)];

}
```













