// Файл setup.js
'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var generateName = function (firstNames, surNames) {
  var firstName = firstNames[getRandomInt(0, firstNames.length)];
  var surName = surNames[getRandomInt(0, surNames.length)];
  return firstName + ' ' + surName;
};

var generateColor = function (arr) {
  return arr[getRandomInt(0, arr.length)];
};

var wizards = [
  {
    name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: generateColor(COAT_COLORS),
    eyesColor: generateColor(EYES_COLORS)
  },
  {
    name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: generateColor(COAT_COLORS),
    eyesColor: generateColor(EYES_COLORS)
  },
  {
    name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: generateColor(COAT_COLORS),
    eyesColor: generateColor(EYES_COLORS)
  },
  {
    name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: generateColor(COAT_COLORS),
    eyesColor: generateColor(EYES_COLORS)
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
