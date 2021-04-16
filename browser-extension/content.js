(function () {
	'use strict';

	const types = {
		action: '\u{1F3AC}',
		destination: '\u{1F4CD}',
		purpose: '\u2753',
		meaning: '\u2139\uFE0F'  // for static content (not a standard attr name)
	};

	const meanings = {
		// Action-Destinations
		signin: '\u{1F510}',
		// Purposes
		name: '\u{1F464}',
		tel: '\u{1F4DE}',
		language: '\u{1F5E3}'
	};

	const qualifiers = {
		home: '\u{1F3E1}',
		work: '\u{1F6E0}',
		mobile: 'TODO',  // TODO
		fax: 'TODO',  // TODO
		pager: 'TODO'  // TODO
	};

	function makeGlyph(doc, content) {
		const glyph = doc.createElement('SPAN');
		glyph.className = 'personalization-glyph';
		glyph.appendChild(doc.createTextNode(content));
		return glyph
	}

	function makeGlpyhs(doc, typeName, glyphs) {
		const container = doc.createElement('SPAN');
		container.setAttribute('data-personalization-output', '');

		container.appendChild(makeGlyph(doc, typeName));

		if (Array.isArray(glyphs)) {
			for (const glyph of glyphs) {
				container.appendChild(makeGlyph(doc, glyph));
			}
		} else {
			container.appendChild(makeGlyph(doc, glyphs));
		}

		return container
	}

	function insertBeforeFirstChild(element, thing) {
		if (element.firstChild) {
			element.firstChild.before(thing);
		} else {
			element.appendChild(thing);
		}
	}

	// This approach can be used because in our example we only set one data-*
	// attribute and it's for personalisation.
	function getPersonalisationAttribute(element) {
		for (const attr of element.attributes) {
			if (attr.name.startsWith('data-')) {
				return attr.name
			}
		}
	}

	function changer(doc) {
		const personalise = doc.querySelectorAll(`
		[data-action],
		[data-destination],
		[data-purpose],
		[data-meaning]`);

		for (const element of personalise) {
			const attrName = getPersonalisationAttribute(element);
			const attrValue = element.getAttribute(attrName);

			if (!attrValue) {
				throw Error(`Missing @${attrName} attribute value`)
			}

			const [first, second] = attrValue.split(' ');
			const glyphs = second
				? [qualifiers[first], meanings[second]]
				: [meanings[first]];

			// TODO: Check for >1 values passed to non-input elements?

			switch (element.tagName) {
				case 'P':
				case 'SPAN':
					insertBeforeFirstChild(
						element, makeGlpyhs(doc, types.meaning, glyphs));
					break
				case 'A':
					insertBeforeFirstChild(
						element, makeGlpyhs(doc, types.destination, glyphs));
					break
				case 'BUTTON':
					insertBeforeFirstChild(
						element, makeGlpyhs(doc, types.action, glyphs));
					break
				case 'INPUT':
					element.before(makeGlpyhs(doc, types.purpose, glyphs));
					break
				case 'FIELDSET': {
					const container = makeGlpyhs(doc, types.purpose, glyphs);
					const legend = element.querySelector('legend');
					if (legend) {
						insertBeforeFirstChild(legend, container);
					} else {
						element.before(container);
					}
				}
			}
		}
	}

	changer(document);

}());
