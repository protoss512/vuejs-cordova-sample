cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "cordova-plugin-tts.tts",
      "file": "plugins/cordova-plugin-tts/www/tts.js",
      "pluginId": "cordova-plugin-tts",
      "clobbers": [
        "TTS"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-statusbar": "3.0.0",
    "cordova-plugin-tts": "0.2.3"
  };
});