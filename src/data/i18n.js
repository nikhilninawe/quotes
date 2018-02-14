import I18n from 'react-native-i18n';
import en from './locales/en';
import mr from './locales/mr';
import hi from './locales/hi';
import ru from './locales/ru';

I18n.fallbacks = true;

I18n.translations = {
  en,
  mr,
  hi,
  ru
};

export default I18n;
