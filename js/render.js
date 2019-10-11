'use strict';

(function () {
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createNewWizard = function (features) {
    var newWizard = similarWizardTemplate.cloneNode(true);
    newWizard.querySelector('.setup-similar-label').textContent = features.name;
    newWizard.querySelector('.wizard-coat').setAttribute('fill', features.colorCoat);
    newWizard.querySelector('.wizard-eyes').setAttribute('fill', features.colorEyes);
    return newWizard;
  };

  window.render = function (wizardList) {
    var fragment = document.createDocumentFragment();
    var copyWizardList = wizardList.slice();
    for (var i = 0; i < window.utils.WIZART_LIST_COUNT; i++) {
      fragment.appendChild(createNewWizard(copyWizardList[i]));
    }
    setupSimilarList.innerHTML = '';
    setupSimilarList.appendChild(fragment);
  };

  document.querySelector('.setup-similar').classList.remove('hidden');
})();
