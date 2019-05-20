const Styles = require("./Styles.js");

StylesTool = Styles();

/*
    create a mock editor object, expected by plugin;
    must include Styles de/serializers
*/
const editor = {
  settings: {},
  dom: {
    parseStyle: StylesTool.parse,
    serializeStyle: StylesTool.serialize,
  },
};

/*
    also mock the param function required by editor
*/
editor.getParam = function(key, defaultValue) {
  const value = key in editor.settings ? editor.settings[key] : defaultValue;

  return value;
};

// if we are not in a browser env mock window and navigator globals
if (typeof global.navigator === "undefined") {
  global.navigator = {
    appName: "",
    userAgent: "",
  };
  global.window = {};
}

module.exports = editor;
