import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/v-progress.js',
    format: 'iife'
  },
  moduleName: 'VProgressBar',
  plugins: [
    babel()
  ]
}
