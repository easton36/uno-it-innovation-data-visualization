module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	plugins: ['solid'],
	extends: [
		'standard',
		'plugin:solid/recommended'
	],
	overrides: [
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	ignorePatterns: [
		'node_modules/',
		'build/',
		'package.json',
		'package-lock.json',
		'*.png',
		'*.jpg',
		'*.jpeg',
		'*.gif',
		'*.svg',
		'*.webp',
		'*.json',
		'*.css',
		'*.yaml',
		'*.html'
	],
	rules: {
		indent: [
			'error',
			'tab'
		],
		'linebreak-style': 0,
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'always'
		],
		'keyword-spacing': [2, {
			before: false,
			after: false,
			overrides: {
				catch: { before: true, after: false },
				const: { before: false, after: true },
				return: { before: true, after: true },
				from: { before: true, after: true },
				import: { before: false, after: true },
				else: { before: true, after: false },
				case: { before: false, after: true },
				of: { before: true, after: true },
				default: { before: true, after: true }
			}
		}],
		'newline-before-return': 2,
		'eol-last': [2, 'never'],
		'no-tabs': 0,
		'no-return-assign': 0,
		'solid/prefer-for': 0,
		'css(unknownAtRules)': 0,
		camelcase: 0,
		'space-before-blocks': 0
	}
};