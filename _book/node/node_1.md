### 调试

> Nodemon 监视代码修改，自动重启

```
npm i nodemon -g
nodemon helloworld.js
```

> 单元测试 jest

```
npm i jest -g
```

* 注意
	* 根目录下必须有 `pageage.json` 文件，`npm init`

* 创建文件夹 `_test_`
* 创建文件 `.spec.js` 与需要测试的文件名相同
* 运行 `jest helloworld.spec.js`
* 持续检测  `jest helloworld.spec.js --watch`

### 测试代码生成工具

* 需要
	* fs
	* path 

### 异步回调

* readFile
* promiseify 包装函数为 promise
* 常用 content-type
* 解决 if else 策略模式
* 以 shell 方式运行， 指定解释器为node

### http

* cookie http 是无状态协议 cookie 可以让其拥有状态
	* 不安全，传输的过程中以明文显示能被看到
	* 携带的数据量小
* session 
	* 可利用 UUID 生成随机数
	* cookie 中记录 sessionKey 的值
	* 后端可以利用sessionkey 存储信息，将信息存储在以 sessionkey 为 key 的对象中

* 签名
	* key + 密钥 = 签名（摘要）
* redis
	* 高性能 key value 数据库

* token 验证
* 贪心算法	






















