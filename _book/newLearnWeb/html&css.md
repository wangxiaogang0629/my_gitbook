* meta元素
  * 移动端 定义视口宽度为设备宽度 不容许缩放

* 语义
  * 元素决定显示什么，显示的样子是什么由CSS决定
  * 为了搜索引擎优化
  * 为了让浏览器理解网页
  * p 段落
  * 块级元素、行内元素（html5 中这种说法已弃用）
  * span 仅用于设置样式，没有语义
  * pre 可以显示代码 也可以用 white-space: pre;
  * 实体

* a
  * 引用 普通链接
  * 跳转锚点 给元素添加id，之后a元素属性href设置为此`#id`
  * 功能链接 javascript:、 发送邮件、 电话 tel:1234567 (移动端)
  * target 跳转窗口位置 `_blank`

* 路径
  * 绝对路径 http://baidu.com 协议://主机名:端口号/路径
  * 相对路径 ./

* img元素 src source资源
* img与map 定义图片中可点击的区域
  * name属性，img元素中使用usemap='#name'
  * area 定义可点击的区域

* img与figure 表示与图片相关的元素 语义化
  * figcaption 图片标题

* video
  * mude 静音 后可自动播放
  * 兼容不同的视频格式 使用source元素 添加多个资源

* 有序列表ol、li

* aside 侧边栏，其余页面内容几乎无关的部分

* del元素 错误的内容
* s元素 过期的内容

* 元素包含关系
  * 由元素内容类别决定
