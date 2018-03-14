<template>
  <div class="v-progress">
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      global: {
        type: Boolean,
        default: true
      }
    },
    name: '',
    data () {
      return {}
    },
    created () {}
  }
</script>

<style type="text/scss" lang="scss">
  .v-progress {
    .bar {
    }
  }
</style>
