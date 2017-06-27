# vue-clicky
Handy debugging function for Vue. Right click any vue component, and it will show you neatly formatted info about it in the console.

I don't know if it's worth creating a real package out if it, so I'll just paste the code here:
```javascript
document.oncontextmenu = function clicky(e, v){
	let vue = e && e.target.__vue__ || v
	if(vue){
		console.group(vue.$options.name || vue.$options._componentTag)
		let proto = new function vue(){}
		console.log(_.extend(proto,vue))
		if(!_.isEmpty(vue._data)){
			let data = {}
			_.each(vue._data, (val, key) => data[key] = vue[key])
			let proto = new function data(){}
			console.log(_.extend(proto,data))
		} else {
			console.log('data',null)
		}
		let computed = {}
		_.each(vue._computedWatchers, (watcher, key) => computed[key] = watcher.value)
		if(!_.isEmpty(computed)){
			let proto = new function computed(){}
			console.log(_.extend(proto,computed))
		} else {
			console.log('computed',null)
		}
		if(!_.isEmpty(vue._props)){
			let proto = new function props(){}
			console.log(_.extend(proto,vue._props))
		} else {
			console.log('props',null)
		}
		if(vue.$parent){
			let proto = new function parent(){}
			let link = {
				name:vue.$parent.$options.name || null,
				tag:vue.$parent.$options._componentTag || null,
				get LINK(){
				clicky(false, vue.$parent)
				return null
			}}
			link.__proto__ = proto.__proto__
			console.log(link)
		} else {
			console.log('parent',null)
		}
		console.groupEnd()
	} else if(e.target.parentNode){
		clicky({target:e.target.parentNode})
	}
}
```
