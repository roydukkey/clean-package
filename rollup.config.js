import json from '@rollup/plugin-json';
import license from 'rollup-plugin-license';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-ts';
import { author, config, main, name, repository, version } from './package.json';

const commonPlugins = (subPackage = '') => [
	license({
		banner: {
			commentStyle: 'none',
			content: `/*! ${
				[
					`${name}${subPackage.length ? `/${subPackage}` : ''} v${version}`,
					`(c) ${author.name}`,
					repository.url.replace('.git', `/blob/v${version}/LICENSE`)
				].join(' | ')
			} */`
		}
	})
];


export default [
	{
		input: config.main,
		external: [
			'dot-object'
		],
		output: {
			file: main,
			format: 'cjs'
		},
		plugins: [
			nodeResolve(),
			json(),
			typescript({
				transpiler: 'babel'
			}),
			...commonPlugins()
		]
	},
	{
		input: config.cli[0],
		external: [
			'./main'
		],
		output: {
			file: config.cli[1],
			format: 'cjs'
		},
		plugins: [
			nodeResolve(),
			json(),
			typescript({
				transpiler: 'babel',
				tsconfig: (config) => ({
					...config,
					declaration: false
				})
			}),
			replace({
				preventAssignment: false,
				delimiters: ['\'', '\''],
				values: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'./index': '"./main"'
				}
			}),
			...commonPlugins('cli')
		]
	}
];
