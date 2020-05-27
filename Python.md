### 自动化测试

* 单元测试：简化单元测试的编写。
* 对 GUI 程序的自动化测试：Python 提供了模拟鼠标的单击和移动、键盘输入等功能，模拟用户操作 GUI 程序。
* Web 自动化测试：Python 提供了模拟鼠标的单击和移动、键盘输入等功能，模拟用户操作浏览器。
* 性能测试：使用代码模拟大批量用户，让用户并发请求，统计系统负载能力并生成报告。

### 自动化运维

* 服务部署工具，当应用较为简单时，只需要在少量服务器上部署少量的服务，可以采用人工操作；当应用较复杂，需要在大量服务器上部署大量的服务，采用服务部署工具可以一键实现在多台服务器上自动化部署多项服务。
* 服务监控工具，对服务运行的状态进行实时的监控，随时发现服务的运行异常和资源消耗情况；对服务出现的任何异常进行及时处理，尽可能避免问题的扩大化甚至中止服务

### 数据分析

> Python 提供了和数据分析相关的模块，典型的包括：

* numpy，用于数学计算，如矩阵计算。
* pandas，基于 numpy 数据分析工具，提供了大量能使我们快速便捷地处理数据的函数和方法。
* matplotlib：用于数据结果的可视化，将数据展现为散点图、折线图、直方图、柱状图、饼图等直观的形式。

# 使用

* 命令行启动pyhton `$ python3`
* 命令行退出 `$ exit()`
* 脚本文件头部写入如下代码，便可在命令行使用 `hell.py` 直接执行

	```
	#!/usr/local/bin/python3
	```
* 给文件添加权限 `chmod +x hello.py`

#### Set 集合

* 创建一个空集合 必须用 Set()
* 创建一个非空集合 可以使用 {}
* Set 集合可以进行集合运算（差集-、交集｜、并集&、两者都不^）

```
a = set({ 1, 2, 3 })
b = { 1, 2, 3 }
```

#### Dictionary 字典

* 字典中的值通过键来存取
* 创建一个空字典使用 {}
```
people = { name: 'xiaogang', age: '20' }
```

#### 注释

* `#` 单行注释
* `""" """` 多行注释
* `''' '''` 多行注释

#### 运算符

* `//` 向下取整
* `**` 幂次运算 a**b
* 逻辑运算符
	* `and`  x and y
	* `or` x or y
	* `not` not x
* 成员运算符
	* `in` a in list
	* `not in` a not in list
* 身份运算符
	* 用于比较两个对象的存储单元, 如果引用的是同一个对象则返回 True，否则返回 False
	* `is` a is b 
	* `is not`

#### 字符串格式化

|符号|描述|
|:--|:--|
|%c|格式化字符及其ASCII码|
|%s|格式化字符串|
|%d|格式化整数|
|%f|格式化浮点数字，可指定小数点后的精度|

`print('my name is %f %d years old', %('xiaogang', 20))`


#### 爬虫
> 简单的爬虫架构

							
爬虫调度端---> url 管理器 ---> 网页下载器 ---> 网页解析器 ---> 价值数据
											          ｜
											      url 管理器  
											     
> url 管理器

* 防止循环、重复抓取
* 实现方式 （存储待爬取和已爬取的 url）
	* 利用python内存 set()，set 类型数据可自动去重
	* 利用 mysql 数据库存储，将 url 和 isCrawl 存入
	* 利用缓存数据库 redis， 支持 set() 类型数据

> 网页下载器

* urllib2 官方模块

```
import urllib.request

#方式一
# 直接请求
res = urllib.request.urlopen('http://www.baidu.com')

# 获取状态码，检测是否请求成功
res.getcode() 

# 读取数据
res.read()
```
```
#方式二
# 创建 request 对象
req = urllib.request.request('url')

# 添加数据
req.add_data('a', '1')

# 添加 header
req.add_header('a', '1')

# 请求
res = urllib.request.urlopen(req)

# 获取状态码，检测是否请求成功
res.getcode() 

# 读取数据
res.read()
```
```
#方式三
import cookielib

# 创建一个 cookie 容器
cj = cookielib.cookieJar()

# 创建一个opener
opener = urllib.request.build_ opener(urllib2.HttpCookieProcessor(cj))

# 给 urllib2 安装 opener
urllib.request.install_opener(opener)

# 请求
res = urllib.request.urlopen(req)

# 获取状态码，检测是否请求成功
res.getcode() 

# 读取数据
res.read()
```

#### 实例

```
#!/usr/local/bin/python3

import urllib.request

url = 'http://www.baidu.com'


print('方法一')
res = urllib.request.urlopen(url)
code = res.getcode()
print(code)
readRes = res.read()
# readResr 读取结果长度
print(readRes.decode('utf-8'))

f = open('res.html', 'r+')
f.write(readRes.decode('utf-8'))
```
* requests 第三方模块










