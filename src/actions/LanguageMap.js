import hindiQuotes from '../data/hindi';
import russianQuotes from '../data/russian';
import marathiQuotes from '../data/marathi';
import staticQuotes from '../data/english.json';

const languageMap = {
  en: staticQuotes,
  ru: russianQuotes,
  hi: hindiQuotes,
  mr: marathiQuotes
};

export default languageMap;
