// Файл setup.js
'use strict';

var quantityWizards = 4;

var ESC_KEY = 'Escape';

var ENTER_KEY = 'Enter';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var userForm = userDialog.querySelector('.setup-wizard-form');
var inputCoat = userForm.querySelector('input[name="coat-color"]');
var inputEyes = userForm.querySelector('input[name="eyes-color"]');
var inputFireball = userForm.querySelector('input[name="fireball-color"]');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userWizard = userDialog.querySelector('.setup-wizard');
var userWizardCoat = userWizard.querySelector('.wizard-coat');
var userWizardEyes = userWizard.querySelector('.wizard-eyes');
var userWizardFireball = userDialog.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target && !evt.target.matches('input')) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }

});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

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

var createWizards = function () {
  var wizards = [];

  for (var i = 0; i < quantityWizards; i++) {
    wizards[i] = {
      name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
      coatColor: generateColor(COAT_COLORS),
      eyesColor: generateColor(EYES_COLORS)
    };
  }
  return wizards;
};

var wizards = createWizards();

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

var onChangeColor = function (element, prop, colorArr) {
  element.style = prop + ': ' + generateColor(colorArr);
};

var onClickElement = function (element, prop, colorArr) {
  element.addEventListener('click', function () {
    onChangeColor(element, prop, colorArr);
  });
};

onClickElement(userWizardCoat, 'fill', COAT_COLORS);
onClickElement(userWizardEyes, 'fill', EYES_COLORS);
onClickElement(userWizardFireball, 'background', FIREBALL_COLORS);

var filterChangeHandler = function (evt) {
  if (evt.target && evt.target.matches('.wizard-coat')) {
    inputCoat.value = evt.target.style.fill;
  } else if (evt.target && evt.target.matches('.wizard-eyes')) {
    inputEyes.value = evt.target.style.fill;
  } else if (evt.target && evt.target.matches('.setup-fireball-wrap')) {
    inputFireball.value = evt.target.style.background;
  }
};
userForm.addEventListener('click', filterChangeHandler);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
