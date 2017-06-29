document.addEventListener('contextmenu', function clicky(e, isParent){
    let vue = isParent ? e : e.target && e.target.__vue__
    if(vue){
        if(isParent){
            console.groupCollapsed('%cparent:%c' + (vue.$parent ? vue.$options.name || vue.$options._componentTag : 'Vue'),'font-weight:normal','color:green')
        } else {
            console.group('%c' + (vue.$parent ? vue.$options.name || vue.$options._componentTag : 'Vue'),'color:green')
        }
        let proto = new function vue(){}
        console.log(Object.assign(proto,vue))
        if(vue._data && Object.keys(vue._data).length){
            let data = new function data(){}
            for(let key in vue._data){
                data[key] = vue[key]
            }
            console.log(data)
        } else {
            console.log('data',null)
        }
        let computed = new function computed(){}
        for(let key in vue._computedWatchers){
            computed[key] = vue._computedWatchers[key].value
        }
        if(Object.keys(computed).length){
            console.log(computed)
        } else {
            console.log('computed',null)
        }
        if(vue._props && Object.keys(vue._props).length){
            let proto = new function props(){}
            console.log(Object.assign(proto,vue._props))
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
    } else {
        console.info('no Vue component found')
    }
})