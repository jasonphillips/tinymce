const editor = require("./mocks.js");
const WordFilter = require("./WordFilter.js");

module.exports = function CleanWordHTML(content, settings) {
  editor.settings = settings;
  if (!WordFilter.isWordContent(content)) {
    return content;
  }

  return WordFilter.preProcess(editor, content);
};
