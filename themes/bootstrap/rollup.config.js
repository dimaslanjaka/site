import terser from '@rollup/plugin-terser';

/** @type {import('rollup').RollupOptions} */
export default {
  external: ['moment', '@popperjs/core', 'bootstrap', 'jquery'],
  context: 'window',
  input: './src/js/bootstrap-build.js',
  output: {
    file: 'source/bootstrap/js/bootstrap.js',
    format: 'umd',
    name: 'bsbundle', // this is the name of the global object
    esModule: false,
    sourcemap: true,
    globals: { jquery: '$', '@popperjs/core': 'Popper' }
  },
  plugins: [terser({ compress: { drop_console: true, module: true } })]
};
