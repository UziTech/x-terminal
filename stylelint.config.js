module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		'declaration-empty-line-before': null,
		indentation: 'tab',
		'selector-type-no-unknown': [
			true, {
				ignoreTypes: [
					'x-terminal',
					'x-terminal-profile',
				],
			},
		],
	},
}
