document.addEventListener('contextMenu', function clicky(e, isParent){
    let vue = isParent ? e : e.target && e.target.__vue__
    if(vue){
        if(isParent){
            console.groupCollapsed('%cparent:%c' + (vue.$options.name || vue.$options._componentTag || vue.$options.el),'font-weight:normal','color:green')
        } else {
            console.group('%c' + (vue.$options.name || vue.$options._componentTag || vue.$options.el),'color:green')
        }
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
            clicky(vue.$parent,true)
        } else {
            console.log('parent',null)
        }
        console.groupEnd()
    } else if(e.target.parentNode){
        clicky({target:e.target.parentNode})
    }
})