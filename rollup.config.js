export default [
	{
		input: 'src/_content.js',
		output: {
			file: 'browser-extension/content.js',
			format: 'iife'
		}
	},
	{
		input: 'src/_demo.js',
		output: {
			file: 'browser-extension/demo.js',
			format: 'iife'
		}
	}
]
