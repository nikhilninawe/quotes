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
import languageMap from './LanguageMap';

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
  const clone = [];
  quotes.forEach(quote => {
    const q = JSON.parse(JSON.stringify(quote));
    if (q.type === 'text') {
      q.imageIndex = Math.floor((Math.random() * imagesSize));
    }
    clone.push(q);
  });
  return clone;
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
        let quotes = response.splice(randomQuote, 10);
        quotes = getModifiedQuotes(quotes);
        dispatch({
          type: FETCH_QUOTE,
          payload: quotes
        });
      })
      .catch(error => {
        console.log(error);
        let quote = staticQuotes.quotes.splice(randomQuote, 10);
        quote = getModifiedQuotes(quote);
        dispatch({
          type: FETCH_QUOTE,
          payload: quote
        });
      });
};

const gqlQuotes = (dispatch, language, limit, action) => {
  tApi.getGQLQuote(language, limit).then(response => {
      let quotes = response.data.allQuotes;
      if (quotes.length === 0) {
        throw new Error('Received empty quote');
      }
      quotes = getModifiedQuotes(quotes);
      dispatch({
        type: action,
        payload: quotes
      });
    }).catch(error => {
      console.log(error);
      const randomQuote = Math.floor((Math.random() * languageMap[language].quotes.length));
      let quote = languageMap[language].quotes.splice(randomQuote, limit);
      quote = getModifiedQuotes(quote);
      dispatch({
        type: action,
        payload: quote
      });
    });
};


export const getQuotes = (language = 'en') => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      gqlQuotes(dispatch, language, 10, FETCH_QUOTE);
    };
};

export const getSingleQuote = (language = 'en') => {
  switch (language) {
    case 'en':
    case 'ru':
    case 'hi':
    case 'mr': {
      return (dispatch) => {
        gqlQuotes(dispatch, language, 1, FETCH_SINGLE_QUOTE);
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

