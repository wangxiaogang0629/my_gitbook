### 防抖、节流

> 当我们在scroll事件中执行事件处理函数时，每次scroll事件触发都会执行事件处理函数，这样无限制的调用执行很多次重复的操作，会加重浏览器的负担。此时我们可以采用debunce（防抖）和throttle（节流）的方式来减少事件调用频率，同时也不影响实际效果。

* 防抖函数
	
	> 当频繁触发事件时，一定时间内没有再次触发事件，此时才会执行事件处理函数。
	
	> 如果设定的时间内，又一次触发了事件，就清除之前的处理函数，重新延时。
	
	```
	let timeoutFun = null;
	
	window. addEventListener('scroll', () => {
		
		if (timeoutFun !== null) { clearTimeout(timeoutFun); }
		
		timeoutFun = setTimeout(() => {
			console.log('执行事件处理');
		}, 1000);
		
	})
	```
* 函数节流

	> 使得一定时间内只出触发一次函数。
	
	> 原理：通过判断是否到达一定时间来触发函数。
	
	* 在节流函数内部使用开始时间 startTime 、当前时间 curTime 与 delay 来计算剩余时间 remaining。
	* 当remaining <= 0 时表示该执行事件处理函数了（保证了第一次触发事件就能立即执行事件处理函数和每隔delay时间执行一次事件处理函数）。
	* 如果还没到时间的话就设定在remaining时间后再触发 （保证了最后一次触发事件后还能再执行一次事件处理函数）。
	* 当然在remaining这段时间中如果又一次触发事件，那么会取消当前的计时器，并重新计算一个remaining来判断当前状态。

	```
	
	let timer = null;
	let startTime = Date.now();

    window.addEventListener('scroll', () => {
    	
		
		let curTime = Date.now();             
    	let remaining = 1000 - (curTime - startTime);             
    	clearTimeout(timer);
    	           
		if (remaining <= 0) {                   
		    console.log('第一触发事件 执行函数');                
		    startTime = Date.now();              
		} else {                    
		    timer = setTimeout(() => {
		    	console.log('settimeout 执行函数');
		    }, remaining);              
		}      


	});
	```
	
* 区别
	
	* 函数防抖：将几次操作合并为一此操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
	
	* 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。

	

