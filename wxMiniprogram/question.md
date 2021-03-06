## 授权设置页

> button 打卡方式时：使用授权设置页时，需要先进行权限判断，在第一次授权拒绝之后才可以使用 button 跳转到授权设置页

> 使用微信接口打开

## 图片

* 保存图片，图片预览要使用单独的微信接口
* 上传图片时需要使用微信的上传接口进行上传

## 小程序授权

* 小程序有单独的授权接口，可以第一次询问授权时使用 wx.authorize，使用时需要先查询一下用户是否授权了 对应的scope，具体请查看小程序文档

## 返回首页按钮去除
* wx.hideHomeButton() 在页面 onShow 中调用

## 下拉刷新

```
// 1、页面配置文件中配置："enablePullDownRefresh": true
// 2、然后下拉事件处理函数 onPullDownRefresh 中停止刷新

setTimeout(() => {
	wx.stopPullDownRefresh();
}, 500)
```

## 优化

* 检查接口是否可以缓存，若接口信息在一段时间内浮动变化不大，即可将其缓存至本地
* 优化定时器，将页面中的定时器及时卸载
* 优化接口，检查是否存在接口异常之后重新请求接口的情况，若存在则需要延时再次请求接口的时间，以避免出现接口请求死循环
* setData，修改数据为对象时，可使用 `"data.id": 1` 进行修改，减少 setData 的数据量
* 页面首屏加载的时候，若存在接口请求，可考虑添加 loading 态进行优化
* 使用 `wx:key = "index"` 时，index 不用加花括号
* 图片路径可以直接写 `/images/xx.jpg` ,不使用绝对路径
* 小程序登录授权需要优化，再用户可以正常体验的小程序情况后，进行授权询问
