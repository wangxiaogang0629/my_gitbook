# GitBook 使用教程

### 准备工作

* 安装 Node.js

> GitBook 是基于Node.js的命令行工具，首先检查是否已安装node。

```
$ node -v
v10.13.0
```

### 安装 GitBook

> 使用 npm 进行安装

```
$ npm i gitbook-cli -g
```

> 检查是否安装成功

```
$ gitbook -V
CLI version: 2.3.2
GitBook version: 3.2.3
```

### 使用 GitBook

* 第一步：使用 `gitbook init` 创建一本书

    > 先创建一个文件夹，在此目录下使用 `gitbook init`。

    > 第一次使用 `gitbook init` 可能需要等待较长的时间下载出现 `gitbook init 3.2.3` 先耐心等待即可。

* 成功后会创建出 `README.md` 和 `SUMMARY.md` 两个必须文件, 这两个是必须文件

    > `README.md` 书籍的简单介绍

    > `SUMMARY.md` 书籍的目录结构

##### 生成的目录结构如下

```
gitbooks/
├── README.md     // 书籍的简单介绍
└── SUMMARY.md    // 书籍的目录结构
```

##### 命令行显示

```
$ gitbook init
warn: no summary file in this book 
info: create README.md 
info: create SUMMARY.md 
info: initialization is finished
```
 
* 第二步：使用 `gitbook serve` 

    > 命令行最后会显示书籍地址 Serving book on http://localhost:4000 ，打开这个地址就能看到写的书啦。

    > 网页显示的内容就是对应 `SUMMARY.md` 文件中的目录生成的。

    > 运行该命令后会在书籍的文件夹中生成一个 `_book` 文件夹, 里面的内容即为生成的 html 文件。

```
$ gitbook serve
...
...
...
Serving book on http://localhost:4000

```

* 第三步：编辑书籍

    > 使用 markdown 语法编辑书籍。
    > 编辑README.me 文件保存之后即可在网页上实时更新显示。

* 最后：若不想开启服务器就生成网页 可以使用 `gitbook build`

    > 之后打开 _book 目录下的 index.html 文件即可。




