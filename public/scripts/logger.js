// /user/toolTipExample/src/scripts/logger.js
define([], function () {
  var Logger = {
    get: function (name) {
      return {
        log: function (message) {
          console.log(name + ": " + message);
        },
        error: function (message) {
          console.error(name + ": " + message);
        },
        warn: function (message) {
          console.warn(name + ": " + message);
        },
      };
    },
  };

  return Logger;
});
