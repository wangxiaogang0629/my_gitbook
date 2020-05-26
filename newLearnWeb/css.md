### CSS

> 外部样式

  * 提高页面响应速度
  * 解决多页面样式重复
  * 代码分离，有利于阅读

> 三原色 红绿蓝

  * `#f00`
  * `#0f0`
  * `#00f`

> 字体大小

  * px 绝对单位
  * em 相对单位（相对与父元素 为父元素的倍数）
  * 如果父元素字体大小没有，则使用基准像素（浏览器）
  * sans-serif 非衬线字体
  * text-indent 缩进 em（表示一个字符）

> line-height

  * 数字 表示为当前文字的多少倍（多行元素适用）   `1.5 为当前文字的1.5倍`

> 元素选择器

  * `+` 兄弟元素   例： div+li
  * `~` 后面全部元素  例： div~li

### 层叠
  * 声明冲突：同一个样式，多次应用到同一个元素。
  * 层叠：解决声明冲突的过程，浏览器自动处理。（或者成为权重计算）
  * 比较重要性 （由高到低）
    * 作者样式表中的 !important 样式
    * 作者样式表中的普通样式
    * 浏览器默认样式
  * 比较特殊性（看选择器）
	* 总体规则：选择器选择的范围越窄，越特殊。 （例如id：智能选中一个元素）
   * 具体规则：通过选择器计算出四位数
   * 1、千位 内联样式，存在记为1，否为0
   * 2、百位 所有ID选择器的数量
   * 3、十位 类选择器、属性选择器、伪类选择器
   * 4、个位 所有元素选择器、伪元素选择器
  * 比较源次序
    * 代码书写靠后的胜出
  * normalize.css、reset.css、meyer.css
  * 爱恨法则 live、visited、hover、active

### 继承
  * 通常跟文字相关的属性都能继承

### 属性值的计算过程 （指元素的所有属性都有值）
  * 页面树形结构渲染
  * 渲染每个元素的条件：该元素的所有css属性必须有质
  * 过程
    * 确定声明值：参考样式标中没有冲突的声明，作为css属性值
    * 层叠冲突：对样式表中有冲突的声明使用层叠规则，确定css属性值
    * 使用继承：对仍然没有值的属性，若可以继承，责继承父元素的值 （inherit）
    * 使用默认值：对仍然没有值的属性，使用默认值
  * css特殊值
    * inherit: 继承值
    * initial: 初始值、默认值

### 盒模型
  > 盒子：每个元素在页面中都会生成一个矩形区域

  * 盒子类型
    * 1、行盒 inline
    * 2、块盒 block

  * 盒子组成部分
    * 1、内容 content 内容盒(content-box）width、height 盒子的内容宽高
    * 2、填充（内边距） padding 填充盒(padding-box）
    * 3、边框 border 边框盒（border-box）
    * 4、外边距 margin
 
### 盒模型应用
>	改变背景覆盖范围
 
*	background-clip: content-box; padding-box; border-box; 

> 溢出隐藏

*	淘宝标题

###	行盒的盒模型

>	行盒 `span` `i` `img` `video` `audio`

*	调整高度 应使用line-height

*	padding 内边距、边框、外边距
	*	水平方向有效，垂直方向只会填充背景，不会实际占据空间

>	行块盒 `span` `i` `img` `video` `audio`

*	调整高度 应使用line-height

*	padding 内边距、边框、外边距
	*	水平方向有效，垂直方向只会填充背景，不会实际占据空间
*	空白折叠 元素之间的回车等 会用一个空格代替
* 	object-fit: 元素适应容器的范围

###	视觉格式化模型
>	页面中的多个盒子排列规则 大体将页面中的盒子排列分为3中方式：`常规流` `浮动` `定位`

* 常规流
	*	所有元素，默认都属于常规流
	*	包含块，决定了盒子的排列区域 （绝大部分 元素的包含）
	* 	块盒在其包含块中居中，可以定宽，然后左右margin 设置为auto
	*  设置元素超出父元素，可使用margin 负值
	*  padding、margin、宽 百分比相当于包含块宽度的百分比
	*	外边距合并 上下相邻的元素取最大值 父子元素相邻的margin-top 会合并，要使其不合并需要使其不相邻。

*	浮动
	*	应用场景：`文字环绕` `横向排列`
	*	当一个元素浮动后必定是块盒（display: block）
	* 	宽度为auto，适应内容宽度
	*	行盒在排列的时候会避开浮动的盒子
	* 	高度坍塌：常规流盒子的自动高度，在计算的时候不会考虑浮动元素
	*  清除浮动 `clear: left\right\both` 清除所有左、右、左右的浮动盒子

*	定位
	*	定位下的居中显示
	*	绝对定位固定定位下 margin: auto 会自动吸收剩余空间
	* 	position: fixed; left: 0; right: 0; top: 0; bottom: 0; margin: auto;

###	样式
*	鼠标样式
	*	cursor: url('.ico/.cur'), auto;
	* 	auto 类似字体设置，若图片获取失败，则显示auto

*	盒子隐藏
	*	display: none;
	* 	visibility: hidden;

*	背景图
	*	当图片属于网页内容时，必须使用img元素
	* 	当图片属于美化页面时，必须使用背景图
	*  background-attachment: fixed; 控制图片是否固定 

### 文字超出隐藏
*	单行

	```
	.box {
		width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: nowrap;
	}
	```

*	多行 （IE不兼容）

	```
	.box {
		width: 100px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
  		-webkit-line-clamp: 3;
  		overflow: hidden;
  		word-break: break-word;
	}
	```
 
### 文本两端对齐
	.wrap {
	    text-align: justify;
	    text-justify: distribute-all-lines;  //ie6-8
	    text-align-last: justify;  //一个块或行的最后一行对齐方式
	    -moz-text-align-last: justify;
	    -webkit-text-align-last: justify;
	}
	
### 自定义滚动条
	overflow-y: scroll;
	整个滚动条
	::-webkit-scrollbar {
	    width: 5px;
	}
	
	滚动条的轨道
	::-webkit-scrollbar-track {
	    background-color: #ffa336;
	    border-radius: 5px;
	}
	
	滚动条的滑块
	::-webkit-scrollbar-thumb {
	    background-color: #ffc076;
	    border-radius: 5px;
	}
	
### 三角形
	.triangle { 
	  border-color: red yellow blue green; 
	  border-style: solid; 
	  border-width: 100px; 
	  height: 0px; 
	  width: 0px; 
	}
	
### input
*	光标颜色单独设置
	
		caret-color: red; // IE不兼容

*	placeholder颜色设置

		.input1::-webkit-input-placeholder {
		    color: green;
		}
		.input1:-moz-placeholder {
		    color: green;
		}
		.input1::-moz-placeholder {
		    color: green;
		}
		.input1:-ms-input-placeholder {
		    color: green;
		}

#### @规则

* @import

```
	//index.css
	@import "common.css"; // 导入另外一个CSS
```

* @charset

```
	//index.css
	@charset "utf-8"; // 告诉浏览器该CSS 的字符编码集是utf-8 改行必须写在文件开头
```

#### web 字体和图标

##### web字体

* 它是为了解决用户本地没有安装相应的字体， 强制让用户去下载字体

* 第一步：下载一个所需的字体包
* 第二步：使用 `@font-face` 制作新字体

```
@font-face {
	font-family: "my font";
	src: url("./font/myFont.ttf");
}
```

##### 字体图标

* 使用 iconFont

##### 布局

* 两栏布局
```

```

 
 
 
 
 
 
 
 
 
