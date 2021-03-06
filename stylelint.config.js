module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		'declaration-empty-line-before': null,
		'no-invalid-position-at-import-rule': null,
		'selector-pseudo-element-colon-notation': 'double',
		'no-extra-semicolons': true,
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
