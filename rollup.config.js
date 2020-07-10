import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import pkg from './package.json';

const input = 'bin/index.ts';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [
  builtins(),
  commonjs(),
  globals(),
  resolve({
    mainFields: ['module', 'main'],
    extensions,
  }),
  babel({ extensions, include: ['bin', 'commands', 'lib'] }),
];

const createConfig = (inpt, outpt, format) => {
  return {
    input: inpt,
    output: {
      file: outpt,
      format,
      sourcemap: true,
    },
    plugins,
    external,
  };
};

export default [
  createConfig(input, pkg.main, 'cjs'),
  createConfig(input, pkg.module, 'esm'),
];
