cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-headercolor.HeaderColor",
      "file": "plugins/cordova-plugin-headercolor/www/HeaderColor.js",
      "pluginId": "cordova-plugin-headercolor",
      "clobbers": [
        "cordova.plugins.headerColor"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-android-window-background": "1.0.1",
    "cordova-plugin-headercolor": "1.0",
    "cordova-plugin-statusbar": "2.4.1"
  };
});