import I18n from 'react-native-i18n';
import en from './locales/en';
import mr from './locales/mr';
import hi from './locales/hi';

I18n.fallbacks = true;

I18n.translations = {
  en,
  mr,
  hi
};

export default I18n;
