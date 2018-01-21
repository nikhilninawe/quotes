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
const imagesSize = 4;

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
       const randomQuote = Math.floor((Math.random() * staticQuotes.quotes.length) - 1);
       const quote = staticQuotes.quotes[randomQuote];
       dispatch({
         type: FETCH_SINGLE_QUOTE,
         payload: {
                    quote: quote.quote,
                    author: quote.author,
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
  switch (language) {
    case 'en':
      return (dispatch) => {
        dispatch({ type: FETCH_START });
        talaikisQuotes(dispatch);
      };
    case 'hi': {
      const quotes = hindiQuotes.quotes;
      getModifiedQuotes(quotes);
      return {
        type: FETCH_QUOTE,
        payload: quotes,
      };
    }
    case 'ru': {
      const quotes = russianQuotes.quotes;
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
    case 'hi': {
      const randomQuote = Math.floor((Math.random() * hindiQuotes.quotes.length));
      return {
        type: FETCH_SINGLE_QUOTE,
        payload: {
          quote: hindiQuotes.quotes[randomQuote].quote,
          author: hindiQuotes.quotes[randomQuote].author,
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

