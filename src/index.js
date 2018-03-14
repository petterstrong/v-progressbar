'use strict'

import VProgressBar from './v-progress.vue'

let VPBar = Vue.extend(VProgressBar) // 构建
let barPool = [] // 当前加载

const getInstance = () => {
  return new VPBar({
    el: document.createElement('div')
  })
}

const ProgressBar = (options= {}) => {
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
    document.body.appendChild(instance.$el)
  }

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *  NProgress.set(0.4);
   *  NProgress.set(1.0);
   */
  instance.set = function (n) {
  }

  instance.done = function () {
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

  /**
   * Remove progressbar instance from parentNode
   */
  instance.remove = function () {
    instance.$el && instance.$el.parentNode && instance.$el.parentNode.removeChild(instance.$el)
  }
  /**
   * Helpers
   */

  function clamp (n, min, max) {
    if (n < min) return min
    if (n > max) return max
    return n
  }
  return instance
}

function install (Vue, options) {
  const isBrowser = typeof window !== 'undefined'
  Vue.component('v-progressbar', VProgressBar)
  Vue.prototype.$progressbar = ProgressBar()
}

export default {
  install,
  version: '0.0.2'
}
