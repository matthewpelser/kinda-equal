import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const dist = 'dist';
export default [
	{
		entry: 'src/kinda-equal.js',
		dest: `${dist}/kinda-equal.umd.js`,
		format: 'umd',
		moduleName: 'kindaEqual',
		plugins: [
			babel({
				exclude: 'node_modules/**'
			 }),
			 resolve(),
			 commonjs()
		]
	},
	{
		entry: 'src/kinda-equal.js',
		external: [],
		targets: [
			{ dest: `${dist}/index.js`, format: 'cjs' },
			{ dest: `${dist}/kinda-equal.es.js`, format: 'es' }
		]
	}
];