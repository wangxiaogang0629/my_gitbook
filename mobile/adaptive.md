# 适配

## `vw`、`vh`

>兼容：IE9及以上，IOS 6.1+ ，安卓4.4+

* 这两个单位都是根据视口屏幕来进行计算的，所以PC的时候，要注意滚动条

* 注意哦：不管设备是横屏还是竖屏，`vw`指的都是水平方向的，`vh`指的都是垂直方向的

* 它和百分比不一样，不会受到父级宽度的影响，这样我们通过`css`就可以获取到当前的视口宽度了，利用**获取到的视口宽度 / 100vw **

```css
html{
    font-size: 10vw;
}
/* 因为整个屏幕是 100vw ，这里我们分成 10 个格子，一个格子是 10vw 的 font-size */
```

这样的话，因为屏幕的宽度发生变化，html 上的`font-size`也会动态发生变化

```css
div{
    width:5rem;
    height:5rem;
}
```

以上和我们原来写`JS`达到的效果是一样的，当然我们也可以直接用vw的单位，例如：

```css
div{
    width:50vw;
    height:50vw;
}
```

> 除了上面说到的 `vw` 和 `vh `以外，还有 `vmin`和 ` vmax`
>
> `vmin`：选取 `vw `和` vh` 中较小的
>
> `vmax`：选取 `vw`和 `vh` 中较大的

## 横竖屏适配

> css 方案

- screen 屏幕
- orientation 方向
- portrait 竖向
- landscape 横向

```css
@media screen and (orientation:portrait){
    #box{
        background: red;
    }
}
@media screen and (orientation:landscape){
    #box{
        background: green;
    }
}
```

## 适配iPhoneX

<!-- ![](img/641.jpg) -->

`iphoneX`首先提出刘海屏概念的时候，打了所有软件一个措手不及，例如上面的王者荣耀，完全看不见金币有多少，也很难点击到，如果我对面有个`iphoneX`的对手，那简直就是福利局。

所以起初，我们如何适配`iphoneX`就是个很头疼的问题了。

不过毕竟iphoneX是个主流手机，为了更好的支持它，软件商纷纷拿出自己的方案，一直到现在，其实iphoneX的刘海在我们只做网站的时候，已经不会产生太大的影响了。

<img src="img/ipx.jpg" width="400">  <img src="img/E028E1F25FB56DED6E2003943F81A9DE.jpg" width="500">

左侧：`iphoneX`，同事哒，所以没法给你们演示，只能截个图啦~ 有设备的同学自己可以试试

右侧：`vivo`，这个是微信的界面，可以看到，也遮挡不到我们的内容

所以对于移动端来说，顶部的适配，我们已经不需要去处理啦，但是底部以及左右两侧，我们就要考虑下了

**安全区**

![](img/safe.jpg)

上面这个图，就是我们的安全区，保证内容是在安全区内进行显示的，会比较好，不容易发生遮挡、显示不全等问题。

<img src="img/ipx3.jpg" width="500">



利用`iphoneX`专属样式`viewport-fit`属性，他会对网页设置安全区

```html
<meta name="viewport" content="viewport-fit=cover>
```

- cover 
- contain

**配合css方法**

```css
body{
    padding-bottom:constant(safe-area-inset-bottom);
    padding-bottom:env(safe-area-inset-bottom);
}
```

- constant：小于IOS11.2版本生效
- env：大于IOS11.2版本生效

<img src="img/ipx2.jpg" width="500">

可以看到下面出现了一块内容，这次黑色的这条线，就不会挡住我们的文字或其它内容了。

- safe-area-inset-lef 设置左侧安全区
- safe-area-inset-right 设置右侧安全区
- safe-area-inset-top 设置顶部安全区
- safe-area-inset-bottom 设置底部安全区

### 1px适配方案

某些时候，设计人员希望 `1px`在手机显示的就是`1px`，这也是....闲的，但是我们也要满足他们的需求，

这时候我们可以利用缩放来达到目的

```css
.border_1px:before{
    content: '';
    position: absolute;
    top: 0;
    height: 1px;
    width: 100%;
    background-color: #000;
    transform-origin: 0% 0%;
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
    .border_1px:before{
        transform: scaleY(0.5);
    }
}
@media only screen and (-webkit-min-device-pixel-ratio:3){
    .border_1px:before{
        transform: scaleY(0.33);
    }
}

```

设置一个专门的`class`来处理`1px`的问题，利用伪类给其添加

- -webkit-min-device-pixel-ratio 获取像素比
- transform: scaleY(0.5) 垂直方向缩放，后面的数字是倍数


### 图片模糊问题

```css
.avatar{
    background-image: url(conardLi_1x.png);
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
    .avatar{
        background-image: url(conardLi_2x.png);
    }
}
@media only screen and (-webkit-min-device-pixel-ratio:3){
    .avatar{
        background-image: url(conardLi_3x.png);
    }
}
```

根据不一样的像素比，准备不一样的图片，正常来说是`1px图片像素` 对应`1px物理像素`，图片的显示就不会模糊啦

# 滚动穿透

<!-- ![wt1](../%E7%AC%94%E8%AE%B0/img/wt1.gif) -->

> 移动端的网站，经常会有一些弹出框出现，在弹出框上面滑动，会导致我们后面的整个页面发生移动，这个问题怎么解决呢？

* 方案一： 给超出的容器 fixed 定位
  * 注意 fixed 定位之后就可以使滚动条失效，但是它会瞬间回到`0,0`的位置，因为`fixed`是根据可视区定位的。需要配合 js 获取到定位前滚动条的位置进行处理

```css
body {
    position:fixed;
    width:100%;
}
```

# 键盘唤起

> 当底部输入框根据页面进行`fixed`定位时，键盘弹出一瞬间，`fixed`会失效，变成类似`absolute`，此时页面滚动输入框也会跟着滚动

* 方案：让内容无滚动，就不会连带`fixed`、`absolute`一起动了
  * 保证滑动如丝顺滑： -webkit-overflow-scrolling: touch;

```css
.main {
    position: absolute;
    top: 60px;
    bottom: 60px;
    overflow-y: scroll;
    width: 100%;
    -webkit-overflow-scrolling: touch;
}
```
