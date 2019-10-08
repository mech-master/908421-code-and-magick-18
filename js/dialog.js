'use strict';

// file dialog.js

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupPopup = document.querySelector('.setup');
  var buttonSetupOpen = document.querySelector('.setup-open');
  var buttonSetupClose = setupPopup.querySelector('.setup-close');
  var userNameInput = setupPopup.querySelector('.setup-user-name');

  var WIZARD_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var dialogDefaulCoordinates;

  var closePopup = function () {
    setupPopup.style.left = dialogDefaulCoordinates.x + 'px';
    setupPopup.style.top = dialogDefaulCoordinates.y + 'px';
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
    if (!dialogDefaulCoordinates) {
      dialogDefaulCoordinates = {
        x: setupPopup.offsetLeft,
        y: setupPopup.offsetTop
      };
    }

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

  var playerCoatColor = document.querySelector('.setup-wizard .wizard-coat');
  playerCoatColor.addEventListener('click', function () {
    var currentCoatColor = window.utils.getRandomItem(window.setup.WIZARD_COAT_COLORS, false);
    playerCoatColor.style.fill = currentCoatColor;
    document.querySelector('input[name="coat-color"]').value = currentCoatColor;
  });

  var playerEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
  playerEyesColor.addEventListener('click', function () {
    var currentEyesColor = window.utils.getRandomItem(window.setup.WIZARD_EYES_COLORS, false);
    playerEyesColor.style.fill = currentEyesColor;
    document.querySelector('input[name="eyes-color"]').value = currentEyesColor;
  });

  var playerFireballColor = document.querySelector('.setup-fireball-wrap');
  playerFireballColor.addEventListener('click', function () {
    var currentFireballColor = window.utils.getRandomItem(WIZARD_FIREBALL_COLORS, false);
    playerFireballColor.style.backgroundColor = currentFireballColor;
    document.querySelector('input[name="fireball-color"]').value = currentFireballColor;
  });

  var dialogHandle = setupPopup.querySelector('.upload');
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startMouseCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var flagDragged = false;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();
      flagDragged = true;

      var shiftMouseCoordinates = {
        x: startMouseCoordinates.x - evtMove.clientX,
        y: startMouseCoordinates.y - evtMove.clientY
      };

      startMouseCoordinates = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      setupPopup.style.left = (setupPopup.offsetLeft - shiftMouseCoordinates.x) + 'px';
      setupPopup.style.top = (setupPopup.offsetTop - shiftMouseCoordinates.y) + 'px';
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (flagDragged) {
        var onClickPreventDefault = function (evtClick) {
          evtClick.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var setupWizardForm = document.querySelector('.setup-wizard-form');

  var onError = function (message) {
    throw new Error(message);
  };

  setupWizardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupWizardForm), closePopup, onError);
  });

})();
