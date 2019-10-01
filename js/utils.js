'use strict';

// file utils.js

(function () {
  var getRandomItem = function (featureList, cuteCurrent) {
    var currentIndex = Math.round(Math.random() * (featureList.length - 1));
    var currentValue = featureList[currentIndex];
    if (cuteCurrent) {
      featureList.splice(currentIndex, 1);
    }
    return currentValue;
  };

  window.utils = {
    getRandomItem: getRandomItem
  };

})();
