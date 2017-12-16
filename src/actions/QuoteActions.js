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

const testQuote = (dispatch) => {
  dispatch({
    type: FETCH_QUOTE,
    payload: {
               quoteText: staticQuotes.quotes[13].quote + staticQuotes.quotes[13].quote,
               quoteAuthor: staticQuotes.quotes[13].author
             }
  });
};

const prodQuote = (dispatch) => {
  const imageIndex = Math.floor(Math.random() * imagesSize);  
  timeoutPromise(100, new Error('Timed Out!'), api.getQuote())
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


const prodQuoteV2 = (dispatch) => {
  const randomQuote = Math.floor((Math.random() * staticQuotes.quotes.length) - 1);
  const quote = staticQuotes.quotes[randomQuote];
  api.getQuote()
     .then(response => {
          dispatch({
            type: FETCH_QUOTE,
            payload: [{ quote: response.quoteText, author: response.quoteAuthor },
                      { quote: quote.quote, author: quote.author }]
          });
     })
     .catch(error => {
       console.log(error);  
       dispatch({
         type: FETCH_QUOTE,
         payload: [{
                    quote: quote.quote,
                    author: quote.author
                  }]
       });
     });
};

const talaikisQuotes = (dispatch) => {
  const randomQuote = Math.floor((Math.random() * 90) - 1);  
  timeoutPromise(1000, new Error('Timed Out!'), tApi.getQuote())
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

export const getQuote = () => {
  return (dispatch) => {
      dispatch({ type: FETCH_START });
      // testQuote(dispatch);
      talaikisQuotes(dispatch);
  };
};

export const getSingleQuote = () => {
  return (dispatch) => {
    prodQuote(dispatch);
  };
};

export const pullQuotes = () => {
  return (dispatch) => {
    talaikisQuotes(dispatch);
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
