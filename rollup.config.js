// Transpile
import babel from '@rollup/plugin-babel';
// Used to minify files
import { terser } from "rollup-plugin-terser";

import pkg from './package.json';

export default [
  {
    // Outputs we want to be transpiled by Babel
    input: 'dist/es/index.js',
    output: [
      { // Common JS
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      { // Browser
        name: 'ExportedTests',
        file: pkg.browser,
        format: 'umd',
        sourcemap: true,
      }
    ],
    plugins: [
      babel({ babelHelpers: 'bundled' }),
      terser()
    ]
  },
];
