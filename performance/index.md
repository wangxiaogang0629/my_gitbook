# 性能优化

## 页面加载时间

使用 `PerformanceTiming` 接口，它提供了在加载和使用当前页面期间发生的各种事件的性能计时信息。

可以通过 `window.performance.timing` 获取信息。

* `navigationStart` 从同一个浏览器上下文的上一个文档卸载(unload)结束时的时间戳
* `domLoading` 当前网页DOM结构开始解析时间戳
* `domContentLoadedEventEnd` 所有需要立即执行的脚本已经被执行时的时间戳
* `domComplete` 当前文档解析完成的时间戳

> JS 代码

```
let startT = window.performance.timing.navigationStart;
let domStartT = window.performance.timing.domLoading;

window.onload = () => {
    let endT = window.performance.timing.domComplete;
    let loadTime = endT - startT; 

    console.log('开始加载-->:', startT)
    console.log('解析Dom开始-->:', domStartT)
    console.log('文档解析完成-->:', endT)
    console.log('%c开始加载至解析Dom开始的时间：' + (domStartT - startT), 'color:green')
    console.log('%c解析文档完成时间：' + (endT - domStartT), 'color:purple')
    console.log('%c加载页面总时间：' + (endT - startT), 'color:red')
    console.log('Page load time is : ' + loadTime);
}

```

> 在谷歌浏览器配置代码块使用 Command 命令进行快捷操作 [链接](../devtools/chromeDevTools.md)

## 页面加载状态

* `loading` / 正在加载
* `interactive ` / 可交互
	* 文档已被解析，"正在加载"状态结束，但是图像，样式表和框架之类的子资源仍在加载
* `complete ` / 完成
	* 文档和所有子资源已完成加载。表示 load 状态的事件即将被触发。

```
document.onreadystatechange = function () {
    console.log('readyState--->: ', document.readyState)
}
```





