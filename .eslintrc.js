module.exports = {
	env: {
		browser: true,
		es2020: true,
	},
	extends: ['prettier/react', 'airbnb', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
		'import/extensions': 'off',
		// 'react/jsx-filename-extension': 'off',
		// 'react/jsx-curly-newline': 'off',
		// 'react/state-in-constructor': 'off',
		// 'react/static-property-placement': 'off',
		// 'react/jsx-props-no-spreading': 'off',
		// 'react/jsx-indent': 'off',
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.jsx', '.js'],
			},
		],
		'import/prefer-default-export': 'off',
		'react/state-in-constructor': 'off',
		'react/static-property-placement': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/prop-types': 'off',
		'react/jsx-indent': 'off',
		'react/jsx-indent-props': 'off',
		'no-param-reassign': 'off',
		'no-console': 'off',
		'no-use-before-define': 'off',
	},
};
