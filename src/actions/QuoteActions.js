import QuoteApi from '../components/common/QuoteApi';
import TalaikisApi from '../components/common/TalaikisApi';
import { 
  FETCH_QUOTE, 
  FETCH_START, 
  FETCH_SINGLE_QUOTE,
  SWITCH_STATE,
  CURRENT_QUOTE } from './types';
import staticQuotes from './quotes.json';

const api = new QuoteApi();
const tApi = new TalaikisApi();
const imagesSize = 4;

function timeoutPromise(timeout, err, promise) {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(reject.bind(null, err), timeout);
  });
}

const prodQuote = (dispatch) => {
  const imageIndex = Math.floor(Math.random() * imagesSize);  
  timeoutPromise(300, new Error('Timed Out!'), api.getQuote())
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

const getModifiedQuotes = quotes => {
  quotes.forEach(quote => {
    quote.imageIndex = Math.floor((Math.random() * imagesSize));
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

const talaikisRandomQuote = (dispatch) => {
  const randomQuote = Math.floor((Math.random() * 90) - 1);  
  timeoutPromise(300, new Error('Timed Out!'), tApi.getRandomQuote())
      .then(response => {
        dispatch({
          type: FETCH_QUOTE,
          payload: {
            quote: response.quote,
            author: response.author
          }
        });
      })
      .catch(error => {
        console.log(error);
        const quote = staticQuotes.quotes[randomQuote];
        getModifiedQuotes(quote);
        dispatch({
          type: FETCH_QUOTE,
          payload: {
            quote: quote.quote,
            author: quote.author
          }
        });
      });
};

export const getQuote = () => {
  return (dispatch) => {
      dispatch({ type: FETCH_START });
      talaikisQuotes(dispatch);
  };
};

export const getRandomQuote = () => {
  return (dispatch) => {
    talaikisRandomQuote(dispatch);
  };
};

export const getSingleQuote = () => {
  return (dispatch) => {
    prodQuote(dispatch);
  };
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

