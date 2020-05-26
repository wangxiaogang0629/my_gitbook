### Adb 的全称为 Android Debug Bridge，就是起到调试桥的作用。

## 安装

> 由于现在谷歌推荐大家使用 android studio 开发，在安装 android studio 后，可以在下面的路径找到 adb 。在此路径下找出
~/Library/Android/sdk/platform-tools


##### 第一步：找到 adb 路径

* 打开 Finder, `command + shift +g` 前往文件夹 ~/Library/Android/sdk/platform-tools

##### 第二步：配置环境变量

* `sudo vi ~/.bash_profile`
* 增加语句 `export PATH=${PATH}:~/Library/Android/sdk/platform-tools`
* `source ~/.bash_profile`
* 可用 `echo $PATH` 输出配置好的环境变量 检查是否配置成功


##### 第三步：检测adb成功

* 终端输入 adb 将会显示 help 等信息

## 常用命令

* `adb devices` 显示当前连接的安卓设备

* `adb logcat -v time > ~/Desktop/adb/log.txt` 打印 log 保存在文件中

* `adb install -r 安装包路径` 安装 apk
	* `-l`　锁定该应用程序
	* `-r`　替换已存在的应用程序，也就是说强制安装
	* `-t`　允许测试包
	* `-s`　把应用程序安装到sd卡上
	* `-d`　允许进行将见状，也就是安装的比手机上带的版本低
	* `-g`　为应用程序授予所有运行时的权限

* `adb connect ip地址` 通过ip地址连接设备

* `adb disconnect ip地址` 通过ip地址断开设备连接
* `adb shell ls` 显示设备文件目录

## 连接手机

##### 方法一：直接连接

* 直接用 USB 连接
* 使用 `adb devices` 查看设备是否已连接

##### 方法二：ip 连接

* 第一步：用 usb 连接手机，手机不要连 wifi，然后使用 adb tcpip 5555
* 第二步：拔掉 usb 线，手机打开 wifi 查询 ip 地址，使用 `adb connect ip` 连接手机即可
* 最后：使用 `adb devices` 查看设备是否已连接

## 将文件保存至手机sd卡

* 第一步：查询手机路径 sd 卡路径
* 第二步：`adb push 文件路径`

