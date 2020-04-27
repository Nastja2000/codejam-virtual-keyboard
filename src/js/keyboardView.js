import generateDomElement from './helpers';
import buttonsLayout from './buttonsLayout';
import getLocalLanguage from './getLocalLanguage';

function createKeyboardView() {
  const wrapper = generateDomElement('div', ['wrapper']);
  document.body.append(wrapper);

  const textarea = generateDomElement('textarea', ['textarea']);
  textarea.setAttribute('autofocus', 'autofocus');
  textarea.setAttribute('cols', 100);
  textarea.setAttribute('rows', 15);


  const keyboardContainer = generateDomElement('div', ['keyboard-container']);


  buttonsLayout.forEach((row) => {
    row.forEach((element) => {
      const button = generateDomElement('button');
      const [code, ruLittle, ruBig, enLittle, enBig] = element;

      button.classList.add('keyboard__button', code);
      switch (element[0]) {
        case 'Space':
          button.classList.add('keyboard__button_the-widest');
          break;
        case 'Backspace':
        case 'CapsLock':
        case 'ShiftLeft':
        case 'Enter':
          button.classList.add('keyboard__button_wider');
          break;
        case 'ShiftRight':
          button.classList.add('keyboard__key-base-width');
          break;

        default:
        {
          break;
        }
      }

      keyboardContainer.append(button);

      const ruLang = generateDomElement('span', ['ru']);
      const enLang = generateDomElement('span', ['en']);

      const language = getLocalLanguage();
      if (language === 'en') enLang.classList.add('current');
      else ruLang.classList.add('current');

      button.append(ruLang, enLang);

      const ruLowerCase = generateDomElement('span', ['small', 'on']);
      ruLowerCase.textContent = ruLittle;

      const ruUpperCase = generateDomElement('span', ['big']);
      ruUpperCase.textContent = ruBig;
      ruLang.append(ruLowerCase, ruUpperCase);

      const enLowerCase = generateDomElement('span', ['small', 'on']);
      enLowerCase.textContent = enLittle;

      const enUpperCase = generateDomElement('span', ['big']);
      enUpperCase.textContent = enBig;
      enLang.append(enLowerCase, enUpperCase);
    });
    keyboardContainer.append(document.createElement('br'));
  });

  const changeLanguageMessage = generateDomElement('span', ['about-language']);
  changeLanguageMessage.innerText = 'For changing language use \'ShiftLeft\' +  \'AltLeft\' button combination :)';

  wrapper.append(textarea, keyboardContainer, changeLanguageMessage);
}

export default createKeyboardView;
