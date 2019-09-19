// файл setup.js
'use strict';

var setupSection = document.querySelector('.setup');
setupSection.classList.remove('hidden');

var WIZARD_NAMES = ['Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WISARD_SURNAMES = ['да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
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

var WIZART_LIST_COUNT = 4;

var getRandomItem = function (featureList) {
  var currentIndex = Math.round(Math.random() * (featureList.length - 1));
  var currentValue = featureList[currentIndex];
  featureList.splice(currentIndex, 1);
  return currentValue;
};

var generateWisardFeatures = function (names, surnames, coatColors, eyesColors) {
  var wisardList = [];
  var generatorWizardNames = names.slice();
  var generatorWizardSurnames = surnames.slice();
  var generatorWizardCoatColors = coatColors.slice();
  var generatorWizardEyesColor = eyesColors.slice();

  for (var i = 0; i < WIZART_LIST_COUNT; i++) {
    var currentWizardFeatures = {};
    currentWizardFeatures.name = getRandomItem(generatorWizardNames) + ' ' + getRandomItem(generatorWizardSurnames);
    currentWizardFeatures.coatColor = getRandomItem(generatorWizardCoatColors);
    currentWizardFeatures.eyesColor = getRandomItem(generatorWizardEyesColor);

    wisardList.push(currentWizardFeatures);
  }

  return wisardList;
};

var wizardList = generateWisardFeatures(WIZARD_NAMES, WISARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);

var setupSimilarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var createNewWizard = function (template, features) {
  var newWizard = template.cloneNode(true);
  newWizard.querySelector('.setup-similar-label').textContent = features.name;
  newWizard.querySelector('.wizard-coat').setAttribute('fill', features.coatColor);
  newWizard.querySelector('.wizard-eyes').setAttribute('fill', features.eyesColor);
  return newWizard;
};

var fillWizardList = function (documentFragment, featureList) {
  for (var j = 0; j < wizardList.length; j++) {
    documentFragment.appendChild(createNewWizard(similarWizardTemplate, featureList[j]));
  }
  return documentFragment;
};

setupSimilarList.appendChild(fillWizardList(fragment, wizardList));
document.querySelector('.setup-similar').classList.remove('hidden');
