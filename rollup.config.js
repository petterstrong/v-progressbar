import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/index.js',
  output: {
    name: 'VProgressBar',
    file: 'dist/v-progress.js',
    format: 'iife'
  },
  plugins: [
    vue({
      css: true
    }),
    babel()
  ]
}
