'use strict'
const fs = require('fs')
const path = require('path')

const glob = require('glob')

const pkg = require('./package.json')

const outDir = 'browser-extension'
const manifest = require('./static/manifest.json')

console.log('Setting verison in manifest.json')
manifest.version = pkg.version
fs.writeFileSync(
	path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))

console.log('Copying outdated static non-SVG files')
for (const sourceFile of glob.sync('static/*.*', { ignore: 'static/*.svg' })) {
	const destFile = path.join(outDir, path.basename(sourceFile))
	const destFileExists = fs.existsSync(destFile)
	const destFileModified = destFileExists
		? fs.statSync(destFile).mtime
		: null

	const sourceModified = fs.statSync(sourceFile).mtime

	if (!destFileExists || sourceModified > destFileModified) {
		fs.copyFileSync(sourceFile, destFile)
		console.log(sourceFile)
	}
}
