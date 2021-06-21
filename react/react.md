# refs

> callback 方式、接受一个 element 参数

```
  <input ref = { (ele) => console.log(ele) } />
```

> creatRef

  * 绑定在 dom 元素，可以获取 dom 节点
  * 绑定在 class 组件，可以获取 class 节点且可以调用类组件内部的函数
  * Function 组件 不能直接使用 refs
      * 需要将 ref 转发，它将ref自动地通过组件传递到其子组件
      * 需使用 React.forwardRef，接受一个渲染函数，其接收 props 和 ref 参数并返回一个 React 节点

  ```
  步骤：
  1、我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
  2、我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。
  3、React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
  4、我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
  5、当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。

  const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));
  
  // 你可以直接获取 DOM button 的 ref：
  const ref = React.createRef();
  <FancyButton ref={ref}>Click me!</FancyButton>;
  ```
 
> hook 用法
	
  * useRef
	
	```
	const inputRef = useRef(null)
	<input ref={ inputRef } />
	```

> 高阶组件转发 ref， React.forwardRef

# 为什么使用 hook

> class 组件的弊端

* 在组件之间复用状态逻辑困难 
* 复杂组件变得难以理解和维护
  * 需要在一个生命周期里面做很多事情，生命周期就会变得特别庞大
  * hook 可以定义多个 useEffect 颗粒化解耦，及自定义 hook 提取可复用的功能逻辑
* hook 使得函数组件可以存储和改变状态，及可以执行一些副作用（useEffect、useLayoutEffect），还可以复用状态逻辑（自定义hook）

# react 性能优化

> 总结： 减少计算、渲染和请求

* 减少不必要的渲染
	* shouldComponentUpdate
	* pureComponent
	* React.memo 函数组件使用
* 数据缓存
	* useMemo 缓存参数
	* useCallback 缓存函数
	* 函数、对象尽量不要使用内联的方式 
	* Router 中的内联函数渲染的时候使用 render 或者 children，不要使用 component
		* 当使用 component 的时候，Router 会用你指定的组件和 React.createElement 创建一个新的[react element]。这意味着当你提供一个内联函数的时候，每次 render 都会创建一个新的组件。这会导致不再更新已经现有的组件，而是直接卸载然后再去挂在一个新的组件。因此用到内联函数的内联渲染时，请使用 render 或者 children
	* 懒加载，长列表分页
	* 减少 http 请求

# 事件系统

> 事件如果都注册到节点上，之后还需要进行回收，这就会增加性能消耗
  * react 通过事件委托的原理把所有的事件都注册到 document 上统一分发
  * 怎么判断是否是合成事件？
	  * 映射表，react 有事件映射表，通过比对节点的属性值看属性是否是映射表中的合成事件进而判断

# setState

* 可以是同步也可以是异步
* 在合成事件中异步、原生事件中同步 (react 根据环境判断是否在合成事件环境)
* 在合成事件中进行批处理