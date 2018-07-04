import buble from 'rollup-plugin-buble'
export default {
  input: 'clicky.js',
  output: {
    name: 'VueClicky',
    exports: 'named'
  },
  external: [ 'lodash.clonedeep' ],
  plugins: [buble()]
}
