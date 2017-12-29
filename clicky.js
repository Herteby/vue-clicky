var cloneDeep = require('lodash.clonedeep')
var options = {
    shift:false,
    ctrl:false
}
function clicky(e, isParent){
    let vue = isParent ? e : e.target && e.target.__vue__
    if(vue){
        if(isParent){
            console.groupCollapsed('%cparent   %c' + (vue.$parent ? vue.$options.name || vue.$options._componentTag : 'Vue'), 'font-weight:normal', 'color:green')
        } else {
            console.group('%c' + (vue.$parent ? vue.$options.name || vue.$options._componentTag : 'Vue'), 'color:green')
        }
        console.log(vue)
        if(Object.keys(vue.$data).length){
            console.log('data    ', cloneDeep(vue.$data))
        } else {
            console.log('data     %cnone', 'color:grey')
        }
        
        let computed = {}
        for(let key in vue._computedWatchers){
            computed[key] = cloneDeep(vue._computedWatchers[key].value)
        }
        if(Object.keys(computed).length){
            console.log('computed', computed)
        } else {
            console.log('computed %cnone', 'color:grey')
        }
        if(vue._props && Object.keys(vue._props).length){
            console.log('props   ', cloneDeep(vue._props))
        } else {
            console.log('props    %cnone', 'color:grey')
        }
        if(vue._grapher){
            let grapher = {}
            for(let key in vue._grapher){
                grapher[key] = cloneDeep(vue[key])
            }
            if(Object.keys(grapher).length){
                console.log('grapher ', grapher)
            } else {
                console.log('grapher  %cnone', 'color:grey')
            }
        }
        if(vue.$parent){
            clicky(vue.$parent, true)
        } else {
            console.log('parent   %cnone', 'color:grey')
        }
        console.groupEnd()
    } else if(e.target.parentNode){
        clicky({target:e.target.parentNode})
    } else {
        console.info('no Vue component found')
    }
}
document.addEventListener('contextmenu', e => {
    if((options.ctrl && !e.ctrlKey) || (options.shift && !e.shiftKey)){
        return
    } else {
        if(options.ctrl || options.shift){
            e.preventDefault()
            e.stopPropagation()
        }
        clicky(e)
    }
})

module.exports = {options}