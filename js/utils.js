'use strict';

// file utils.js

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  var WIZART_LIST_COUNT = 4;

  var WIZARD_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var WIZARD_EYES_COLORS = ['black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var getRandomItem = function (featureList, cuteCurrent) {
    var currentIndex = Math.round(Math.random() * (featureList.length - 1));
    var currentValue = featureList[currentIndex];
    if (cuteCurrent) {
      featureList.splice(currentIndex, 1);
    }
    return currentValue;
  };

  window.utils = {
    getRandomItem: getRandomItem,
    Keycode: Keycode,
    WIZART_LIST_COUNT: WIZART_LIST_COUNT,
    WIZARD_FIREBALL_COLORS: WIZARD_FIREBALL_COLORS,
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS
  };

})();
