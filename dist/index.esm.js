import cloneDeep from 'lodash.clonedeep'

function pad (string) {
  while (string.length < 8) {
    string += ' '
  }
  return string
}
function logEmpty (name) {
  console.log(pad(name) + ' %cnone', 'color:grey')
}
function initClicky (options) {
  if (options === void 0) options = {shift: false, ctrl: false, left: false}

  var style = 'background:#42b983;color:white;border-radius:99px;padding:0px 6px;'
  function clicky (e, isParent) {
    var vue = isParent ? e : e.target && e.target.__vue__
    if (vue) {
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
        var computed = {}
        for (var key in vue._computedWatchers) {
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
    } else if (e.target.parentNode) {
      clicky({target: e.target.parentNode})
    } else {
      console.info('no Vue component found')
    }
  }
  document.addEventListener(options.left ? 'click' : 'contextmenu', function (e) {
    if ((!options.ctrl || e.ctrlKey) && (options.shift || e.shiftKey)) {
      if (options.stop) {
        e.preventDefault()
        e.stopPropagation()
      }
      clicky(e)
    }
  })
}

initClicky.install = function (Vue, options) {
  initClicky(options)
}

export default initClicky
