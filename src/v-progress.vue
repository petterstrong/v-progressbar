<template>
  <div class="v-progress" :class="{global}">
    <div class="bar" :style="styleObj" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-progressbar',
    props: {
      global: {
        type: Boolean,
        default: true
      },
      styleObj: {
        type: Object,
        default: function () {
          return {
          }
        }
      }
    },
    name: '',
    data () {
      return {}
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style type="text/scss" lang="scss">
  .v-progress {
    pointer-events: none;
    .bar {
      position: relative;
      width: 100%;
      height: 2px;
    }
    .peg {
      display: none;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px #29d, 0 0 5px #29d;
      opacity: 1.0;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
    .spinner {
      display: none;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }
    .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: #29d;
      border-left-color: #29d;
      border-radius: 50%;

      -webkit-animation: nprogress-spinner 400ms linear infinite;
      animation: nprogress-spinner 400ms linear infinite;
    }
    &.global {
      .bar {
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
      }
      .spinner {
        display: block;
      }
      .peg {
        display: block;
      }
    }
    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
</style>
