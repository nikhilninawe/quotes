import QuoteApi from '../components/common/QuoteApi';
import TalaikisApi from '../components/common/TalaikisApi';
import { 
  FETCH_QUOTE, 
  FETCH_START, 
  FETCH_SINGLE_QUOTE,
  SWITCH_STATE,
  CURRENT_QUOTE,
  LANGUAGE_CHANGE } from './types';
import staticQuotes from '../data/english.json';
import hindiQuotes from '../data/hindi';
import russianQuotes from '../data/russian';

const api = new QuoteApi();
const tApi = new TalaikisApi();

function timeoutPromise(timeout, err, promise) {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(reject.bind(null, err), timeout);
  });
}

const prodQuote = (dispatch, language) => {
  timeoutPromise(300, new Error('Timed Out!'), api.getQuote(language))
     .then(response => {
          dispatch({
            type: FETCH_SINGLE_QUOTE,
            payload: {
              quote: response.quoteText,
              author: response.quoteAuthor
            }
          });
     })
     .catch(error => {
       console.log(error);
       const randomQuote = Math.floor((Math.random() * staticQuotes.quotes.length) - 1);
       const quote = staticQuotes.quotes[randomQuote];
       dispatch({
         type: FETCH_SINGLE_QUOTE,
         payload: {
                    quote: quote.quote,
                    author: quote.author
                  }
       });
     });
};

const talaikisQuotes = (dispatch) => {
  const randomQuote = Math.floor((Math.random() * 90) - 1);  
  timeoutPromise(3000, new Error('Timed Out!'), tApi.getQuote())
      .then(response => {
        const quotes = response.splice(randomQuote, 10);
        dispatch({
          type: FETCH_QUOTE,
          payload: quotes
        });
      })
      .catch(error => {
        console.log(error);
        const quote = staticQuotes.quotes.splice(randomQuote, 10);
        dispatch({
          type: FETCH_QUOTE,
          payload: quote
        });
      });
};


export const getQuotes = (language = 'en') => {
  switch (language) {
    case 'en':
      return (dispatch) => {
        dispatch({ type: FETCH_START });
        talaikisQuotes(dispatch);
      };
    case 'hi':
      return {
        type: FETCH_QUOTE,
        payload: hindiQuotes.quotes,
      };
    case 'ru':
      return {
        type: FETCH_QUOTE,
        payload: russianQuotes.quotes,
      };
    default:
      break;
  }
};

export const getSingleQuote = (language = 'en') => {
  switch (language) {
    case 'en':
    case 'ru':
      return (dispatch) => {
        prodQuote(dispatch, language);
      };
    case 'hi': {
      const randomQuote = Math.floor((Math.random() * hindiQuotes.quotes.length));
      console.log(randomQuote);
      return {
        type: FETCH_SINGLE_QUOTE,
        payload: {
          quote: hindiQuotes.quotes[randomQuote].quote,
          author: hindiQuotes.quotes[randomQuote].author
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

