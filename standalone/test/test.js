const assert = require('assert');
const { JSDOM } = require('jsdom');

const wordInput = require('./fixtures/wordInput');
const cleanedOutput = require('./fixtures/cleanedOutput');
const complexInput = require('./fixtures/complexInput');
const complexCleanedOutput = require('./fixtures/complexCleanedOutput');
const stylesCleanedOutput = require('./fixtures/stylesCleanedOutput');

const dom = new JSDOM();
const { document, navigator, URL } = dom.window;
global.document = document;
global.navigator = navigator;
global.URL = URL;
global.window = dom.window;

const filterWord = require('../');

describe('fitlers MS Word content', function() {
  it('transforms lists; cleans up styles', function() {
    const result = filterWord(wordInput, {});
    assert.equal(filterWord(wordInput, {}), cleanedOutput);
  });

  it('leaves non-Word content untouched', function() {
    const content = `<p style="font-weight:bold">hello world</p>`;
    const result = filterWord(content, {});
    assert.equal(result, content);
  });

  it('handles a complex case', function() {
    const result = filterWord(complexInput, {});
    assert.equal(result, complexCleanedOutput);
  });

  it('handles custom options', function() {
    const result = filterWord(complexInput, {
      paste_retain_style_properties: 'color',
    });
    assert.equal(result, stylesCleanedOutput);
  });
});
