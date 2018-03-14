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
  }
  options = Object.assign({}, opts, options)

  const instance = getInstance()
  instance.styleObj = {
    backgroundColor: '#f56368'
  }

  instance.start = function () {
    document.body.appendChild(instance.$el)
  }

  instance.done = function () {
  }

  instance.remove = function () {
    instance.$el.parentNode.removeChild(instance.$el)
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
