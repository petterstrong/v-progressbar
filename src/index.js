'use strict'

import VProgressBar from './v-progress.vue'

let VPBar = Vue.extend(VProgressBar) // 构建
let barPool = [] // 当前加载

const getInstance = () => {
  return new VPBar({
    el: document.createElement('div')
  })
}

const ProgressBar = (options = {}) => {
  console.log(options)
  const opts = {
    minimum: 0.08,
    easing: 'linear',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleSpeed: 200,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    theme: 'darkred'
  }
  options = Object.assign({}, opts, options)

  const instance = getInstance()
  instance.styleObj = {
    progress: {},
    bar: {
      backgroundColor: options.theme
    },
    peg: {
      boxShadow: `0 0 10px ${options.theme}, 0 0 5px ${options.theme}`
    },
    spinner: {
      borderTopColor: options.theme,
      borderLeftColor: options.theme
    }
  }

  instance.start = function () {
    if (!instance.status) {
      instance.show()
      instance.set(0)
    }

    const work = function() {
      setTimeout(function() {
        if (!instance.status) return
        instance.trickle()
        work();
      }, options.trickleSpeed)
    };

    if (options.trickle) work()

    return this;

  }

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *  NProgress.set(0.4);
   *  NProgress.set(1.0);
   */
  instance.set = function (n) {
    n = clamp(n, options.minimum, 1)
    instance.status = (n === 1 ? null : n)

    let {speed, easing} = options

    if (!instance.status) {
      instance.show()
    }

    queue(next => {
      if (!options.positionUsing) options.positionUsing = instance.getPositioningCSS()

      instance.styleObj['bar'] = Object.assign(barPositionCSS(n, speed, easing), {backgroundColor: options.theme})

      if (n === 1) {
        instance.styleObj['progress'] = {
          transition: 'none',
          opacity: 1
        }
        setTimeout(() => {
          instance.styleObj['progress'] = {
            transition: `all ${speed}ms linear`,
            opacity: 0
          }
          setTimeout(() => {
            instance.remove()
          }, speed)
        }, speed)
      } else {
        setTimeout(next, speed)
      }
    })
    return this
  }


  instance.done = function (force) {
    if (!force && !instance.status) return this
    return instance.inc(0.3 + 0.5 * Math.random()).set(1)
  }

  instance.trickle = function () {
    return instance.inc()
  }

  instance.inc = function (amount) {
    let n = instance.status
    if (!n) {
      return instance.start()
    } else if (n > 1) {
      return
    } else {
      if (typeof amount !== 'number') {
        switch (n) {
          case n >= 0 && n < 0.2:
            amount = 0.1
            break
          case n >= 0.2 && n < 0.5:
            amount = 0.04
            break
          case n >= 0.5 && n < 0.8:
            amount = 0.02
            break
          case n >= 0.8 && n < 0.99:
            amount = 0.005
            break
          default:
            amount = 0
        }
      }
      n = clamp(n + amount, 0, 0.994)
      return instance.set(n)
    }
  }

  instance.show  = function () {
    document.body.appendChild(instance.$el)
  }

  var queue = (function () {
    var pending = []
    function next () {
      var fn = pending.shift()
      if (fn) {
        fn(next)
      }
    }
    return function (fn) {
      pending.push(fn)

      if (pending.length === 1) next()
    }
  })()

  /**
   * Remove progressbar instance from parentNode
   */
  instance.remove = function () {
    instance.$el && instance.$el.parentNode && instance.$el.parentNode.removeChild(instance.$el)
  }

  /**
   *  Determine which positioning CSS rule to use.
   */

  instance.getPositioningCSS = function () {
    const bodyStyle = document.body.style
    const vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
      ('MozTransform' in bodyStyle) ? 'Moz' :
        ('msTransform' in bodyStyle) ? 'ms' :
          ('OTransform' in bodyStyle) ? 'O' : ''
    if (vendorPrefix + 'Perspective' in bodyStyle) {
      return 'translate3d'
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      return 'translate'
    }
  }
  /**
   * Helpers
   */

  function clamp (n, min, max) {
    if (n < min) return min
    if (n > max) return max
    return n
  }
  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }

  function barPositionCSS(n, speed, ease) {
    var barCSS

    if (options.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' }
    } else if (options.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' }
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' }
    }

    barCSS.transition = 'all '+speed+'ms '+ease

    return barCSS;
  }
  return instance
}

function install (Vue, options) {
  const isBrowser = typeof window !== 'undefined'
  Vue.component('v-progressbar', VProgressBar)
  Vue.prototype.$progressbar = ProgressBar(options)
}

export default {
  install,
  version: '0.0.2'
}
