/* global JPath */

(function() {
  "use strict";

  JPath.prototype.shallow = function(identifier, value) {
    var current, j, i = -1, memory = [];

    if (!(value instanceof Array) && value[identifier]) {
      memory.push(value[identifier]);
    } else {

      while (++i < value.length) {

        current = value[i];
        if (current instanceof Array) {

          if (current[identifier]) {
            memory.push(current[identifier]);
          } else {
            j = -1;
            while (++j < current.length) {
              if (current[j][identifier]) {
                memory.push(current[j][identifier]);
              }
            }
          }

        } else if (current[identifier]) {
          memory.push(current[identifier]);
        } else if (+identifier === i) {
          memory.push(current);
        }
      }

    }

    return memory;
  };

  JPath.prototype.deep = function(identifier, value) {
    var memory = [];

    function loop(json) {
      var i = -1;

      if (json instanceof Array) {
        while (++i < json.length) {
          loop(json[i]);
        }
      } else {
        if (json[identifier]) {
          memory.push(json[identifier]);
        }
        if (json && typeof json === 'object') {
          for (var prop in json) {
            if (json.hasOwnProperty(prop)) {
              loop(json[prop]);
            }
          }
        }
      }
    }

    loop(value);
    return memory;
  };

})();
