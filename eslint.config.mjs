import js from '@eslint/js'
import next from '@next/eslint-plugin-next'
import stylistic from '@stylistic/eslint-plugin'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { resolve as tsResolver } from 'eslint-import-resolver-typescript'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tailwindcss from 'eslint-plugin-tailwindcss'
import globals from 'globals'

const JS_MAX_PARAMS_ALLOWED = 3

/** @typedef {import("eslint").Linter.Config} */
let Config
/** @typedef {import("eslint").Linter.ParserModule} */
let ParserModule

/** @type {Config} */
const filesConfig = {
	files: ['**/*.{js,ts,tsx}'],
}

/** @type {Config} */
const ignoresConfig = {
	ignores: ['node_modules', '.next', 'next-env.d.ts'],
}

/** @type {Config} */
const importConfig = {
	plugins: {
		import: importPlugin,
	},
	rules: {
		...importPlugin.configs.recommended.rules,
		'import/exports-last': ['error'],
		'import/extensions': ['off'],
		'import/newline-after-import': ['error'],
		'import/no-default-export': ['error'],
		'import/no-duplicates': ['error'],
	},
	settings: {
		'import/parsers': {
			espree: ['.js', '.cjs'],
		},
		'import/resolver': {
			typescript: tsResolver,
		},
	},
}

/** @type {Config} */
const jsConfig = {
	languageOptions: {
		globals: {
			...globals.node,
			...globals.browser,
			JSX: true,
			React: true,
		},
	},
	rules: {
		...js.configs.recommended.rules,
		'arrow-parens': ['error', 'always'],
		curly: ['error', 'all'],
		eqeqeq: ['error', 'always'],
		'max-params': ['error', JS_MAX_PARAMS_ALLOWED],
		'no-console': ['off'],
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
			},
		],
		'object-shorthand': ['error'],
		'prefer-destructuring': ['error'],
		quotes: ['error', 'single'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}

/** @type {Config} */
const jsxA11yConfig = {
	files: ['**/*.tsx'],
	plugins: {
		'jsx-a11y': jsxA11y,
	},
	rules: {
		...jsxA11y.configs.recommended.rules,
		'jsx-a11y/media-has-caption': ['off'],
	},
}

/** @type {Config} */
const nextConfig = {
	files: ['**/*.tsx'],
	plugins: {
		'@next/next': next,
	},
	rules: {
		...next.configs.recommended.rules,
		...next.configs['core-web-vitals'].rules,
	},
}

/** @type {Config} */
const perfectionistConfig = {
	plugins: {
		perfectionist,
	},
	rules: perfectionist.configs['recommended-natural'].rules,
}

/** @type {Config} */
const reactConfig = {
	files: ['**/*.tsx'],
	plugins: {
		react,
	},
	rules: {
		...react.configs['jsx-runtime'].rules,
		...react.configs['recommended'].rules,
		'react/jsx-boolean-value': ['error'],
		'react/jsx-curly-brace-presence': ['error'],
		'react/jsx-no-bind': ['error', { ignoreRefs: true }],
		'react/prop-types': ['off'],
		'react/self-closing-comp': ['error'],
	},
}

/** @type {Config} */
const reactHooksConfig = {
	files: ['**/*.tsx'],
	plugins: {
		'react-hooks': reactHooks,
	},
	rules: reactHooks.configs.recommended.rules,
}

/** @type {Config} */
const stylisticConfig = {
	plugins: {
		'@stylistic': stylistic,
	},
	rules: {
		'@stylistic/padding-line-between-statements': [
			'error',
			{
				blankLine: 'never',
				next: 'export',
				prev: 'export',
			},
			{
				blankLine: 'always',
				next: '*',
				prev: ['block-like', 'throw'],
			},
			{
				blankLine: 'always',
				next: ['return', 'block-like', 'throw'],
				prev: '*',
			},
		],
	},
}

/** @type {Config} */
const tailwindcssConfig = {
	plugins: {
		tailwindcss,
	},
	rules: {
		...tailwindcss.configs.recommended.rules,
	},
}

/** @type {Config} */
const typescriptConfig = {
	languageOptions: {
		parser: /** @type {ParserModule} */ (tsParser),
		parserOptions: {
			project: './tsconfig.json',
		},
	},
	plugins: {
		'@typescript-eslint': ts,
	},
	rules: {
		...ts.configs['strict-type-checked'].rules,
		'@typescript-eslint/consistent-type-exports': ['error'],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{
				allowTypedFunctionExpressions: true,
			},
		],
		'@typescript-eslint/explicit-member-accessibility': ['error'],
		'@typescript-eslint/no-magic-numbers': ['off'],
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: {
					arguments: false,
					attributes: false,
				},
			},
		],
		'@typescript-eslint/restrict-template-expressions': [
			'error',
			{
				allowBoolean: true,
				allowNumber: true,
			},
		],
		'@typescript-eslint/return-await': ['error', 'always'],
	},
}

/** @type {Config[]} */
const overridesConfigs = [
	{
		files: ['next.config.js'],
		rules: {
			'unicorn/prefer-module': ['off'],
		},
	},
	{
		files: ['eslint.config.mjs'],
		rules: {
			'@typescript-eslint/no-unsafe-assignment': ['off'],
			'@typescript-eslint/no-unsafe-member-access': ['off'],
			'@typescript-eslint/no-unused-vars': ['off'],
			'import/no-default-export': ['off']
		},
	},
	{
		files: ['*.js'],
		rules: {
			'@typescript-eslint/explicit-function-return-type': ['off'],
		},
	},
]

/** @type {Config[]} */
const config = [
	filesConfig,
	ignoresConfig,
	importConfig,
	jsConfig,
	jsxA11yConfig,
	nextConfig,
	perfectionistConfig,
	reactConfig,
	reactHooksConfig,
	stylisticConfig,
	tailwindcssConfig,
	typescriptConfig,
	...overridesConfigs,
]

export default config
