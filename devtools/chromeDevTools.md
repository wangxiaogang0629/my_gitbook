# Chrome 调试工具

## 快捷键

* 切换调试工具位置 ` ctrl + shift + D `
* 打开 Command 菜单 ` ctrl + shift + P `

## 保存控制台日志

> 当我们在使用 console 调试的过程中，有些报错信息不知道怎么和别人沟通时

* 使用 `右键 + Save as` 把控制台中打印出来的信息可保存成一个日志文件

## 截屏 Command 命令

* 部分截取 选中该 DOM 然后在 Command 菜单中 `Capture node screenshot`
* 全屏截取 `Capture full size screenshot`

## 切换调试工具主题

> 明亮 & 暗黑 两种主题切换

* 在 Commands 菜单中 寻找 theme 相关的选项进行切换

## 代码块的使用

> 需求：有时候我们想看看有多少人访问过自己的网站。 那我们可以写一个小脚本保存在调试工具中，这样就可以在任意时候运行该脚本，方便我们复用这些代码

* 预设一些 JavaScript 代码作为自动化工具
* 第一步：进入到 `Sources` 面板
* 第二步：在导航栏中 选择 `Snippets`
* 第三步：点击加号 `New snippets`, 设置一个方便记忆的名称，然后输入需要保存的代码
* 运行：

	```
	1. 在 Sources 面板中使用 ctrl + enter 运行
	2. 在 任意面板中运行 使用 Command 命令在输入框中输入 [! + 名称]
	3. 注意：使用Command 时需要删除输入栏中开头的 > 否则搜索不到
	```

## console

> 为 console 添加时间戳

* command 中搜索 Timestamps 选择 Show Timestamps

> 检测执行时间

* `console.time()`  开启一个计时器
* `console.timeEnd()`  结束计时并且将结果在 console 中打印出来

	```
	console.time('setTimeout')
	
	function time() {
		setTimeout(() => {
			console.timeEnd('setTimeout')
		}, 1000)
	}
	
	time() // setTimeout: 1003.338134765625ms
	
	console.time('setTimeout%c', "color: 'red'")
	
	```

> 为 console 添加样式

* 在内容前添加 `%c` 此时console 的第二个参数就是 css 样式

	```
	console.log('%c打印日志', 'color: red; font-size: 16px')
	```

> 以表格形式显示

* `console.table([{ name: '小岗', age: 12 }, { name: '小明', age: 13 }])`

## Network

> 隐藏 network overview Network 面板中的时间轴信息，扩大请求列表的显示空间

* 点击关闭 Show overview

> 重新发送 XHR 的请求

* 不用刷新页面就可以办到 右键 选择 Replay XHR

### 元素面板

* 通过 'h' 来隐藏元素 选中元素按下 h 切换元素显示隐藏
* 在元素面板中展开所有的子节点 右键 + expand recursively
* 自定义 Shadow editor、Cubic bezier(贝塞尔) 

## Drawer

> 开启另一个选项卡，他被隐藏在主窗口之下

* 在 DevTools（任何选项卡）中，按 [esc] 来显示它，再次按 [esc] 隐藏它


## 浏览器

* 谷歌浏览器全屏后显示导航栏 `shift + command + f`


