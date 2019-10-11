'use strict';

// file dialog.js

(function () {
  var setupPopup = document.querySelector('.setup');
  var buttonSetupOpen = document.querySelector('.setup-open');
  var buttonSetupClose = setupPopup.querySelector('.setup-close');
  var userNameInput = setupPopup.querySelector('.setup-user-name');

  var dialogDefaulCoordinates;

  var closePopup = function () {
    setupPopup.style.left = dialogDefaulCoordinates.x + 'px';
    setupPopup.style.top = dialogDefaulCoordinates.y + 'px';
    setupPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === window.utils.Keycode.ESC) && (evt.target !== userNameInput)) {
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

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  }; /* */

  var playerCoatColor = document.querySelector('.setup-wizard .wizard-coat');
  var currentCoatColor = playerCoatColor.style.fill;
  playerCoatColor.addEventListener('click', function () {
    currentCoatColor = window.utils.getRandomItem(window.utils.WIZARD_COAT_COLORS, false);
    playerCoatColor.style.fill = currentCoatColor;
    document.querySelector('input[name="coat-color"]').value = currentCoatColor;
    window.wizard.onCoatChange(currentCoatColor);
  });

  var playerEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
  var currentEyesColor = playerEyesColor.style.fill || 'black';
  playerEyesColor.addEventListener('click', function () {
    currentEyesColor = window.utils.getRandomItem(window.utils.WIZARD_EYES_COLORS, false);
    playerEyesColor.style.fill = currentEyesColor;
    document.querySelector('input[name="eyes-color"]').value = currentEyesColor;
    wizard.onEyesChange(currentEyesColor);
  });

  var playerFireballColor = document.querySelector('.setup-fireball-wrap');
  var currentFireballColor = playerFireballColor.style.backgroundColor || '#ee4830';
  playerFireballColor.addEventListener('click', function () {
    currentFireballColor = window.utils.getRandomItem(window.utils.WIZARD_FIREBALL_COLORS, false);
    playerFireballColor.style.backgroundColor = currentFireballColor;
    document.querySelector('input[name="fireball-color"]').value = currentFireballColor;
  });

  buttonSetupOpen.addEventListener('click', openPopup);

  var buttonSetupOpenIcon = document.querySelector('.setup-open-icon');
  buttonSetupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.Keycode.ENTER) {
      openPopup();
    }
  });

  buttonSetupClose.addEventListener('click', closePopup);
  buttonSetupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.Keycode.ENTER) {
      closePopup();
    }
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

  window.wizard = wizard;
})();
