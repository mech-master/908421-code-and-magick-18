// файл setup.js
'use strict';

(function () {
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

  var WIZART_LIST_COUNT = 4;

  window.setup = {
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS
  };

  var getRandomItem = function (wizardList, cuteCurrent) {
    var currentIndex = Math.round(Math.random() * (wizardList.length - 1));
    if (cuteCurrent) {
      var currentValue = wizardList.splice(currentIndex, 1)[0];
    } else {
      var currentValue = wizardList[currentIndex];
    }
    return currentValue;
  };

  var setupSimilarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createNewWizard = function (template, features) {
    var newWizard = template.cloneNode(true);
    newWizard.querySelector('.setup-similar-label').textContent = features.name;
    newWizard.querySelector('.wizard-coat').setAttribute('fill', features.colorCoat);
    newWizard.querySelector('.wizard-eyes').setAttribute('fill', features.colorEyes);
    return newWizard;
  };

  var fillWizardList = function (wizardList) {
    var fragment = document.createDocumentFragment();
    var copyWizardList = wizardList.slice();
    for (var i = 1; i <= WIZART_LIST_COUNT; i++) {
      var currentWizardFeatures = getRandomItem(copyWizardList, true)
      fragment.appendChild(createNewWizard(similarWizardTemplate, currentWizardFeatures));
    }

    setupSimilarList.appendChild(fragment);
  };

  var onError = function (message) {
    throw new Error(message);
  };

  backend.load(fillWizardList, onError);
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
