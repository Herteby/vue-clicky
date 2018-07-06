import cloneDeep from 'lodash.clonedeep'

export default function initClicky (options = {shift: false, ctrl: false, left: false}) {
  document.addEventListener(options.left ? 'click' : 'contextmenu', e => {
    if ((!options.ctrl || e.ctrlKey) && (!options.shift || e.shiftKey)) {
      if (options.stop) {
        e.preventDefault()
        e.stopPropagation()
      }
      const vue = findVue(e.target)
      if(vue){
        printInfo(vue)
      }
    }
  })
}
initClicky.install = function (Vue, options) {
  initClicky(options)
}
function pad (string) {
  while (string.length < 8) {
    string += ' '
  }
  return string
}
function logEmpty (name) {
  console.log(pad(name) + ' %cnone', 'color:grey')
}
const style = 'background:#42b983;color:white;border-radius:99px;padding:0px 6px;'

function findVue(node){
  let vue = node && node.__vue__
  if(vue){
    return vue
  } else if (node.parentNode){
    return findVue(node.parentNode)
  } else {
    console.info('no Vue component found')
  }
}
function printInfo (vue, isParent) {
  if (isParent) {
    console.groupCollapsed('%cparent   %c' + (vue.$parent ? vue.$options.name || vue.$options._componentTag || 'anonymous' : 'Root'), 'font-weight:normal', style, vue)
  } else {
    console.group('%c' + (vue.$parent ? vue.$options.name || vue.$options._componentTag || 'anonymous' : 'Root'), style, vue)
  }
  // DATA
  if (Object.keys(vue.$data).length) {
    console.log(pad('data'), cloneDeep(vue.$data))
  } else {
    logEmpty('data')
  }
  // COMPUTED
  if (vue._computedWatchers && Object.keys(vue._computedWatchers).length) {
    let computed = {}
    for (let key in vue._computedWatchers) {
      computed[key] = cloneDeep(vue[key])
    }
    console.log(pad('computed'), computed)
  } else {
    logEmpty('computed')
  }
  // PROPS
  if (vue._props && Object.keys(vue._props).length) {
    console.log(pad('props'), cloneDeep(vue._props))
  } else {
    logEmpty('props')
  }
  // ELEMENT
  console.log(pad('element'), vue.$el)
  // ROUTE
  if (!isParent && vue.$route) {
    console.log(pad('route'), vue.$route)
  }
  // PARENT
  if (vue.$parent) {
    clicky(vue.$parent, true)
  } else {
    logEmpty('parent')
  }
  console.groupEnd()
}

