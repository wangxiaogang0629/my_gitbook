## vue-cli
* vue inspect --rules 查看所有规则
	* vue inspect --rule svg

* 环境变量和模式
	* 使用 vue-cli 提供的模式进行配置
	* dev、product、test
	* 配置文件 .env.dev
	
		```
		// 服务端两个变量都可访问、客户端只能访问到客户端的变量
		// 服务端
		foo = bar
		// 客户端
		VUE_APP_DONG= foo
		```

* 权限控制
	* 用户切换角色 res 变量
	* no can no bb
	* 异步控制
	* 按钮权限
		* 创建指令
	* axios 请求、响应拦截
	* 模拟接口 vue.config- devserve-before

* 云烟成雨
* yarn --ignore-scripts