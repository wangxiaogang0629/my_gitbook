# npm发布包

## 检查npm源
* nrm ls 检查 npm源
* nrm use fnpm 使用fnpm源（没有要去设置）

## 第一步
* 在有package.json文件的目录下依次使用以下命令（以组件库为例）

## 第二步
* npm run build-babel 将要发布的文件进行编译

## 第三步 登录
* 使用npm adduser进行登录，若为第二次上传也可使用npm login进行登录
* npm adduser 登录账号依次输入账号、密码、邮箱

## 第四步 删除旧包
* npm unpublish  frog-design --force 若npm 上已有发布了的包先将旧的删除，若没有则直接执行第五步

## 第五步 检查信息并发布
* 检查package.json文件中的name（你要发布的包的名称）version（要发布的版本号）将其检查修改
* npm publish 发布包

## 第六步 下载检查
* npm install frog-design 下载检查，或在npm上查看发布的包的名字、版本号是否正确（第六步）