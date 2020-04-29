# node升级/版本切换方法

> 支持 mac


*  首先：安装n模块 

	```
	sudo npm install -g n
	```

*  升级node.js到最新稳定版

	```
	sudo n stable
	```

*  升级到最新版

	```
	sudo n latest
	```
	
*  升级到任意版本 

	```
	sudo n v14.0.0 或 sudo n 14.0.0
	```

*  切换版本

	```
	sudo n v14.0.0
	```

*  删除指定版本

	```
	sudo n rm v14.0.0
	```

*  删除已安装的版本和npm

	```
	sudo n uninstall
	```

*  用指定的版本执行脚本

	```
	sudo n use v14.0.0 demo.js
	```

*  查看所有已安装的node版本，可以上下选择然后回车确定要使用的版本

	```
	sudo n
	```