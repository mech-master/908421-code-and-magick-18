// файл setup.js
'use strict';

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

var getRandomItem = function (featureList, cuteCurrent) {
  var currentIndex = Math.round(Math.random() * (featureList.length - 1));
  var currentValue = featureList[currentIndex];
  if (cuteCurrent) {
    featureList.splice(currentIndex, 1);
  }
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
    currentWizardFeatures.name = getRandomItem(generatorWizardNames, true) + ' ' + getRandomItem(generatorWizardSurnames);
    currentWizardFeatures.coatColor = getRandomItem(generatorWizardCoatColors, true);
    currentWizardFeatures.eyesColor = getRandomItem(generatorWizardEyesColor, true);

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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupPopup = document.querySelector('.setup');
var buttonSetupOpen = document.querySelector('.setup-open');
var buttonSetupClose = setupPopup.querySelector('.setup-close');
var userNameInput = setupPopup.querySelector('.setup-user-name');

var closePopup = function () {
  setupPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if ((evt.keyCode === ESC_KEYCODE) && (evt.target !== userNameInput)) {
    closePopup();
  }
};

var openPopup = function () {
  setupPopup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

buttonSetupOpen.addEventListener('click', openPopup);

var buttonSetupOpenIcon = document.querySelector('.setup-open-icon');
buttonSetupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

buttonSetupClose.addEventListener('click', closePopup);
buttonSetupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var playerCoatColor = document.querySelector('.setup-wizard .wizard-coat');
playerCoatColor.addEventListener('click', function () {
  var currentCoatColor = getRandomItem(WIZARD_COAT_COLORS, false);
  playerCoatColor.style.fill = currentCoatColor;
  document.querySelector('input[name="coat-color"]').value = currentCoatColor;
});

var playerEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
playerEyesColor.addEventListener('click', function () {
  var currentEyesColor = getRandomItem(WIZARD_EYES_COLORS, false);
  playerEyesColor.style.fill = currentEyesColor;
  document.querySelector('input[name="eyes-color"]').value = currentEyesColor;
});

var playerFireballColor = document.querySelector('.setup-fireball-wrap');
playerFireballColor.addEventListener('click', function () {
  var currentFireballColor = getRandomItem(WIZARD_FIREBALL_COLORS, false);
  playerFireballColor.style.backgroundColor = currentFireballColor;
  document.querySelector('input[name="fireball-color"]').value = currentFireballColor;
});
