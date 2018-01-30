import QuoteApi from '../components/common/QuoteApi';
import TalaikisApi from '../components/common/TalaikisApi';
import { 
  FETCH_QUOTE, 
  FETCH_START, 
  FETCH_SINGLE_QUOTE,
  SWITCH_STATE,
  CURRENT_QUOTE,
  LANGUAGE_CHANGE,
  CURRENT_INDEX } from './types';
import staticQuotes from '../data/english.json';
import hindiQuotes from '../data/hindi';
import russianQuotes from '../data/russian';
import marathiQuotes from '../data/marathi';

const api = new QuoteApi();
const tApi = new TalaikisApi();
const imagesSize = 4;
const languageMap = {
  en: staticQuotes,
  ru: russianQuotes,
  hi: hindiQuotes,
  mr: marathiQuotes
};

function timeoutPromise(timeout, err, promise) {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(reject.bind(null, err), timeout);
  });
}

const getModifiedQuotes = quotes => {
  quotes.forEach(quote => {
    quote.imageIndex = Math.floor((Math.random() * imagesSize));
  });
};

const prodQuote = (dispatch, language) => {
  const imageIndex = Math.floor(Math.random() * imagesSize);
  timeoutPromise(300, new Error('Timed Out!'), api.getQuote(language))
     .then(response => {
          dispatch({
            type: FETCH_SINGLE_QUOTE,
            payload: {
              quote: response.quoteText,
              author: response.quoteAuthor,
              imageIndex
            }
          });
     })
     .catch(error => {
       console.log(error);
       const randomQuote = Math.floor((Math.random() * languageMap[language].quotes.length) - 1);
       const quote = languageMap[language].quotes[randomQuote];
       dispatch({
         type: FETCH_SINGLE_QUOTE,
         payload: {
                    quote: quote.quote,
                    author: quote.author,
                    type: quote.type,
                    quoteUrl: quote.quoteUrl,
                    imageIndex
                  }
       });
     });
};

const talaikisQuotes = (dispatch) => {
  const randomQuote = Math.floor((Math.random() * 90) - 1);  
  timeoutPromise(3000, new Error('Timed Out!'), tApi.getQuote())
      .then(response => {
        const quotes = response.splice(randomQuote, 10);
        getModifiedQuotes(quotes);
        dispatch({
          type: FETCH_QUOTE,
          payload: quotes
        });
      })
      .catch(error => {
        console.log(error);
        const quote = staticQuotes.quotes.splice(randomQuote, 10);
        getModifiedQuotes(quote);
        dispatch({
          type: FETCH_QUOTE,
          payload: quote
        });
      });
};


export const getQuotes = (language = 'en') => {
  const randomNumber = Math.floor((Math.random() * languageMap[language].quotes.length) - 5);
  switch (language) {
    case 'en':
      return (dispatch) => {
        dispatch({ type: FETCH_START });
        talaikisQuotes(dispatch);
      };
    case 'hi':
    case 'ru':
    case 'mr': {
      const quotes = languageMap[language].quotes.splice(randomNumber, 10);
      getModifiedQuotes(quotes);
      return {
        type: FETCH_QUOTE,
        payload: quotes,
      };
    }
    default:
      break;
  }
};

export const getSingleQuote = (language = 'en') => {
  const imageIndex = Math.floor(Math.random() * imagesSize);
  switch (language) {
    case 'en':
    case 'ru':
      return (dispatch) => {
        prodQuote(dispatch, language);
      };
    case 'hi':
    case 'mr': {
      const randomQuote = Math.floor((Math.random() * languageMap[language].quotes.length));
      return {
        type: FETCH_SINGLE_QUOTE,
        payload: {
          quote: languageMap[language].quotes[randomQuote].quote,
          author: languageMap[language].quotes[randomQuote].author,
          type: languageMap[language].quotes[randomQuote].type,
          quoteUrl: languageMap[language].quotes[randomQuote].quoteUrl,
          imageIndex
        }
      };
    }
    default:
      break;
  }
};

export const switchState = () => {
  return {
    type: SWITCH_STATE
  };
};

export const updateCurrentQuote = (quote) => {
  return {
    type: CURRENT_QUOTE,
    payload: quote
  };
};

export const languageChange = (language) => {
  return {
    type: LANGUAGE_CHANGE,
    payload: language
  };
};

export const updateCurrentIndex = (index) => {
  return {
    type: CURRENT_INDEX,
    payload: index
  };
};
