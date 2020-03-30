### 打包步骤：

* 1、将签名文件 路径找到
* 2、修改项目中签名文件路径 /android／key.properties 文件中的 storeFile=签名文件路径
* 3、在项目目录下 运行一下代码进行打包
	
	```
	// 32
 	flutter build apk --debug --target-platform android-arm 
 	// 64
 	flutter build apk --debug --target-platform android-arm64
	```
	flutter build apk --debug --target-platform android-arm
