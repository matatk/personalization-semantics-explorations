const fs = require('fs')
const path = require('path')

const glob = require('glob')
import test from 'ava'
import jsdom from 'jsdom'

import changer from '../src/changer'

const template = 'test/template.html'
const fixtures = glob.sync('test/*.fixture.html')
const expectations = glob.sync('test/*.expectation.html')

const { JSDOM } = jsdom

function domFor(file) {
	const dom = new JSDOM(fs.readFileSync(template, 'utf-8'))
	const html = fs.readFileSync(file, 'utf-8')
	dom.window.document.getElementById('test-fixture').innerHTML = html
	return dom
}

for (let i = 0; i < fixtures.length; i++) {
	const basename = path.basename(fixtures[i], '.fixture.html')

	test(`Fixture: ${basename}`, t => {
		const domFixture = domFor(fixtures[i])
		changer(domFixture.window.document)
		const domExpectation = domFor(expectations[i])
		t.is(domFixture.serialize(), domExpectation.serialize())
	})
}
